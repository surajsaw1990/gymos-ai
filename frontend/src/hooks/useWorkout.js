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

function resolveCoachFallback(goal, tone) {
  if (goal === 'strength') {
    return tone === 'assertive'
      ? 'Keep the bar speed honest. Strong reps only.'
      : 'Keep the reps crisp and let bar speed decide how hard to push.';
  }

  if (goal === 'discipline') {
    return tone === 'companion'
      ? 'Stay with the routine. The clean finish matters more than forcing extra noise.'
      : 'Stay repeatable. The win is showing up and finishing clean.';
  }

  return tone === 'assertive'
    ? 'Stay tight, hit the planned work, and leave with something in reserve.'
    : 'Keep the work smooth, focused, and easy to recover from tomorrow.';
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
    return 'Session is complete. Walk it down, hydrate, and take the win. Restart only when you want another clean round.';
  }

  if (normalized.includes('rest') || normalized.includes('timer')) {
    return restSecondsRemaining > 0
      ? `Rest timer is sitting at ${formatTimer(restSecondsRemaining)}. Let the breathing settle, then attack the next set cleanly.`
      : 'Rest window is clear. Start the next effort whenever your breathing feels steady again.';
  }

  if (normalized.includes('next') || normalized.includes('after')) {
    return nextQueuedExercise
      ? `After ${currentExercise.name}, you roll into ${nextQueuedExercise.name}. Keep the transition quiet and efficient.`
      : 'This is the final movement. Finish sharp, then let the session close without extra fluff.';
  }

  if (normalized.includes('form') || normalized.includes('technique')) {
    return currentExercise.notes;
  }

  if (normalized.includes('hard') || normalized.includes('intensity') || normalized.includes('weight')) {
    return userProfile.goal === 'strength'
      ? 'Push the working sets hard, but keep one clean rep in reserve. Output matters more than grinding.'
      : 'Keep the effort challenging but repeatable. The system is rewarding quality more than chaos tonight.';
  }

  return resolveCoachFallback(userProfile.goal, userProfile.tone);
}

function buildSessionDescription({
  currentExercise,
  sessionActive,
  sessionComplete,
  sessionSummary,
}) {
  if (sessionComplete && sessionSummary) {
    return `The session is complete with ${sessionSummary.totalSetsCompleted} sets finished in ${sessionSummary.durationLabel}.`;
  }

  if (sessionActive) {
    return `Current movement: ${currentExercise.name}. Rest pacing stays visible and the next decision remains obvious.`;
  }

  return 'Start the session to activate live set tracking, rest pacing, and the in-gym coaching layer.';
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
  const setProgressLabel = workout.sessionComplete
    ? `Completed ${workout.totalSetsCompleted} sets`
    : `Set ${workout.currentSet} of ${currentExercise.sets}`;

  const session = {
    title: workout.programTitle,
    phase: setProgressLabel,
    recovery: resolveRecoveryStatus(analytics.recovery),
    nextExercise: workout.sessionComplete ? 'All movements complete' : currentExercise.name,
    currentExerciseName: currentExercise.name,
    restTimer: formatTimer(workout.restSecondsRemaining),
    notes: workout.sessionComplete
      ? workout.sessionSummary?.message ||
        'You closed the full block cleanly. Restart when you want another focused round.'
      : currentExercise.notes,
    blockLabel:
      userProfile.goal === 'strength'
        ? 'Heavy neural'
        : userProfile.goal === 'discipline'
          ? 'Consistency block'
          : 'Hybrid progression',
    description: buildSessionDescription({
      currentExercise,
      sessionActive: workout.sessionActive,
      sessionComplete: workout.sessionComplete,
      sessionSummary: workout.sessionSummary,
    }),
    stateLabel: sessionStateLabel,
    setProgressLabel,
    summary: workout.sessionSummary,
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
      label: 'Current movement',
      value: workout.sessionComplete ? 'Session closed' : currentExercise.name,
      detail: workout.sessionComplete
        ? 'The final movement is complete and the session summary is now locked in.'
        : `${setProgressLabel} with ${currentExercise.reps}${currentExercise.unit ? ` ${currentExercise.unit}` : ' reps'} planned.`,
      icon: 'target',
    },
    {
      label: 'AI cue density',
      value: workout.chatModeEnabled ? 'Active' : 'Light',
      detail: workout.chatModeEnabled
        ? 'Workout Chat Mode is open with live coach replies and pacing guidance.'
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
        readiness: index <= workout.currentExerciseIndex ? 'Done' : 'Queued',
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
        detail: `${detail} | ${setProgressLabel.toLowerCase()}`,
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

  const coachCues = workout.sessionComplete && workout.sessionSummary
    ? [
        `Session Summary: ${workout.sessionSummary.totalSetsCompleted} total sets completed.`,
        `Mock duration closed at ${workout.sessionSummary.durationLabel}.`,
        workout.sessionSummary.message,
      ]
    : [
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
    isChatPending: workout.chatPending,
    isSessionActive: workout.sessionActive,
    isSessionComplete: workout.sessionComplete,
    session,
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
    reorderBlock() {
      dispatch({ type: 'ROTATE_WORKOUT_QUEUE' });
    },
    resetRestTimer() {
      dispatch({ type: 'RESET_WORKOUT_TIMER' });
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

      window.setTimeout(() => {
        dispatch({
          type: 'APPEND_WORKOUT_CHAT_MESSAGES',
          payload: {
            messages: [
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
        dispatch({
          type: 'SET_WORKOUT_CHAT_PENDING',
          payload: { value: false },
        });
      }, delay);
    },
  };
}
