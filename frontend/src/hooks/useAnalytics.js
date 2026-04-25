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
    lastRefreshSummary: analytics.lastRefreshSummary,
    latestCaptureLabel: analytics.latestCaptureLabel,
    projectedWeeks: analytics.projectedWeeks,
    recovery: analytics.recovery,
    streak: analytics.streak,
    strengthProjection: analytics.strengthProjection,
    refreshPrediction() {
      const nextRecovery = clamp(analytics.recovery + randomInteger(-2, 2), 82, 95);
      const nextProjectedWeeks = clamp(
        analytics.projectedWeeks + randomInteger(-1, 1),
        5,
        7,
      );
      const nextStrengthSlope = clamp(
        analytics.strengthSlope + randomFloat(-0.3, 0.45),
        8.1,
        11.2,
      );
      const nextDisciplineScore = clamp(
        analytics.disciplineScore + randomInteger(-1, 2),
        88,
        97,
      );
      const nextStreak = analytics.streak + randomInteger(0, 1);
      const nextBodyTrend = analytics.bodyTrend.map((item, index) => ({
        ...item,
        value: clamp(item.value + randomInteger(index < 2 ? 0 : 0, 2), 50, 92),
      }));
      const nextStrengthProjection = analytics.strengthProjection.map((item, index) => {
        const currentWeight = parseWeight(item.current);
        const targetWeight = parseWeight(item.target);
        const currentStep = index === 2 ? 2.5 : 1.25;
        const targetStep = index === 2 ? 2.5 : 1.25;

        return {
          ...item,
          current: formatWeight(currentWeight + randomInteger(0, 1) * currentStep),
          target: formatWeight(targetWeight + randomInteger(0, 1) * targetStep),
        };
      });
      const refreshSummary = `Forecast refreshed: recovery ${nextRecovery}%, strength slope +${nextStrengthSlope.toFixed(1)}%, projection holding near ${nextProjectedWeeks} weeks.`;

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
          lastRefreshSummary: refreshSummary,
          consistencyFeed: [
            refreshSummary,
            `Discipline remains steady at ${nextDisciplineScore} with cadence ${userProfile.cadence}.`,
            diet.dinnerLogged
              ? 'Dinner is logged, which keeps the current forecast grounded and believable.'
              : 'Dinner planning is still the clearest lever for a slightly better forecast.',
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
