import {
  buildDietPlan,
  buildTrainerReply,
  getMuscleFocus,
  getReplacementOptions,
} from '@/services/trainerEngine';
import { useAppState } from '@/hooks/useAppState';

function formatTimer(totalSeconds) {
  const safeValue = Math.max(0, totalSeconds);
  const minutes = String(Math.floor(safeValue / 60)).padStart(2, '0');
  const seconds = String(safeValue % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

function resolveRecoveryStatus(recovery) {
  if (recovery >= 88) {
    return 'Ready';
  }

  if (recovery >= 82) {
    return 'Stable';
  }

  return 'Watch';
}

function createMessage(role, text) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    role,
    text,
  };
}

function resolveBlockLabel(goal) {
  if (goal === 'strength') {
    return 'Strength block';
  }

  if (goal === 'muscle_gain') {
    return 'Hypertrophy block';
  }

  if (goal === 'fat_loss') {
    return 'Lean-output block';
  }

  return 'Recomp block';
}

function buildSessionDescription({ currentExercise, plan, sessionActive, sessionComplete, sessionSummary }) {
  if (sessionComplete && sessionSummary) {
    return `Session wrapped with ${sessionSummary.totalSetsCompleted} total sets in ${sessionSummary.durationLabel}. Keep the close-out clean, hydrate, and take the win.`;
  }

  if (sessionActive) {
    return `${plan.whyThisWorkout} Live now on ${currentExercise.name} with clear set pacing and low-noise coaching.`;
  }

  return `${plan.trainerGreeting} ${plan.whyThisWorkout}`;
}

export function useWorkout() {
  const { state, dispatch } = useAppState();
  const { analytics, diet, userProfile, workout } = state;
  const currentExercise = workout.queue[workout.currentExerciseIndex] || workout.queue[0];
  const nextQueuedExercise = workout.queue[workout.currentExerciseIndex + 1] || null;
  const selectedExercise =
    workout.queue.find((item) => item.key === workout.muscleFocusKey) || currentExercise;
  const muscleFocus = getMuscleFocus(selectedExercise?.key || currentExercise?.key);
  const replacementOptions = getReplacementOptions(
    selectedExercise?.key || currentExercise?.key,
    userProfile,
    analytics.recovery,
  );
  const dietPlan = buildDietPlan(userProfile, workout.plan.isWorkoutDay);
  const sessionStateLabel = workout.sessionComplete
    ? 'Session complete'
    : workout.sessionActive
      ? 'Active session'
      : 'Ready to train';
  const setProgressLabel = workout.sessionComplete
    ? `Completed ${workout.totalSetsCompleted} sets`
    : `Set ${workout.currentSet} of ${currentExercise.sets}`;

  const session = {
    title: workout.plan.title,
    phase: workout.plan.dayLabel,
    recovery: resolveRecoveryStatus(analytics.recovery),
    nextExercise: workout.sessionComplete ? 'All movements complete' : nextQueuedExercise?.name || 'Final movement',
    currentExerciseName: currentExercise.name,
    restTimer: formatTimer(workout.restSecondsRemaining),
    notes: workout.sessionComplete
      ? workout.sessionSummary?.message || 'Session is closed cleanly.'
      : currentExercise.trainerNote,
    blockLabel: resolveBlockLabel(userProfile.goal),
    description: buildSessionDescription({
      currentExercise,
      plan: workout.plan,
      sessionActive: workout.sessionActive,
      sessionComplete: workout.sessionComplete,
      sessionSummary: workout.sessionSummary,
    }),
    stateLabel: sessionStateLabel,
    setProgressLabel,
    summary: workout.sessionSummary,
    restSecondsRemaining: workout.restSecondsRemaining,
    todayFocus: workout.plan.todayFocus,
    whyThisWorkout: workout.plan.whyThisWorkout,
    trainerGreeting: workout.plan.trainerGreeting,
    feedbackMessage: workout.feedbackMessage,
    easyMode: workout.easyMode,
  };

  const workoutStats = [
    {
      label: 'Today\'s focus',
      value: workout.plan.dayLabel,
      detail: workout.plan.todayFocus,
      icon: 'dumbbell',
    },
    {
      label: 'Current movement',
      value: workout.sessionComplete ? 'Session closed' : currentExercise.name,
      detail: workout.sessionComplete
        ? workout.sessionSummary?.message || 'The work is complete and logged.'
        : `${currentExercise.sets} sets x ${currentExercise.repsLabel} | ${currentExercise.restSeconds} sec rest`,
      icon: 'target',
    },
    {
      label: 'Ask trainer',
      value: workout.chatModeEnabled ? `${userProfile.trainerName} live` : `${userProfile.trainerName} ready`,
      detail: workout.chatModeEnabled
        ? `Chat is reading your ${userProfile.goal.replace('_', ' ')} profile and ${userProfile.language} preference.`
        : 'Open chat for coach-style swaps, pain-aware adjustments, and meal guidance.',
      icon: 'chat',
    },
  ];

  const exerciseItems = workout.queue.map((item, index) => {
    const detail = `${item.sets} sets x ${item.repsLabel} | ${item.restSeconds} sec rest`;
    const readiness =
      workout.sessionComplete || index < workout.currentExerciseIndex
        ? 'Done'
        : index === workout.currentExerciseIndex
          ? workout.sessionActive
            ? 'Live'
            : 'Prime'
          : index === workout.currentExerciseIndex + 1
            ? 'Next'
            : 'Queued';

    return {
      ...item,
      detail,
      readiness,
      isSelected: item.key === selectedExercise?.key,
      targetMusclesLabel: item.targetMusclesLabel,
    };
  });

  const coachCues = workout.sessionComplete && workout.sessionSummary
    ? [
        `Premium close-out: ${workout.sessionSummary.totalSetsCompleted} sets finished in ${workout.sessionSummary.durationLabel}.`,
        `Why it worked: ${workout.plan.whyThisWorkout}`,
        workout.sessionSummary.message,
      ]
    : [
        `Today's focus: ${workout.plan.todayFocus}.`,
        `Why this workout: ${workout.plan.whyThisWorkout}`,
        workout.restSecondsRemaining > 0
          ? `Rest timer is live at ${formatTimer(workout.restSecondsRemaining)} before the next effort.`
          : `${currentExercise.name} is ready. Stay sharp and keep one clean rep in reserve if fatigue climbs.`,
      ];

  return {
    chatMessages: workout.chatMessages,
    coachCues,
    currentExercise,
    exerciseItems,
    canCompleteSet: workout.sessionActive && workout.restSecondsRemaining === 0,
    isChatModeEnabled: workout.chatModeEnabled,
    isChatPending: workout.chatPending,
    isSessionActive: workout.sessionActive,
    isSessionComplete: workout.sessionComplete,
    muscleFocus,
    replacementOptions,
    selectedExercise,
    session,
    trainerName: userProfile.trainerName,
    userName: userProfile.name,
    workoutPlan: workout.plan,
    workoutStats,
    startSession() {
      dispatch({ type: 'START_WORKOUT_SESSION' });
    },
    completeSet() {
      dispatch({ type: 'COMPLETE_WORKOUT_SET' });
    },
    toggleChatMode() {
      dispatch({ type: 'TOGGLE_WORKOUT_CHAT' });
    },
    resetRestTimer() {
      dispatch({ type: 'RESET_WORKOUT_TIMER' });
    },
    selectExercise(exerciseKey) {
      dispatch({
        type: 'SELECT_WORKOUT_EXERCISE',
        payload: { exerciseKey },
      });
    },
    replaceExercise(sourceIndex, replacementKey) {
      dispatch({
        type: 'REPLACE_WORKOUT_EXERCISE',
        payload: {
          sourceIndex,
          sourceKey: selectedExercise?.key,
          replacementKey,
        },
      });
    },
    toggleIntensityMode() {
      dispatch({ type: 'TOGGLE_WORKOUT_EASY_MODE' });
    },
    sendChatMessage(text) {
      const cleanText = text.trim();

      if (!cleanText || workout.chatPending) {
        return;
      }

      dispatch({
        type: 'APPEND_WORKOUT_CHAT_MESSAGES',
        payload: {
          messages: [createMessage('user', cleanText)],
        },
      });
      dispatch({
        type: 'SET_WORKOUT_CHAT_PENDING',
        payload: { value: true },
      });

      const delay = 500 + Math.floor(Math.random() * 501);
      const reply = buildTrainerReply({
        message: cleanText,
        profile: userProfile,
        workout: {
          ...workout,
          queue: workout.queue,
        },
        analytics,
        dietPlan,
      });

      window.setTimeout(() => {
        dispatch({
          type: 'APPEND_WORKOUT_CHAT_MESSAGES',
          payload: {
            messages: [createMessage('assistant', reply.text)],
          },
        });
        dispatch({
          type: 'SET_WORKOUT_CHAT_PENDING',
          payload: { value: false },
        });

        if (reply.muscleFocusKey) {
          dispatch({
            type: 'SELECT_WORKOUT_EXERCISE',
            payload: { exerciseKey: reply.muscleFocusKey },
          });
        }
      }, delay);
    },
  };
}
