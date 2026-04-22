import { motion } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { cadenceTimeline, dashboardStats, focusModules, aiSignals } from '@/constants/dashboard';
import { LOCKED_FEATURES } from '@/constants/brand';
import { FocusModules } from '@/features/dashboard/components/FocusModules';
import { CadenceTimeline } from '@/features/dashboard/components/CadenceTimeline';
import { SignalStrip } from '@/features/dashboard/components/SignalStrip';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

const priorityFeatures = LOCKED_FEATURES.slice(0, 4);

export default function DashboardPage() {
  useDocumentTitle('Dashboard');

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Landing / Dashboard"
        title="A calm command center for training, fueling, and staying disciplined."
        description="The GYMOS AI dashboard surfaces only the signals that matter right now: readiness, workout intent, nutrition pressure, and the next best action."
        meta={['11 locked AI systems', 'Premium dark shell', 'Mobile and desktop ready']}
        actions={
          <>
            <Button to="/workout" icon>
              Open workout shell
            </Button>
            <Button to="/analytics" variant="secondary">
              View progress
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]" variants={fadeUp}>
        <Panel className="px-6 py-6 sm:px-7 sm:py-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge icon="spark">Adaptive coaching live</Badge>
            <Badge icon="pulse" tone="mint">
              Recovery favors intensity
            </Badge>
          </div>

          <h3 className="mt-6 max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
            Tonight is shaped for strength-first training with budget-aware recovery after.
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400">
            Workout Intelligence Engine wants a controlled heavy session, while the Diet Engine
            still keeps dinner inside budget and macro guardrails.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {priorityFeatures.map((feature) => (
              <div key={feature.id} className="panel-muted rounded-[24px] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-400/18 bg-brand-400/10 text-brand-300">
                    <AppIcon name={feature.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-xs tracking-[0.22em] text-slate-500 uppercase">
                    {feature.id}
                  </span>
                </div>
                <h4 className="mt-4 font-medium text-white">{feature.name}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-400">{feature.summary}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="px-6 py-6 sm:px-7 sm:py-7">
          <p className="text-xs font-semibold tracking-[0.28em] text-brand-300 uppercase">
            Coach overview
          </p>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white">
            The system sees momentum.
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Your routine is stable enough that the premium shell can stay quiet and intentional,
            instead of shouting for attention.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'Streak risk is low for the next 72 hours.',
              'Recovery & Fatigue Tracker expects a strong warm-up response tonight.',
              'Smart AI Reminder will reduce prompt frequency if adherence stays high.',
            ].map((item) => (
              <div key={item} className="panel-muted rounded-[22px] px-4 py-4 text-sm leading-7 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </motion.section>

      <motion.section className="grid gap-4 lg:grid-cols-3" variants={fadeUp}>
        {dashboardStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" variants={fadeUp}>
        <StatePanel
          title="Priority modules"
          description="Feature modules stay visible only when they can change today’s plan."
        >
          <FocusModules modules={focusModules} />
        </StatePanel>

        <StatePanel
          title="Daily cadence"
          description="A premium schedule should feel guided, not noisy."
        >
          <CadenceTimeline items={cadenceTimeline} />
        </StatePanel>
      </motion.section>

      <motion.section variants={fadeUp}>
        <StatePanel
          title="AI signals"
          description="Short, high-signal insights across workout, recovery, diet, and prediction."
        >
          <SignalStrip signals={aiSignals} />
        </StatePanel>
      </motion.section>
    </motion.div>
  );
}
