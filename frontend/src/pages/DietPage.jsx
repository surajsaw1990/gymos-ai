import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { MacroSplit } from '@/features/diet/components/MacroSplit';
import { MealTimeline } from '@/features/diet/components/MealTimeline';
import { useDiet } from '@/hooks/useDiet';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function DietPage() {
  useDocumentTitle('Diet');
  const {
    budgetLabel,
    dayTypeLabel,
    dietPlan,
    dietStats,
    dinnerLogged,
    feedbackMessage,
    groceryItems,
    isGroceryPreviewOpen,
    lastDinnerLog,
    logDinnerPlan,
    macroSplit,
    mealSuggestion,
    mealTimeline,
    postWorkoutMeal,
    proteinRemaining,
    refreshIdeas,
    remainingBudget,
    smartSwaps,
    toggleGroceryPreview,
  } = useDiet();
  const [isLoggingDinner, setIsLoggingDinner] = useState(false);
  const dinnerTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (dinnerTimerRef.current) {
        window.clearTimeout(dinnerTimerRef.current);
      }
    };
  }, []);

  const handleDinnerLog = () => {
    if (isLoggingDinner) {
      return;
    }

    setIsLoggingDinner(true);
    dinnerTimerRef.current = window.setTimeout(() => {
      logDinnerPlan();
      setIsLoggingDinner(false);
      dinnerTimerRef.current = null;
    }, 650);
  };

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Diet"
        title="Diet should feel like a trainer’s meal guidance, not a spreadsheet."
        mobileTitle="Diet guidance"
        description="This screen now uses your goal, body weight, food preference, budget, and workout day state to suggest simple Indian meals that actually fit real life."
        mobileDescription="Protein target, Indian meals, and budget-smart guidance."
        meta={['Weight-based protein', 'Indian meal ideas', 'Budget-aware diet']}
        actions={
          <>
            <Button loading={isLoggingDinner} onClick={handleDinnerLog}>
              Log dinner
            </Button>
            <Button variant="secondary" onClick={toggleGroceryPreview}>
              {isGroceryPreviewOpen ? 'Hide grocery view' : 'Open grocery view'}
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-3 sm:gap-4 lg:grid-cols-3" variants={fadeUp}>
        {dietStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.05fr_0.95fr]" variants={fadeUp}>
        <Panel className="px-4 py-4 sm:px-7 sm:py-7">
          <div className="hidden flex-wrap items-center gap-3 sm:flex">
            <Badge icon="leaf">{budgetLabel}</Badge>
            <Badge icon="chart" tone="neutral">
              {dayTypeLabel}
            </Badge>
            <Badge icon="dumbbell" tone="neutral">
              {proteinRemaining > 0 ? `${proteinRemaining}g protein left` : 'Protein target covered'}
            </Badge>
          </div>
          <h3 className="mt-1 font-display text-[1.6rem] leading-[1.05] font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl">
            {dinnerLogged
              ? `${lastDinnerLog?.mealTitle || 'Dinner'} is logged and the budget stayed clean.`
              : `${mealSuggestion} is the smart move for tonight.`}
          </h3>
          <p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:leading-7">
            Protein target is {dietPlan.proteinTarget}g, your current budget has ${remainingBudget.toFixed(2)} left, and {postWorkoutMeal.toLowerCase()} is set as the easiest post-workout close.
          </p>

          {feedbackMessage ? (
            <div className="panel-muted mt-4 rounded-[20px] px-4 py-3 text-sm leading-6 text-slate-300 sm:mt-5 sm:rounded-[24px] sm:py-4 sm:leading-7">
              {feedbackMessage}
            </div>
          ) : null}

          <div className="mt-5 sm:mt-8">
            <MacroSplit items={macroSplit} />
          </div>
        </Panel>

        <StatePanel
          title="Affordable meal logic"
          description="Suggestions stay realistic, Indian, and aligned to your profile."
          action={
            <Button variant="ghost" onClick={refreshIdeas}>
              Refresh ideas
            </Button>
          }
        >
          <div className="space-y-2.5 sm:space-y-3">
            {smartSwaps.map((item) => (
              <div
                key={item.title}
                className="panel-muted rounded-[22px] px-4 py-3.5 sm:rounded-[24px] sm:py-4"
              >
                <h4 className="font-medium text-white">{item.title}</h4>
                <p className="mt-1.5 text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </StatePanel>
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.1fr_0.9fr]" variants={fadeUp}>
        <StatePanel
          title="Meal timeline"
          description="Your timeline now reads like a trainer’s day plan instead of a placeholder diet shell."
        >
          <MealTimeline meals={mealTimeline} />
        </StatePanel>

        <StatePanel
          title="Grocery capture"
          description={
            isGroceryPreviewOpen
              ? 'Ingredients, budget, and recovery foods stay in one compact surface.'
              : 'The shell stays stable even before you open the grocery preview.'
          }
          isEmpty={!isGroceryPreviewOpen}
          emptyIcon="leaf"
          emptyTitle="No grocery items captured yet"
          emptyDescription="Open the grocery view and the app will surface the staples that fit your protein target and budget pattern."
        >
          <div className="space-y-2.5 sm:space-y-3">
            {groceryItems.map((item) => (
              <div
                key={item.name}
                className="panel-muted rounded-[22px] px-4 py-3.5 sm:rounded-[24px] sm:py-4"
              >
                <h4 className="font-medium text-white">{item.name}</h4>
                <p className="mt-1.5 text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </StatePanel>
      </motion.section>
    </motion.div>
  );
}
