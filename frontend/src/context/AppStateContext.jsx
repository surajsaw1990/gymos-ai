import { createContext, useContext, useEffect, useReducer } from 'react';

const workoutQueueSeed = [
  {
    name: 'Incline bench press',
    sets: 4,
    reps: 5,
    readiness: 'Prime',
    notes: 'Grip looked stable. Tempo can slow slightly on the eccentric.',
    restSeconds: 78,
  },
  {
    name: 'Chest-supported row',
    sets: 4,
    reps: 6,
    readiness: 'Stable',
    notes: 'Drive elbows back and keep the torso quiet through each rep.',
    restSeconds: 72,
  },
  {
    name: 'Cable lateral raise',
    sets: 3,
    reps: 12,
    readiness: 'Controlled',
    notes: 'Float the load upward and avoid shrugging through the top.',
    restSeconds: 56,
  },
  {
    name: 'Farmer carry finisher',
    sets: 3,
    reps: 35,
    unit: 'm',
    readiness: 'Optional',
    notes: 'Brace hard, walk tall, and keep the pace measured.',
    restSeconds: 45,
  },
];

const initialState = {
  userProfile: {
    goal: 'recomp',
    cadence: '4x',
    budget: 'balanced',
    tone: 'calm',
    reminders: 'smart',
    savedAt: null,
  },
  workout: {
    programTitle: 'Push / Pull Neural Primer',
    queue: workoutQueueSeed,
    sessionActive: false,
    sessionComplete: false,
    currentExerciseIndex: 0,
    currentSet: 1,
    restSecondsRemaining: 0,
    chatModeEnabled: false,
    chatMessages: [
      {
        id: 'coach-welcome',
        role: 'assistant',
        text: 'Coach is standing by. Ask about pacing, form, or how hard tonight should feel.',
      },
      {
        id: 'coach-focus',
        role: 'assistant',
        text: 'Current plan favors controlled strength work with clean rest windows.',
      },
    ],
  },
  diet: {
    dailyBudget: 11.4,
    remainingBudget: 2.55,
    proteinTarget: 148,
    proteinConsumed: 117,
    adherence: 92,
    dinnerLogCount: 0,
    dinnerLogged: false,
    dinnerCost: 2.95,
    dinnerProtein: 31,
    macroSplit: [
      { label: 'Protein', value: 38, color: 'bg-brand-400' },
      { label: 'Carbs', value: 34, color: 'bg-mint-400' },
      { label: 'Fats', value: 28, color: 'bg-sky-400' },
    ],
    mealTimeline: [
      {
        time: '08:00',
        title: 'Greek yogurt bowl',
        detail: 'Budget-friendly protein start with berries and oats.',
        cost: '$2.10',
      },
      {
        time: '13:00',
        title: 'Chicken rice box',
        detail: 'High satiety lunch tuned to workout timing.',
        cost: '$3.80',
      },
      {
        time: '18:30',
        title: 'Dinner slot open',
        detail: 'AI suggests eggs, potatoes, and spinach to close macros cheaply.',
        cost: '$2.95',
      },
    ],
    smartSwaps: [
      {
        title: 'Swap protein bar for yogurt',
        detail: 'Saves $1.40 with similar protein and better satiety.',
      },
      {
        title: 'Use frozen vegetables tonight',
        detail: 'Keeps micronutrients up while lowering per-meal spend.',
      },
      {
        title: 'Push fruit to post-dinner',
        detail: 'Improves fullness and reduces snacking risk later tonight.',
      },
    ],
    groceryPreviewOpen: false,
    groceryItems: [
      { name: 'Greek yogurt cups', detail: '2 servings for tomorrow breakfast' },
      { name: 'Frozen spinach', detail: 'Budget-friendly micronutrient add-on' },
      { name: 'Eggs + potatoes', detail: 'Reliable high-satiety dinner close' },
    ],
  },
  analytics: {
    streak: 18,
    recovery: 87,
    projectedWeeks: 6,
    strengthSlope: 9.4,
    disciplineScore: 91,
    bodyTrend: [
      { label: 'Jan', value: 52 },
      { label: 'Feb', value: 58 },
      { label: 'Mar', value: 64 },
      { label: 'Apr', value: 72 },
      { label: 'May', value: 79 },
      { label: 'Jun', value: 88 },
    ],
    strengthProjection: [
      {
        lift: 'Bench press',
        current: '82.5 kg',
        target: '90 kg',
      },
      {
        lift: 'Barbell row',
        current: '77.5 kg',
        target: '85 kg',
      },
      {
        lift: 'Trap bar deadlift',
        current: '140 kg',
        target: '152.5 kg',
      },
    ],
    consistencyFeed: [
      'Recovery fatigue dipped mid-week, but training compliance stayed intact.',
      'Smart Challenges predicts high adherence if workout start time stays after 6 PM.',
      'Body Transformation Visualizer is waiting for the next progress capture.',
    ],
    hasCapture: false,
    latestCaptureLabel: '',
  },
};

function rotateArray(items) {
  if (items.length < 2) {
    return items;
  }

  return [...items.slice(1), items[0]];
}

function updateMealTimeline(diet, dinnerTitle, dinnerDetail, dinnerCost) {
  return diet.mealTimeline.map((meal, index) =>
    index === 2
      ? {
          ...meal,
          title: dinnerTitle,
          detail: dinnerDetail,
          cost: `$${dinnerCost.toFixed(2)}`,
        }
      : meal,
  );
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
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          savedAt: action.payload.savedAt,
        },
      };

    case 'START_WORKOUT_SESSION':
      return {
        ...state,
        workout: {
          ...state.workout,
          sessionActive: true,
          sessionComplete: false,
          currentExerciseIndex: action.payload?.restart ? 0 : state.workout.currentExerciseIndex,
          currentSet: action.payload?.restart ? 1 : state.workout.currentSet,
          restSecondsRemaining: 0,
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
        },
      };
    }

    case 'COMPLETE_WORKOUT_SET': {
      if (!state.workout.sessionActive) {
        return state;
      }

      const currentExercise = state.workout.queue[state.workout.currentExerciseIndex];

      if (!currentExercise) {
        return state;
      }

      if (state.workout.currentSet < currentExercise.sets) {
        return {
          ...state,
          workout: {
            ...state.workout,
            currentSet: state.workout.currentSet + 1,
            restSecondsRemaining: currentExercise.restSeconds,
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
            restSecondsRemaining: nextExercise.restSeconds,
          },
        };
      }

      return {
        ...state,
        workout: {
          ...state.workout,
          sessionActive: false,
          sessionComplete: true,
          currentExerciseIndex: state.workout.currentExerciseIndex,
          currentSet: currentExercise.sets,
          restSecondsRemaining: 0,
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

    case 'APPEND_WORKOUT_CHAT_MESSAGES':
      return {
        ...state,
        workout: {
          ...state.workout,
          chatMessages: [...state.workout.chatMessages, ...action.payload.messages],
        },
      };

    case 'ROTATE_WORKOUT_QUEUE': {
      const current = state.workout.queue[state.workout.currentExerciseIndex];
      const previous = state.workout.queue.slice(0, state.workout.currentExerciseIndex);
      const upcoming = state.workout.queue.slice(state.workout.currentExerciseIndex + 1);

      if (upcoming.length < 2) {
        return state;
      }

      return {
        ...state,
        workout: {
          ...state.workout,
          queue: [...previous, current, ...rotateArray(upcoming)],
        },
      };
    }

    case 'LOG_DINNER_PLAN': {
      const isFirstLog = state.diet.dinnerLogCount === 0;
      const spend = isFirstLog ? state.diet.dinnerCost : 0.75;
      const proteinGain = isFirstLog ? state.diet.dinnerProtein : 8;
      const nextProtein = Math.min(
        state.diet.proteinTarget + 18,
        state.diet.proteinConsumed + proteinGain,
      );
      const nextAdherence = Math.min(100, state.diet.adherence + (isFirstLog ? 5 : 2));
      const nextBudget = Math.max(0, state.diet.remainingBudget - spend);
      const macroProtein = Math.min(52, state.diet.macroSplit[0].value + (isFirstLog ? 4 : 1));
      const macroCarbs = Math.max(24, state.diet.macroSplit[1].value - 1);
      const macroFats = Math.max(20, 100 - macroProtein - macroCarbs);

      return {
        ...state,
        diet: {
          ...state.diet,
          remainingBudget: nextBudget,
          proteinConsumed: nextProtein,
          adherence: nextAdherence,
          dinnerLogCount: state.diet.dinnerLogCount + 1,
          dinnerLogged: true,
          macroSplit: [
            { ...state.diet.macroSplit[0], value: macroProtein },
            { ...state.diet.macroSplit[1], value: macroCarbs },
            { ...state.diet.macroSplit[2], value: macroFats },
          ],
          mealTimeline: updateMealTimeline(
            state.diet,
            isFirstLog ? 'Dinner logged' : 'Dinner refined',
            isFirstLog
              ? 'Protein-forward dinner has been added and budget impact is now reflected.'
              : 'You tightened the dinner plan to improve protein without blowing the budget.',
            spend,
          ),
        },
      };
    }

    case 'ROTATE_DIET_SWAPS':
      return {
        ...state,
        diet: {
          ...state.diet,
          smartSwaps: rotateArray(state.diet.smartSwaps),
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

    case 'SET_ANALYTICS_SNAPSHOT':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          ...action.payload,
        },
      };

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
  const [state, dispatch] = useReducer(appStateReducer, initialState);

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
