export const workoutStats = [
  {
    label: 'Session intent',
    value: 'Upper strength',
    detail: 'Low-rep pushing and pulling with disciplined rest windows.',
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
    value: 'Light',
    detail: 'Coaching only interrupts if fatigue or form drift spikes.',
    icon: 'chat',
  },
];

export const liveSession = {
  title: 'Push / Pull Neural Primer',
  phase: 'Set 2 of 5',
  recovery: 'Ready',
  nextExercise: 'Incline bench press',
  restTimer: '01:18',
  notes: 'Grip looked stable. Tempo can slow slightly on the eccentric.',
};

export const exerciseQueue = [
  {
    name: 'Incline bench press',
    detail: '4 sets x 5 reps',
    readiness: 'Prime',
  },
  {
    name: 'Chest-supported row',
    detail: '4 sets x 6 reps',
    readiness: 'Stable',
  },
  {
    name: 'Cable lateral raise',
    detail: '3 sets x 12 reps',
    readiness: 'Controlled',
  },
  {
    name: 'Farmer carry finisher',
    detail: '3 rounds x 35m',
    readiness: 'Optional',
  },
];

export const coachCues = [
  'Keep scapula packed before each press rep.',
  'Heart-rate recovery is healthy, so stay with the planned rest timer.',
  'If bar speed drops on the final set, cap the load rather than forcing volume.',
];
