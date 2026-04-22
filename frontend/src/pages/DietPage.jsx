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
    dinnerLogged,
    dietStats,
    groceryItems,
    isGroceryPreviewOpen,
    logDinnerPlan,
    macroSplit,
    mealTimeline,
    proteinRemaining,
    refreshIdeas,
    remainingBudget,
    smartSwaps,
    toggleGroceryPreview,
  } = useDiet();

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Diet Screen Shell"
        title="Nutrition should feel premium, not spreadsheet-heavy."
        mobileTitle="Diet shell"
        description="The diet shell pairs budget awareness with clean macro visibility, simple meal timing, and tasteful swap suggestions that respect real daily constraints."
        mobileDescription="Budget-smart meals, clean macros, and simple swaps."
        meta={['Budget-based diet engine', 'Meal timing ready', 'Macro-safe layout']}
        actions={
          <>
            <Button onClick={logDinnerPlan}>Log dinner plan</Button>
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
              {proteinRemaining > 0 ? `${proteinRemaining}g protein left` : 'Protein target covered'}
            </Badge>
          </div>
          <h3 className="mt-1 font-display text-[1.6rem] leading-[1.05] font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl">
            {dinnerLogged
              ? 'Dinner is logged and the budget engine stayed efficient.'
              : 'The budget engine is keeping today efficient.'}
          </h3>
          <p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:leading-7">
            {dinnerLogged
              ? `You still have $${remainingBudget.toFixed(2)} available, and the dinner slot is now helping close the protein target without drifting away from budget.`
              : 'You still have enough room for a protein-forward dinner without losing control of total spend or late-night appetite management.'}
          </p>

          <div className="mt-5 sm:mt-8">
            <MacroSplit items={macroSplit} />
          </div>
        </Panel>

        <StatePanel
          title="Smart swaps"
          description="Swap suggestions are framed as clean upgrades, not punishment."
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
          description="Simple time-based structure makes the diet screen feel calm and actionable."
        >
          <MealTimeline meals={mealTimeline} />
        </StatePanel>

        <StatePanel
          title="Grocery capture"
          description={
            isGroceryPreviewOpen
              ? 'A compact grocery preview keeps ingredients, budget, and dinner planning in one calm surface.'
              : 'The layout stays composed even before the user starts tracking ingredients.'
          }
          isEmpty={!isGroceryPreviewOpen}
          emptyIcon="leaf"
          emptyTitle="No grocery items captured yet"
          emptyDescription="Add pantry items, recurring staples, or local-price ingredients and this panel can evolve into a budget-aware shopping view."
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
