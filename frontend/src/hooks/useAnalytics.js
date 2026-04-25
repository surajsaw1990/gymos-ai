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
  const { analytics, userProfile, diet, workout } = state;

  const analyticsStats = [
    {
      label: 'Projected runway',
      value: `${analytics.projectedWeeks} weeks`,
      detail: `Forecast is using your ${userProfile.goal.replace('_', ' ')}, ${userProfile.workoutDaysPerWeek}-day cadence, and recovery at ${analytics.recovery}%.`,
      icon: 'chart',
    },
    {
      label: 'Strength slope',
      value: `+${analytics.strengthSlope.toFixed(1)}%`,
      detail: `${userProfile.trainerName} is keeping lift progress believable for a ${userProfile.experienceLevel} athlete.`,
      icon: 'dumbbell',
    },
    {
      label: 'Discipline score',
      value: `${analytics.disciplineScore}`,
      detail: `Reminder mode ${userProfile.reminders} and ${userProfile.tone} coaching are keeping adherence stable.`,
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
      const nextRecovery = clamp(analytics.recovery + randomInteger(-2, 2), 80, 95);
      const nextProjectedWeeks = clamp(
        analytics.projectedWeeks + randomInteger(-1, 1),
        4,
        12,
      );
      const nextStrengthSlope = clamp(
        analytics.strengthSlope + randomFloat(-0.25, 0.35),
        6.8,
        12.8,
      );
      const nextDisciplineScore = clamp(
        analytics.disciplineScore + randomInteger(-1, 1),
        80,
        99,
      );
      const nextStreak = analytics.streak + randomInteger(0, 1);
      const nextBodyTrend = analytics.bodyTrend.map((item, index) => ({
        ...item,
        value: clamp(item.value + randomInteger(index < 2 ? 0 : 0, 1), 48, 96),
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
      const refreshSummary = `${userProfile.trainerName} refreshed the forecast: recovery ${nextRecovery}%, slope +${nextStrengthSlope.toFixed(1)}%, and your ${userProfile.goal.replace('_', ' ')} timeline is still holding near ${nextProjectedWeeks} weeks.`;

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
            workout.plan.isWorkoutDay
              ? `${workout.plan.dayLabel} still matches your recovery state, so today's plan stays believable.`
              : 'Recovery day guidance still looks right, so the system is not forcing unnecessary load.',
            diet.dinnerLogged
              ? `${diet.lastDinnerLog?.mealTitle || 'Dinner'} is logged, so nutrition confidence stays high.`
              : `Nutrition is still the cleanest lever because your ${diet.remainingBudget.toFixed(2)} budget remains open.`,
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
          feedItem: `${label}. ${userProfile.trainerName} can now compare the new frame against your current ${userProfile.goal.replace('_', ' ')} trend.`,
        },
      });
    },
  };
}
