import { useAppState } from '@/hooks/useAppState';

function formatTimer(totalSeconds) {
  const safeValue = Math.max(0, totalSeconds);
  const minutes = String(Math.floor(safeValue / 60)).padStart(2, '0');
  const seconds = String(safeValue % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

function resolveRecoveryStatus(recovery) {
  if (recovery >= 86) {
    return 'Ready';
  }

  if (recovery >= 78) {
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

function createCoachReply({
  currentExercise,
  nextQueuedExercise,
  restSecondsRemaining,
  sessionComplete,
  text,
  userProfile,
}) {
  const normalized = text.toLowerCase();

  if (sessionComplete) {
    return 'Session is complete. Walk it down, hydrate, and restart only when you are ready for another clean round.';
  }

  if (normalized.includes('rest') || normalized.includes('timer')) {
    return restSecondsRemaining > 0
      ? `Rest timer is at ${formatTimer(restSecondsRemaining)}. Breathe through the nose and keep the next set crisp.`
      : `Rest window is clear. Start the next effort whenever your breathing feels settled.`;
  }

  if (normalized.includes('next') || normalized.includes('after')) {
    return nextQueuedExercise
      ? `After ${currentExercise.name}, you roll into ${nextQueuedExercise.name}. Keep the transition quiet and efficient.`
      : `You are on the final movement. Finish clean, then the session closes without extra filler.`;
  }

  if (normalized.includes('form') || normalized.includes('technique')) {
    return currentExercise.notes;
  }

  if (normalized.includes('hard') || normalized.includes('intensity')) {
    return userProfile.goal === 'strength'
      ? 'Push the working sets hard, but keep one clean rep in reserve. The goal is output, not grind.'
      : 'Keep the effort smooth and repeatable. The system is rewarding quality and consistency more than chaos.';
  }

  return `Stay centered on ${currentExercise.name}. ${nextQueuedExercise ? `Up next is ${nextQueuedExercise.name}.` : 'This is the closing block, so finish sharp.'}`;
}

export function useWorkout() {
  const { state, dispatch } = useAppState();
  const { workout, analytics, userProfile } = state;
  const currentExercise = workout.queue[workout.currentExerciseIndex] || workout.queue[0];
  const nextQueuedExercise = workout.queue[workout.currentExerciseIndex + 1];
  const sessionStateLabel = workout.sessionComplete
    ? 'Session complete'
    : workout.sessionActive
      ? 'Active session'
      : 'Ready to train';

  const session = {
    title: workout.programTitle,
    phase: workout.sessionComplete
      ? 'Session complete'
      : workout.sessionActive
        ? `Set ${workout.currentSet} of ${currentExercise.sets}`
        : 'Ready to start',
    recovery: resolveRecoveryStatus(analytics.recovery),
    nextExercise: workout.sessionComplete ? 'All movements complete' : currentExercise.name,
    restTimer: formatTimer(workout.restSecondsRemaining),
    notes: workout.sessionComplete
      ? 'You closed the full block cleanly. Restart when you want another focused round.'
      : currentExercise.notes,
    blockLabel:
      userProfile.goal === 'strength'
        ? 'Heavy neural'
        : userProfile.goal === 'discipline'
          ? 'Consistency block'
          : 'Hybrid progression',
    description: workout.sessionComplete
      ? 'The session is complete. The queue is frozen until you choose to restart.'
      : workout.sessionActive
        ? `Current movement: ${currentExercise.name}. Rest pacing stays visible and the next decision remains obvious.`
        : 'Start the session to activate live set tracking, rest pacing, and the in-gym coaching layer.',
    stateLabel: sessionStateLabel,
  };

  const workoutStats = [
    {
      label: 'Session intent',
      value:
        userProfile.goal === 'strength'
          ? 'Upper strength'
          : userProfile.goal === 'discipline'
            ? 'Discipline circuit'
            : 'Lean recomposition',
      detail:
        userProfile.goal === 'strength'
          ? 'Lower-rep pushing and pulling with disciplined rest windows.'
          : userProfile.goal === 'discipline'
            ? 'Reliable movement quality with low-friction session pacing.'
            : 'Balanced strength and hypertrophy work with controlled fatigue.',
      icon: 'dumbbell',
    },
    {
      label: 'Gym mode',
      value: 'Focused',
      detail: 'Large controls, glanceable set targets, and no-clutter pacing.',
      icon: 'spark',
    },
    {
      label: 'AI cue density',
      value: workout.chatModeEnabled ? 'Active' : 'Light',
      detail: workout.chatModeEnabled
        ? 'Workout Chat Mode is ready to answer form, pacing, and motivation prompts.'
        : 'Coaching only interrupts if fatigue or form drift spikes.',
      icon: 'chat',
    },
  ];

  const exerciseItems = workout.queue.map((item, index) => {
    const detail = `${item.sets} sets x ${item.reps}${item.unit ? ` ${item.unit}` : ' reps'}`;

    if (workout.sessionComplete) {
      return {
        ...item,
        detail,
        readiness: index === 0 ? 'Restart' : 'Queued',
      };
    }

    if (index < workout.currentExerciseIndex) {
      return {
        ...item,
        detail,
        readiness: 'Done',
      };
    }

    if (index === workout.currentExerciseIndex) {
      return {
        ...item,
        detail: `${detail} | set ${workout.currentSet}`,
        readiness: workout.sessionActive ? 'Live' : 'Prime',
      };
    }

    if (index === workout.currentExerciseIndex + 1) {
      return {
        ...item,
        detail,
        readiness: 'Next',
      };
    }

    return {
      ...item,
      detail,
      readiness: item.readiness,
    };
  });

  const coachCues = [
    `Current focus: ${currentExercise.name}.`,
    workout.restSecondsRemaining > 0
      ? `Rest timer is active at ${formatTimer(workout.restSecondsRemaining)} before the next effort.`
      : 'Rest timer is clear, so the next effort can start when you are ready.',
    nextQueuedExercise
      ? `Next exercise in queue: ${nextQueuedExercise.name}.`
      : 'Final movement is in progress; the session wraps after this block.',
  ];

  return {
    chatMessages: workout.chatMessages,
    coachCues,
    currentExercise,
    exerciseItems,
    isChatModeEnabled: workout.chatModeEnabled,
    isSessionActive: workout.sessionActive,
    isSessionComplete: workout.sessionComplete,
    session,
    workoutStats,
    startSession() {
      dispatch({
        type: 'START_WORKOUT_SESSION',
        payload: { restart: workout.sessionComplete },
      });
    },
    completeSet() {
      dispatch({ type: 'COMPLETE_WORKOUT_SET' });
    },
    toggleChatMode() {
      dispatch({ type: 'TOGGLE_WORKOUT_CHAT' });
    },
    reorderBlock() {
      dispatch({ type: 'ROTATE_WORKOUT_QUEUE' });
    },
    resetRestTimer() {
      dispatch({ type: 'RESET_WORKOUT_TIMER' });
    },
    sendChatMessage(text) {
      const cleanText = text.trim();

      if (!cleanText) {
        return;
      }

      dispatch({
        type: 'APPEND_WORKOUT_CHAT_MESSAGES',
        payload: {
          messages: [
            createMessage('user', cleanText),
            createMessage(
              'assistant',
              createCoachReply({
                currentExercise,
                nextQueuedExercise,
                restSecondsRemaining: workout.restSecondsRemaining,
                sessionComplete: workout.sessionComplete,
                text: cleanText,
                userProfile,
              }),
            ),
          ],
        },
      });
    },
  };
}
