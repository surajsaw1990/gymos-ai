import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  buildDietPlan,
  buildTrainerGreeting,
  createDefaultProfile,
  createReplacementExercise,
  generateWorkoutPlan,
  sanitizeProfile,
} from '@/services/trainerEngine';

const STORAGE_KEY = 'gymos-ai-app-state-v4';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function roundToStep(value, step = 2.5) {
  return Math.round(value / step) * step;
}

function formatWeight(value) {
  return `${Number(value.toFixed(1))} kg`;
}

function createMessage(role, text) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    role,
    text,
  };
}

function buildBodyTrend(profile) {
  const start = profile.goal === 'fat_loss' ? 54 : profile.goal === 'muscle_gain' ? 58 : 56;
  const delta = profile.goal === 'strength' ? 7 : profile.goal === 'muscle_gain' ? 6 : 5;

  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((label, index) => ({
    label,
    value: start + index * delta,
  }));
}

function buildStrengthProjection(profile) {
  const weight = Number.parseFloat(profile.weightKg || '74');
  const experienceMultiplier =
    profile.experienceLevel === 'advanced'
      ? 1.2
      : profile.experienceLevel === 'beginner'
        ? 0.76
        : 1;
  const goalMultiplier =
    profile.goal === 'strength' ? 1.08 : profile.goal === 'muscle_gain' ? 1.03 : 0.98;
  const benchCurrent = roundToStep(weight * 0.72 * experienceMultiplier * goalMultiplier, 2.5);
  const rowCurrent = roundToStep(weight * 0.8 * experienceMultiplier, 2.5);
  const hingeCurrent = roundToStep(weight * 1.55 * experienceMultiplier, 2.5);

  return [
    {
      lift: 'Bench press',
      current: formatWeight(benchCurrent),
      target: formatWeight(benchCurrent + 7.5),
    },
    {
      lift: 'Chest-supported row',
      current: formatWeight(rowCurrent),
      target: formatWeight(rowCurrent + 5),
    },
    {
      lift: 'Trap bar deadlift',
      current: formatWeight(hingeCurrent),
      target: formatWeight(hingeCurrent + 10),
    },
  ];
}

function buildConsistencyFeed(profile, analytics) {
  return [
    `${profile.trainerName || 'Coach Arjun'} is tuning your ${profile.workoutDaysPerWeek}-day ${profile.preferredSplit.replaceAll('-', ' ')} rhythm around ${profile.goal.replace('_', ' ')}.`,
    `${profile.foodPreference} meals are being shaped around a ${profile.dailyBudget} daily budget while protecting recovery at ${analytics.recovery}%.`,
    `${profile.tone} coaching is active in ${profile.language}, with reminders set to ${profile.reminders}.`,
  ];
}

function createAnalyticsState(profile, previousAnalytics = {}) {
  const baseProjectedWeeks =
    profile.goal === 'fat_loss' ? 8 : profile.goal === 'muscle_gain' ? 10 : 6;
  const recoveryBase =
    profile.experienceLevel === 'advanced'
      ? 89
      : profile.experienceLevel === 'beginner'
        ? 84
        : 87;

  const analytics = {
    streak: clamp(previousAnalytics.streak ?? 18, 1, 365),
    recovery: clamp(previousAnalytics.recovery ?? recoveryBase, 78, 95),
    projectedWeeks: clamp(previousAnalytics.projectedWeeks ?? baseProjectedWeeks, 4, 12),
    strengthSlope: Number(
      clamp(previousAnalytics.strengthSlope ?? 9.4, 6.4, 12.6).toFixed(1),
    ),
    disciplineScore: clamp(previousAnalytics.disciplineScore ?? 91, 78, 99),
    bodyTrend: previousAnalytics.bodyTrend?.length
      ? previousAnalytics.bodyTrend
      : buildBodyTrend(profile),
    strengthProjection: previousAnalytics.strengthProjection?.length
      ? previousAnalytics.strengthProjection
      : buildStrengthProjection(profile),
    consistencyFeed: previousAnalytics.consistencyFeed?.length
      ? previousAnalytics.consistencyFeed
      : [],
    lastRefreshSummary: previousAnalytics.lastRefreshSummary || '',
    hasCapture: Boolean(previousAnalytics.hasCapture),
    latestCaptureLabel: previousAnalytics.latestCaptureLabel || '',
  };

  if (!analytics.consistencyFeed.length) {
    analytics.consistencyFeed = buildConsistencyFeed(profile, analytics);
  }

  return analytics;
}

function buildInitialChatMessages(profile, plan) {
  const trainerName = profile.trainerName || 'Coach Arjun';
  const focusCopy =
    profile.language === 'english'
      ? `${trainerName}: today's focus is ${plan.todayFocus}. ${plan.whyThisWorkout}`
      : profile.language === 'hindi'
        ? `${trainerName}: aaj focus ${plan.todayFocus} hai. ${plan.whyThisWorkout}`
        : `${trainerName}: aaj focus ${plan.todayFocus} hai. ${plan.whyThisWorkout}`;

  return [createMessage('assistant', buildTrainerGreeting(profile)), createMessage('assistant', focusCopy)];
}

function createWorkoutState(profile, analytics, previousWorkout = {}, options = {}) {
  const easyMode = options.easyMode ?? previousWorkout.easyMode ?? false;
  const plan = generateWorkoutPlan(profile, analytics.recovery, new Date(), easyMode);
  const chatMessages =
    !options.resetChat && previousWorkout.chatMessages?.length
      ? previousWorkout.chatMessages
      : buildInitialChatMessages(profile, plan);

  return {
    programTitle: plan.title,
    plan,
    queue: plan.exercises,
    sessionActive: false,
    sessionComplete: false,
    currentExerciseIndex: 0,
    currentSet: 1,
    totalSetsCompleted: 0,
    sessionStartedAt: null,
    sessionSummary: null,
    restSecondsRemaining: 0,
    chatModeEnabled: Boolean(options.chatModeEnabled ?? previousWorkout.chatModeEnabled),
    chatPending: false,
    chatMessages,
    muscleFocusKey: plan.defaultMuscleFocusKey,
    easyMode,
    feedbackMessage: options.feedbackMessage || '',
  };
}

function createDietState(profile, workoutPlan, previousDiet = {}) {
  const dietPlan = buildDietPlan(profile, workoutPlan.isWorkoutDay);
  const defaultRemainingBudget = Number(
    Math.max(0, dietPlan.dailyBudget - (workoutPlan.isWorkoutDay ? 4.7 : 3.8)).toFixed(2),
  );
  const defaultProtein = Math.max(
    0,
    dietPlan.proteinTarget - (workoutPlan.isWorkoutDay ? 36 : 48),
  );

  return {
    dailyBudget: dietPlan.dailyBudget,
    proteinTarget: dietPlan.proteinTarget,
    proteinConsumed: clamp(previousDiet.proteinConsumed ?? defaultProtein, 0, dietPlan.proteinTarget + 80),
    carbsConsumed: clamp(
      previousDiet.carbsConsumed ?? (workoutPlan.isWorkoutDay ? 142 : 116),
      0,
      420,
    ),
    fatsConsumed: clamp(previousDiet.fatsConsumed ?? 46, 0, 160),
    remainingBudget: Number(
      clamp(previousDiet.remainingBudget ?? defaultRemainingBudget, 0, dietPlan.dailyBudget).toFixed(2),
    ),
    adherence: clamp(previousDiet.adherence ?? 92, 72, 100),
    dinnerLogCount: previousDiet.dinnerLogCount ?? 0,
    dinnerLogged: Boolean(previousDiet.dinnerLogged),
    lastDinnerLog: previousDiet.lastDinnerLog || null,
    groceryPreviewOpen: Boolean(previousDiet.groceryPreviewOpen),
    swapRotation: previousDiet.swapRotation ?? 0,
    feedbackMessage: previousDiet.feedbackMessage || '',
  };
}

function createAuthState(profile, previousAuth = {}) {
  return {
    isLoggedIn: Boolean(previousAuth.isLoggedIn),
    phoneNumber: previousAuth.phoneNumber || profile.phoneNumber || '',
    otpCode: '',
    otpRequestedAt: null,
    otpVerifiedAt: previousAuth.otpVerifiedAt || null,
  };
}

function buildWorkoutSuccessMessage(profile) {
  if (profile.goal === 'strength') {
    return `${profile.trainerName || 'Coach Arjun'} liked that session. Strong top sets, clean pacing, and no wasted reps.`;
  }

  if (profile.goal === 'fat_loss') {
    return `${profile.trainerName || 'Coach Arjun'} locked in a high-quality burn without turning the session messy.`;
  }

  if (profile.goal === 'muscle_gain') {
    return `${profile.trainerName || 'Coach Arjun'} got the volume in with clean form. That is how size work compounds.`;
  }

  return `${profile.trainerName || 'Coach Arjun'} kept the session efficient and repeatable. That is exactly how recomposition stacks.`;
}

function sumWorkoutSets(queue) {
  return queue.reduce((total, item) => total + (item.sets || 0), 0);
}

function buildWorkoutSummary(state, totalSetsCompleted) {
  const elapsedMinutes = state.workout.sessionStartedAt
    ? Math.max(1, Math.round((Date.now() - state.workout.sessionStartedAt) / 60000))
    : 1;
  const believableDuration = Math.max(
    24,
    Math.round(totalSetsCompleted * 2.3 + state.workout.queue.length * 1.75),
  );
  const durationMinutes = Math.max(elapsedMinutes, believableDuration);

  return {
    totalSetsCompleted,
    totalPlannedSets: sumWorkoutSets(state.workout.queue),
    durationMinutes,
    durationLabel: `${durationMinutes} min`,
    message: buildWorkoutSuccessMessage(state.userProfile),
  };
}

function rebuildDerivedState(state, nextProfile, nextAnalytics, options = {}) {
  const userProfile = sanitizeProfile(nextProfile);
  const analytics = createAnalyticsState(userProfile, nextAnalytics);
  const workout = createWorkoutState(userProfile, analytics, state.workout, {
    easyMode: options.easyMode ?? state.workout.easyMode,
    resetChat: options.resetChat,
    chatModeEnabled: options.chatModeEnabled ?? state.workout.chatModeEnabled,
    feedbackMessage: options.workoutFeedbackMessage || '',
  });
  const diet = createDietState(userProfile, workout.plan, {
    ...state.diet,
    feedbackMessage: '',
  });

  return {
    ...state,
    userProfile: {
      ...userProfile,
      savedAt: options.savedAt ?? userProfile.savedAt,
    },
    analytics,
    workout,
    diet,
  };
}

function createPersistedState(state) {
  return {
    auth: {
      isLoggedIn: state.auth.isLoggedIn,
      phoneNumber: state.auth.phoneNumber,
      otpVerifiedAt: state.auth.otpVerifiedAt,
    },
    userProfile: state.userProfile,
    analytics: state.analytics,
    diet: state.diet,
  };
}

function loadStoredState() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function createInitialState() {
  const storedState = loadStoredState();
  const userProfile = sanitizeProfile({
    ...createDefaultProfile(),
    ...(storedState?.userProfile || {}),
    phoneNumber:
      storedState?.userProfile?.phoneNumber || storedState?.auth?.phoneNumber || '',
  });
  const analytics = createAnalyticsState(userProfile, storedState?.analytics);
  const workout = createWorkoutState(userProfile, analytics, {}, { resetChat: true });
  const diet = createDietState(userProfile, workout.plan, storedState?.diet);
  const auth = createAuthState(userProfile, storedState?.auth);

  return {
    auth,
    userProfile,
    workout,
    diet,
    analytics,
  };
}

function appStateReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PROFILE_FIELD':
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          [action.payload.field]: action.payload.value,
        },
      };

    case 'SAVE_PROFILE':
      return rebuildDerivedState(
        state,
        {
          ...state.userProfile,
          phoneNumber: state.userProfile.phoneNumber || state.auth.phoneNumber,
          savedAt: action.payload.savedAt,
        },
        state.analytics,
        {
          resetChat: true,
          savedAt: action.payload.savedAt,
        },
      );

    case 'REQUEST_LOGIN_OTP':
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoggedIn: false,
          phoneNumber: action.payload.phoneNumber,
          otpCode: action.payload.otpCode,
          otpRequestedAt: action.payload.requestedAt,
        },
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoggedIn: true,
          phoneNumber: action.payload.phoneNumber,
          otpCode: '',
          otpVerifiedAt: action.payload.verifiedAt,
        },
        userProfile: {
          ...state.userProfile,
          phoneNumber: action.payload.phoneNumber,
        },
      };

    case 'LOGOUT':
      return {
        ...state,
        auth: createAuthState(state.userProfile, {}),
        workout: {
          ...createWorkoutState(state.userProfile, state.analytics, state.workout, {
            resetChat: true,
            chatModeEnabled: false,
          }),
          chatModeEnabled: false,
        },
      };

    case 'START_WORKOUT_SESSION':
      return {
        ...state,
        workout: {
          ...state.workout,
          sessionActive: true,
          sessionComplete: false,
          currentExerciseIndex: 0,
          currentSet: 1,
          totalSetsCompleted: 0,
          sessionStartedAt: Date.now(),
          sessionSummary: null,
          restSecondsRemaining: 0,
          muscleFocusKey: state.workout.queue[0]?.key || state.workout.plan.defaultMuscleFocusKey,
          feedbackMessage: '',
        },
      };

    case 'TICK_WORKOUT_TIMER':
      return {
        ...state,
        workout: {
          ...state.workout,
          restSecondsRemaining: Math.max(0, state.workout.restSecondsRemaining - 1),
        },
      };

    case 'RESET_WORKOUT_TIMER': {
      const currentExercise = state.workout.queue[state.workout.currentExerciseIndex];

      if (!state.workout.sessionActive || !currentExercise) {
        return state;
      }

      return {
        ...state,
        workout: {
          ...state.workout,
          restSecondsRemaining: currentExercise.restSeconds,
          feedbackMessage: `Rest reset to ${currentExercise.restSeconds} sec.`,
        },
      };
    }

    case 'COMPLETE_WORKOUT_SET': {
      if (!state.workout.sessionActive || state.workout.sessionComplete) {
        return state;
      }

      const currentExercise = state.workout.queue[state.workout.currentExerciseIndex];

      if (!currentExercise) {
        return state;
      }

      const totalSetsCompleted = state.workout.totalSetsCompleted + 1;

      if (state.workout.currentSet < currentExercise.sets) {
        return {
          ...state,
          workout: {
            ...state.workout,
            currentSet: state.workout.currentSet + 1,
            totalSetsCompleted,
            restSecondsRemaining: currentExercise.restSeconds,
            feedbackMessage: `Set ${state.workout.currentSet} closed. Recover, then attack set ${state.workout.currentSet + 1}.`,
          },
        };
      }

      if (state.workout.currentExerciseIndex < state.workout.queue.length - 1) {
        const nextExercise = state.workout.queue[state.workout.currentExerciseIndex + 1];

        return {
          ...state,
          workout: {
            ...state.workout,
            currentExerciseIndex: state.workout.currentExerciseIndex + 1,
            currentSet: 1,
            totalSetsCompleted,
            restSecondsRemaining: currentExercise.restSeconds,
            muscleFocusKey: nextExercise?.key || state.workout.muscleFocusKey,
            feedbackMessage: `${currentExercise.name} is done. Next up: ${nextExercise?.name || 'the next movement'}.`,
          },
        };
      }

      return {
        ...state,
        workout: {
          ...state.workout,
          sessionActive: false,
          sessionComplete: true,
          currentSet: currentExercise.sets,
          totalSetsCompleted,
          sessionSummary: buildWorkoutSummary(state, totalSetsCompleted),
          restSecondsRemaining: 0,
          feedbackMessage: 'Session complete. Summary is ready.',
        },
      };
    }

    case 'TOGGLE_WORKOUT_CHAT':
      return {
        ...state,
        workout: {
          ...state.workout,
          chatModeEnabled: !state.workout.chatModeEnabled,
        },
      };

    case 'SET_WORKOUT_CHAT_PENDING':
      return {
        ...state,
        workout: {
          ...state.workout,
          chatPending: action.payload.value,
        },
      };

    case 'APPEND_WORKOUT_CHAT_MESSAGES':
      return {
        ...state,
        workout: {
          ...state.workout,
          chatMessages: [...state.workout.chatMessages, ...action.payload.messages],
        },
      };

    case 'SELECT_WORKOUT_EXERCISE':
      return {
        ...state,
        workout: {
          ...state.workout,
          muscleFocusKey: action.payload.exerciseKey,
        },
      };

    case 'REPLACE_WORKOUT_EXERCISE': {
      const sourceIndex =
        typeof action.payload.sourceIndex === 'number'
          ? action.payload.sourceIndex
          : state.workout.queue.findIndex((item) => item.key === action.payload.sourceKey);

      if (sourceIndex < 0) {
        return state;
      }

      const sourceExercise = state.workout.queue[sourceIndex];
      const replacementExercise = createReplacementExercise(
        action.payload.replacementKey,
        state.userProfile,
        state.analytics.recovery,
        sourceExercise,
      );

      const nextQueue = state.workout.queue.map((item, index) =>
        index === sourceIndex ? replacementExercise : item,
      );
      const nextPlan = {
        ...state.workout.plan,
        exercises: nextQueue,
        defaultMuscleFocusKey:
          state.workout.plan.defaultMuscleFocusKey === sourceExercise.key
            ? replacementExercise.key
            : state.workout.plan.defaultMuscleFocusKey,
      };

      return {
        ...state,
        workout: {
          ...state.workout,
          queue: nextQueue,
          plan: nextPlan,
          muscleFocusKey: replacementExercise.key,
          feedbackMessage: `${sourceExercise.name} swapped for ${replacementExercise.name}.`,
        },
      };
    }

    case 'TOGGLE_WORKOUT_EASY_MODE': {
      const nextEasyMode = !state.workout.easyMode;

      return rebuildDerivedState(state, state.userProfile, state.analytics, {
        resetChat: false,
        easyMode: nextEasyMode,
        workoutFeedbackMessage: nextEasyMode
          ? 'Plan softened for a lower-fatigue day.'
          : 'Full training intensity is back.',
      });
    }

    case 'LOG_DINNER_PLAN': {
      const { carbGain, fatGain, proteinGain, spend, mealTitle } = action.payload;
      const nextProtein = state.diet.proteinConsumed + proteinGain;
      const nextCarbs = state.diet.carbsConsumed + carbGain;
      const nextFats = state.diet.fatsConsumed + fatGain;
      const nextBudget = Math.max(0, state.diet.remainingBudget - spend);
      const nextAdherence = Math.min(100, state.diet.adherence + 2);

      return {
        ...state,
        diet: {
          ...state.diet,
          proteinConsumed: nextProtein,
          carbsConsumed: nextCarbs,
          fatsConsumed: nextFats,
          remainingBudget: Number(nextBudget.toFixed(2)),
          adherence: nextAdherence,
          dinnerLogCount: state.diet.dinnerLogCount + 1,
          dinnerLogged: true,
          lastDinnerLog: {
            proteinGain,
            carbGain,
            fatGain,
            spend,
            mealTitle,
            message: `${mealTitle} added ${proteinGain}g protein without pushing the budget off track.`,
          },
          feedbackMessage: `${mealTitle} logged. Protein and budget stayed on plan.`,
        },
      };
    }

    case 'ROTATE_DIET_SWAPS':
      return {
        ...state,
        diet: {
          ...state.diet,
          swapRotation: state.diet.swapRotation + 1,
        },
      };

    case 'TOGGLE_GROCERY_PREVIEW':
      return {
        ...state,
        diet: {
          ...state.diet,
          groceryPreviewOpen: !state.diet.groceryPreviewOpen,
        },
      };

    case 'SET_ANALYTICS_SNAPSHOT': {
      const nextAnalytics = createAnalyticsState(state.userProfile, {
        ...state.analytics,
        ...action.payload,
      });

      if (state.workout.sessionActive || state.workout.sessionComplete) {
        return {
          ...state,
          analytics: nextAnalytics,
        };
      }

      return rebuildDerivedState(state, state.userProfile, nextAnalytics, {
        resetChat: false,
        easyMode: state.workout.easyMode,
      });
    }

    case 'CAPTURE_ANALYTICS_CHECKIN':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          hasCapture: true,
          latestCaptureLabel: action.payload.label,
          consistencyFeed: [action.payload.feedItem, ...state.analytics.consistencyFeed].slice(0, 4),
        },
      };

    default:
      return state;
  }
}

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, undefined, createInitialState);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(createPersistedState(state)));
  }, [state]);

  useEffect(() => {
    if (!state.workout.sessionActive || state.workout.restSecondsRemaining <= 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      dispatch({ type: 'TICK_WORKOUT_TIMER' });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [state.workout.restSecondsRemaining, state.workout.sessionActive]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppStateContext() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppStateContext must be used within AppStateProvider.');
  }

  return context;
}
