import { useAppState } from '@/hooks/useAppState';

function resolveBudgetLabel(budget) {
  if (budget === 'lean') {
    return 'Lean budget';
  }

  if (budget === 'performance') {
    return 'Performance budget';
  }

  return 'Balanced budget';
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildDinnerPayload(remainingBudget, budgetMode) {
  const proteinGain = randomInteger(10, 30);
  const carbGain = randomInteger(5, 20);
  const fatGain = randomInteger(3, 10);
  const baseSpend =
    proteinGain * 0.045 +
    carbGain * 0.018 +
    fatGain * 0.03 +
    (budgetMode === 'performance' ? 0.35 : 0.15);
  const spend = Number(Math.min(Math.max(baseSpend, 1.25), remainingBudget).toFixed(2));

  return {
    proteinGain,
    carbGain,
    fatGain,
    spend,
  };
}

export function useDiet() {
  const { state, dispatch } = useAppState();
  const { diet, userProfile } = state;
  const proteinRemaining = Math.max(0, diet.proteinTarget - diet.proteinConsumed);
  const budgetLabel = resolveBudgetLabel(userProfile.budget);

  const dietStats = [
    {
      label: 'Daily budget',
      value: `$${diet.remainingBudget.toFixed(2)}`,
      detail: `${budgetLabel} has ${diet.remainingBudget.toFixed(2)} left for tonight's food decisions.`,
      icon: 'leaf',
    },
    {
      label: 'Protein target',
      value: `${diet.proteinConsumed}g`,
      detail:
        proteinRemaining > 0
          ? `${proteinRemaining}g away from the day goal.`
          : 'Protein target has been covered for the day.',
      icon: 'dumbbell',
    },
    {
      label: 'Meal adherence',
      value: `${diet.adherence}%`,
      detail: diet.lastDinnerLog
        ? `Latest dinner close added ${diet.lastDinnerLog.proteinGain}g protein without overspending.`
        : 'Budget-based diet choices are matching your target pattern well.',
      icon: 'chart',
    },
  ];

  return {
    budgetLabel,
    dinnerLogged: diet.dinnerLogged,
    diet,
    dietStats,
    groceryItems: diet.groceryItems,
    isGroceryPreviewOpen: diet.groceryPreviewOpen,
    lastDinnerLog: diet.lastDinnerLog,
    macroSplit: diet.macroSplit,
    mealTimeline: diet.mealTimeline,
    proteinRemaining,
    remainingBudget: diet.remainingBudget,
    smartSwaps: diet.smartSwaps,
    logDinnerPlan() {
      dispatch({
        type: 'LOG_DINNER_PLAN',
        payload: buildDinnerPayload(diet.remainingBudget, userProfile.budget),
      });
    },
    refreshIdeas() {
      dispatch({ type: 'ROTATE_DIET_SWAPS' });
    },
    toggleGroceryPreview() {
      dispatch({ type: 'TOGGLE_GROCERY_PREVIEW' });
    },
  };
}
