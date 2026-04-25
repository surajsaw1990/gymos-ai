import { buildDietPlan } from '@/services/trainerEngine';
import { useAppState } from '@/hooks/useAppState';

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rotateItems(items, rotation) {
  if (!items.length) {
    return items;
  }

  const offset = ((rotation % items.length) + items.length) % items.length;

  return [...items.slice(offset), ...items.slice(0, offset)];
}

function buildMacroSplit(protein, carbs, fats) {
  const total = protein + carbs + fats;

  if (total <= 0) {
    return [
      { label: 'Protein', value: 38, color: 'bg-brand-400' },
      { label: 'Carbs', value: 42, color: 'bg-mint-400' },
      { label: 'Fats', value: 20, color: 'bg-sky-400' },
    ];
  }

  const proteinValue = Math.round((protein / total) * 100);
  const carbsValue = Math.round((carbs / total) * 100);
  const fatsValue = Math.max(0, 100 - proteinValue - carbsValue);

  return [
    { label: 'Protein', value: proteinValue, color: 'bg-brand-400' },
    { label: 'Carbs', value: carbsValue, color: 'bg-mint-400' },
    { label: 'Fats', value: fatsValue, color: 'bg-sky-400' },
  ];
}

function buildMealTimeline(profile, dietPlan, workoutPlan, diet) {
  const breakfast =
    profile.foodPreference === 'veg'
      ? 'Paneer poha + curd'
      : profile.foodPreference === 'non-veg'
        ? 'Egg bhurji toast + curd'
        : 'Masala omelette + paneer toast';
  const lunch =
    profile.foodPreference === 'veg'
      ? 'Dal rice bowl with paneer'
      : profile.foodPreference === 'non-veg'
        ? 'Chicken rice bowl'
        : 'Egg rice bowl with curd';
  const dinnerTitle = diet.dinnerLogged
    ? diet.lastDinnerLog?.mealTitle || 'Dinner logged'
    : workoutPlan.isWorkoutDay
      ? 'Post-workout dinner'
      : 'Recovery dinner';
  const dinnerDetail = diet.dinnerLogged
    ? diet.lastDinnerLog?.message
    : workoutPlan.isWorkoutDay
      ? `${dietPlan.postWorkoutMeal} keeps protein high without overspending.`
      : `${dietPlan.mealSuggestion} keeps recovery steady on a lighter day.`;
  const dinnerCost = diet.dinnerLogged
    ? `$${diet.lastDinnerLog?.spend?.toFixed(2) || '0.00'}`
    : `$${Math.min(dietPlan.dailyBudget * 0.28, 3.6).toFixed(2)}`;

  return [
    {
      time: '08:00',
      title: breakfast,
      detail: `Easy start for a ${profile.goal.replace('_', ' ')} goal with clean protein coverage.`,
      cost: `$${Math.min(dietPlan.dailyBudget * 0.18, 2.6).toFixed(2)}`,
    },
    {
      time: '13:00',
      title: lunch,
      detail: `Main plate stays inside budget and supports your ${profile.workoutDaysPerWeek}-day split.`,
      cost: `$${Math.min(dietPlan.dailyBudget * 0.3, 4.1).toFixed(2)}`,
    },
    {
      time: workoutPlan.isWorkoutDay ? '19:30' : '20:00',
      title: dinnerTitle,
      detail: dinnerDetail,
      cost: dinnerCost,
    },
  ];
}

function buildSmartSwaps(profile, dietPlan, workoutPlan) {
  const baseSwaps = [
    {
      title: 'Keep the affordable protein anchor',
      detail: `${dietPlan.mealSuggestion} is the easiest way to protect protein without breaking the ${dietPlan.budgetLabel}.`,
    },
    {
      title: 'Use curd instead of a packaged snack',
      detail: 'You keep satiety higher, digestion easier, and cost lower at the same time.',
    },
    {
      title: workoutPlan.isWorkoutDay ? 'Hold one clean post-workout meal' : 'Keep dinner light and complete',
      detail: workoutPlan.isWorkoutDay
        ? `${dietPlan.postWorkoutMeal} covers protein and carbs cleanly after the gym.`
        : `${dietPlan.mealSuggestion} keeps recovery steady without unnecessary late-night calories.`,
    },
  ];

  if (profile.foodPreference === 'veg') {
    baseSwaps.push({
      title: 'Rotate in soya on tight-budget days',
      detail: 'Soya plus curd is still one of the cheapest high-protein Indian combinations.',
    });
  } else {
    baseSwaps.push({
      title: 'Use eggs when chicken feels expensive',
      detail: 'Egg bhurji or omelette wraps keep protein high with better budget control.',
    });
  }

  return baseSwaps;
}

function buildGroceryItems(profile, dietPlan) {
  const stapleProtein =
    profile.foodPreference === 'veg'
      ? 'Paneer + soya chunks'
      : profile.foodPreference === 'non-veg'
        ? 'Chicken + eggs'
        : 'Eggs + paneer';

  return [
    {
      name: stapleProtein,
      detail: `Primary protein stack for your ${dietPlan.proteinTarget}g target.`,
    },
    {
      name: 'Curd + rice + potatoes',
      detail: 'Affordable carb base for pre-workout and post-workout meals.',
    },
    {
      name: 'Fruit + cucumber + spinach',
      detail: 'Easy micronutrient add-ons that keep the plan feeling light and practical.',
    },
  ];
}

function buildDinnerPayload(diet, dietPlan, workoutPlan) {
  const proteinGain = randomInteger(10, 30);
  const carbGain = randomInteger(5, 20);
  const fatGain = randomInteger(3, 10);
  const mealTitle = workoutPlan.isWorkoutDay ? dietPlan.postWorkoutMeal : dietPlan.mealSuggestion;
  const rawSpend = proteinGain * 0.042 + carbGain * 0.016 + fatGain * 0.028 + 0.55;
  const spend = Number(Math.min(Math.max(rawSpend, 1.4), Math.max(diet.remainingBudget, 1.4)).toFixed(2));

  return {
    proteinGain,
    carbGain,
    fatGain,
    spend,
    mealTitle,
  };
}

export function useDiet() {
  const { state, dispatch } = useAppState();
  const { diet, userProfile, workout } = state;
  const dietPlan = buildDietPlan(userProfile, workout.plan.isWorkoutDay);
  const proteinRemaining = Math.max(0, dietPlan.proteinTarget - diet.proteinConsumed);
  const smartSwaps = rotateItems(
    buildSmartSwaps(userProfile, dietPlan, workout.plan),
    diet.swapRotation,
  ).slice(0, 3);
  const mealTimeline = buildMealTimeline(userProfile, dietPlan, workout.plan, diet);
  const groceryItems = buildGroceryItems(userProfile, dietPlan);
  const macroSplit = buildMacroSplit(diet.proteinConsumed, diet.carbsConsumed, diet.fatsConsumed);

  const dietStats = [
    {
      label: 'Protein target',
      value: `${diet.proteinConsumed}g`,
      detail:
        proteinRemaining > 0
          ? `${proteinRemaining}g left toward a ${dietPlan.proteinTarget}g target for ${userProfile.weightKg} kg body weight.`
          : `Protein target is covered for your ${userProfile.weightKg} kg body weight.`,
      icon: 'dumbbell',
    },
    {
      label: 'Daily budget',
      value: `$${diet.remainingBudget.toFixed(2)}`,
      detail: `${dietPlan.budgetLabel} has $${diet.remainingBudget.toFixed(2)} left for ${dietPlan.dayTypeLabel.toLowerCase()} meals.`,
      icon: 'leaf',
    },
    {
      label: 'Meal adherence',
      value: `${diet.adherence}%`,
      detail: diet.lastDinnerLog
        ? `${diet.lastDinnerLog.mealTitle} kept protein moving without letting budget go negative.`
        : `Diet is tuned for ${userProfile.foodPreference} meals and ${userProfile.goal.replace('_', ' ')}.`,
      icon: 'chart',
    },
  ];

  return {
    budgetLabel: dietPlan.budgetLabel,
    dayTypeLabel: dietPlan.dayTypeLabel,
    diet,
    dietPlan,
    dietStats,
    dinnerLogged: diet.dinnerLogged,
    feedbackMessage: diet.feedbackMessage,
    groceryItems,
    isGroceryPreviewOpen: diet.groceryPreviewOpen,
    lastDinnerLog: diet.lastDinnerLog,
    macroSplit,
    mealSuggestion: dietPlan.mealSuggestion,
    mealTimeline,
    postWorkoutMeal: dietPlan.postWorkoutMeal,
    proteinRemaining,
    remainingBudget: diet.remainingBudget,
    smartSwaps,
    logDinnerPlan() {
      dispatch({
        type: 'LOG_DINNER_PLAN',
        payload: buildDinnerPayload(diet, dietPlan, workout.plan),
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
