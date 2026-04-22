import { useAppState } from '@/hooks/useAppState';

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function formatWeight(value) {
  return `${Number(value.toFixed(1))} kg`;
}

function parseWeight(weightLabel) {
  return Number.parseFloat(weightLabel);
}

export function useAnalytics() {
  const { state, dispatch } = useAppState();
  const { analytics, userProfile, diet } = state;

  const analyticsStats = [
    {
      label: 'Projected recomposition',
      value: `${analytics.projectedWeeks} weeks`,
      detail: 'Forecast assumes current recovery and diet adherence stay steady.',
      icon: 'chart',
    },
    {
      label: 'Strength slope',
      value: `+${analytics.strengthSlope.toFixed(1)}%`,
      detail: 'Compound lifts are still trending upward without overload warnings.',
      icon: 'dumbbell',
    },
    {
      label: 'Discipline score',
      value: `${analytics.disciplineScore}`,
      detail: `Habit engine confidence is anchored to your ${userProfile.cadence} cadence.`,
      icon: 'streak',
    },
  ];

  return {
    analyticsStats,
    bodyTrend: analytics.bodyTrend,
    consistencyFeed: analytics.consistencyFeed,
    disciplineScore: analytics.disciplineScore,
    hasCapture: analytics.hasCapture,
    latestCaptureLabel: analytics.latestCaptureLabel,
    projectedWeeks: analytics.projectedWeeks,
    recovery: analytics.recovery,
    streak: analytics.streak,
    strengthProjection: analytics.strengthProjection,
    refreshPrediction() {
      const nextRecovery = clamp(analytics.recovery + randomInteger(-4, 4), 78, 98);
      const nextProjectedWeeks = clamp(
        analytics.projectedWeeks + randomInteger(-1, 1),
        4,
        8,
      );
      const nextStrengthSlope = clamp(
        analytics.strengthSlope + randomFloat(-0.8, 1.1),
        6.4,
        13.8,
      );
      const nextDisciplineScore = clamp(
        analytics.disciplineScore + randomInteger(-3, 3),
        84,
        99,
      );
      const nextStreak = analytics.streak + randomInteger(0, 1);
      const nextBodyTrend = analytics.bodyTrend.map((item, index) => ({
        ...item,
        value: clamp(item.value + randomInteger(index < 2 ? 0 : 1, 4), 48, 96),
      }));
      const nextStrengthProjection = analytics.strengthProjection.map((item, index) => {
        const currentWeight = parseWeight(item.current);
        const targetWeight = parseWeight(item.target);
        const currentStep = index === 2 ? 5 : 2.5;
        const targetStep = index === 2 ? 7.5 : 2.5;

        return {
          ...item,
          current: formatWeight(currentWeight + randomInteger(0, 1) * currentStep),
          target: formatWeight(targetWeight + randomInteger(0, 1) * targetStep),
        };
      });

      dispatch({
        type: 'SET_ANALYTICS_SNAPSHOT',
        payload: {
          recovery: nextRecovery,
          projectedWeeks: nextProjectedWeeks,
          strengthSlope: Number(nextStrengthSlope.toFixed(1)),
          disciplineScore: nextDisciplineScore,
          streak: nextStreak,
          bodyTrend: nextBodyTrend,
          strengthProjection: nextStrengthProjection,
          consistencyFeed: [
            `Recovery pulse recalculated at ${nextRecovery}% after the latest forecast refresh.`,
            `Strength slope now reads +${nextStrengthSlope.toFixed(1)}% with cadence ${userProfile.cadence}.`,
            diet.dinnerLogged
              ? 'Diet adherence is currently supporting the forecast with dinner already logged.'
              : 'Dinner plan is still the cleanest leverage point for an even stronger forecast.',
          ],
        },
      });
    },
    captureCheckIn() {
      const label = `Check-in captured on ${new Date().toLocaleDateString()}`;

      dispatch({
        type: 'CAPTURE_ANALYTICS_CHECKIN',
        payload: {
          label,
          feedItem: `${label}. Body Transformation Visualizer can now use a fresh reference frame.`,
        },
      });
    },
  };
}
