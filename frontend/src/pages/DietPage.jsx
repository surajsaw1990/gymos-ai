import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { dietStats, macroSplit, mealTimeline, smartSwaps } from '@/constants/diet';
import { MacroSplit } from '@/features/diet/components/MacroSplit';
import { MealTimeline } from '@/features/diet/components/MealTimeline';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function DietPage() {
  useDocumentTitle('Diet');

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Diet Screen Shell"
        title="Nutrition should feel premium, not spreadsheet-heavy."
        description="The diet shell pairs budget awareness with clean macro visibility, simple meal timing, and tasteful swap suggestions that respect real daily constraints."
        meta={['Budget-based diet engine', 'Meal timing ready', 'Macro-safe layout']}
        actions={
          <>
            <Button>Log dinner plan</Button>
            <Button variant="secondary">Open grocery view</Button>
          </>
        }
      />

      <motion.section className="grid gap-4 lg:grid-cols-3" variants={fadeUp}>
        {dietStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]" variants={fadeUp}>
        <Panel className="px-6 py-6 sm:px-7 sm:py-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge icon="leaf">Budget plate status</Badge>
            <Badge icon="chart" tone="neutral">
              Macro targets still reachable
            </Badge>
          </div>
          <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
            The budget engine is keeping today efficient.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
            You still have enough room for a protein-forward dinner without losing control of
            total spend or late-night appetite management.
          </p>

          <div className="mt-8">
            <MacroSplit items={macroSplit} />
          </div>
        </Panel>

        <StatePanel
          title="Smart swaps"
          description="Swap suggestions are framed as clean upgrades, not punishment."
          action={<Button variant="ghost">Refresh ideas</Button>}
        >
          <div className="space-y-3">
            {smartSwaps.map((item) => (
              <div key={item.title} className="panel-muted rounded-[24px] px-4 py-4">
                <h4 className="font-medium text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </StatePanel>
      </motion.section>

      <motion.section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" variants={fadeUp}>
        <StatePanel
          title="Meal timeline"
          description="Simple time-based structure makes the diet screen feel calm and actionable."
        >
          <MealTimeline meals={mealTimeline} />
        </StatePanel>

        <StatePanel
          title="Grocery capture"
          description="The layout stays composed even before the user starts tracking ingredients."
          isEmpty
          emptyIcon="leaf"
          emptyTitle="No grocery items captured yet"
          emptyDescription="Add pantry items, recurring staples, or local-price ingredients and this panel can evolve into a budget-aware shopping view."
        />
      </motion.section>
    </motion.div>
  );
}
