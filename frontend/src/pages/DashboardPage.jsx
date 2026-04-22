import { motion } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { LOCKED_FEATURES } from '@/constants/brand';
import { CadenceTimeline } from '@/features/dashboard/components/CadenceTimeline';
import { FocusModules } from '@/features/dashboard/components/FocusModules';
import { SignalStrip } from '@/features/dashboard/components/SignalStrip';
import { useAppState } from '@/hooks/useAppState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

function getGoalCopy(goal) {
  if (goal === 'strength') {
    return {
      desktopHeadline: 'Tonight is shaped for strength-first training with clean recovery support after.',
      mobileHeadline: 'Heavy session. Clean recovery. Tight focus.',
      desktopBody:
        'Workout Intelligence Engine is protecting output first, while the diet layer keeps the close-out meal efficient.',
      mobileBody: 'Strength comes first tonight, with nutrition staying tight after the lift.',
    };
  }

  if (goal === 'discipline') {
    return {
      desktopHeadline: 'Tonight is shaped for consistent execution with low-friction pacing and calm reminders.',
      mobileHeadline: 'Stay consistent. Stay calm. Keep momentum.',
      desktopBody:
        'The system is lowering noise, protecting routine, and keeping the next best action obvious from the first glance.',
      mobileBody: 'The shell is optimized for routine, adherence, and a clean finish tonight.',
    };
  }

  return {
    desktopHeadline: 'Tonight is shaped for strength-first training with budget-aware recovery after.',
    mobileHeadline: 'Heavy session. Clean recovery. Tight focus.',
    desktopBody:
      'Workout Intelligence Engine wants a controlled heavy session, while the Diet Engine still keeps dinner inside budget and macro guardrails.',
    mobileBody: 'Workout Intelligence Engine wants a controlled heavy session with a clean dinner close.',
  };
}

export default function DashboardPage() {
  useDocumentTitle('Dashboard');
  const { state } = useAppState();
  const { analytics, diet, userProfile, workout } = state;
  const currentExercise = workout.queue[workout.currentExerciseIndex] || workout.queue[0];
  const priorityFeatures = LOCKED_FEATURES.slice(0, 4);
  const goalCopy = getGoalCopy(userProfile.goal);

  const dashboardStats = [
    {
      label: 'Recovery pulse',
      value: `${analytics.recovery}%`,
      detail:
        analytics.recovery >= 86
          ? 'Sleep, soreness, and fatigue are aligned for a heavy-first session.'
          : 'Recovery remains stable, so intensity can stay controlled without forcing volume.',
      icon: 'pulse',
    },
    {
      label: 'Discipline streak',
      value: `${analytics.streak} days`,
      detail: `Consistency is compounding. The discipline engine trusts your ${userProfile.cadence} cadence.`,
      icon: 'streak',
    },
    {
      label: 'Adaptive load',
      value: `+${analytics.strengthSlope.toFixed(1)}%`,
      detail: workout.sessionActive
        ? `Live session is centered on ${currentExercise.name.toLowerCase()}.`
        : 'Workout Intelligence Engine wants a measured progression tonight.',
      icon: 'chart',
    },
  ];

  const focusModules = [
    {
      id: 'F2',
      title: 'Workout Intelligence Engine',
      summary: workout.sessionActive
        ? `Current session is live on ${currentExercise.name} with clear set pacing.`
        : `${currentExercise.name} is positioned as the anchor movement for tonight's session.`,
      icon: 'dumbbell',
    },
    {
      id: 'F6',
      title: 'Recovery & Fatigue Tracker',
      summary:
        analytics.recovery >= 86
          ? 'Readiness is high enough for a strength-biased session with controlled volume.'
          : 'Recovery is steady, so the system is favoring quality over fatigue spikes.',
      icon: 'pulse',
    },
    {
      id: 'F8',
      title: 'Streak & Discipline Engine',
      summary: `Your ${analytics.streak}-day run is strongest when workouts stay inside the ${userProfile.cadence} rhythm.`,
      icon: 'streak',
    },
    {
      id: 'F11',
      title: 'Smart AI Reminder',
      summary:
        userProfile.reminders === 'minimal'
          ? 'Reminder load is intentionally quiet until routine risk rises.'
          : userProfile.reminders === 'high'
            ? 'High-accountability reminders are armed for hydration, training, and sleep cutoff.'
            : 'Context-aware reminders are tuned to training, food timing, and sleep consistency.',
      icon: 'bell',
    },
  ];

  const cadenceTimeline = [
    {
      time: '06:30',
      title: 'Hydration cue',
      detail:
        userProfile.reminders === 'minimal'
          ? 'A single quiet hydration nudge keeps the routine alive without extra noise.'
          : 'Smart reminder nudges water and a short mobility opener before the evening lift.',
    },
    {
      time: '07:15',
      title: 'Strength block',
      detail: workout.sessionActive
        ? `${currentExercise.name} is live in gym mode with clear rest pacing and low-noise cues.`
        : `${currentExercise.name} is queued as the lead block when the workout session begins.`,
    },
    {
      time: '09:00',
      title: diet.dinnerLogged ? 'Dinner logged' : 'Budget plate',
      detail: diet.dinnerLogged
        ? `Dinner is already in the plan with $${diet.remainingBudget.toFixed(2)} left in budget.`
        : 'Diet engine suggests a protein-heavy dinner that stays inside the daily budget cap.',
    },
    {
      time: '22:30',
      title: 'Recovery cutoff',
      detail:
        userProfile.tone === 'assertive'
          ? 'Coach tone stays direct on caffeine cutoff and sleep timing.'
          : 'Wind-down guidance stays calm so recovery remains easy to follow.',
    },
  ];

  const aiSignals = [
    {
      title: workout.sessionActive ? 'Session is already live' : 'Strength is the priority',
      detail: workout.sessionActive
        ? `${currentExercise.name} is active, and the queue is pacing the next decisions cleanly.`
        : 'Current readiness favors heavier compound lifts over volume chasing.',
      icon: 'dumbbell',
    },
    {
      title: diet.dinnerLogged ? 'Dinner plan is locked in' : 'Budget plate looks clean',
      detail: diet.dinnerLogged
        ? `Protein intake is trending toward the target with $${diet.remainingBudget.toFixed(2)} still available.`
        : "Today's macro target can still be hit with one controlled dinner.",
      icon: 'leaf',
    },
    {
      title: 'Prediction remains on track',
      detail: `Progress Prediction still projects visible movement across the next ${analytics.projectedWeeks} weeks.`,
      icon: 'chart',
    },
  ];

  const coachOverview = [
    analytics.recovery >= 86
      ? 'Streak risk is low and recovery supports a confident evening session.'
      : 'Streak risk is still controlled, but fatigue management stays slightly more conservative tonight.',
    workout.sessionActive
      ? `${currentExercise.name} is active now, so the system is holding the interface quiet and focused.`
      : `${currentExercise.name} is still queued as the next high-value training decision.`,
    diet.dinnerLogged
      ? 'Dinner has already been logged, so reminder pressure can stay low for the rest of the night.'
      : 'Smart AI Reminder is preserving one clean nutrition nudge before the dinner window closes.',
  ];

  const mobileHighlights = dashboardStats.slice(0, 2);

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Landing / Dashboard"
        title="A calm command center for training, fueling, and staying disciplined."
        mobileTitle="Train sharp tonight."
        description="The GYMOS AI dashboard surfaces only the signals that matter right now: readiness, workout intent, nutrition pressure, and the next best action."
        hideDescriptionOnMobile
        meta={['11 locked AI systems', 'Premium dark shell', 'Mobile and desktop ready']}
        actions={
          <>
            <Button to="/workout" icon>
              Start workout
            </Button>
            <Button to="/analytics" variant="secondary">
              View progress
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-4 xl:grid-cols-[1.28fr_0.72fr]" variants={fadeUp}>
        <Panel className="px-4 py-4 sm:px-7 sm:py-7">
          <div className="hidden flex-wrap items-center gap-3 sm:flex">
            <span className="rounded-full border border-brand-400/18 bg-brand-400/10 px-3 py-1.5 text-xs font-semibold tracking-[0.22em] text-brand-300 uppercase">
              Adaptive coaching live
            </span>
            <span className="rounded-full border border-mint-400/18 bg-mint-400/10 px-3 py-1.5 text-xs font-semibold tracking-[0.22em] text-mint-400 uppercase">
              Recovery {analytics.recovery}% synced
            </span>
          </div>

          <h3 className="mt-1 font-display text-[1.6rem] leading-[1.04] font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl">
            <span className="sm:hidden">{goalCopy.mobileHeadline}</span>
            <span className="hidden sm:inline">{goalCopy.desktopHeadline}</span>
          </h3>

          <p className="mt-2.5 max-w-3xl text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base sm:leading-8">
            <span className="sm:hidden">{goalCopy.mobileBody}</span>
            <span className="hidden sm:inline">{goalCopy.desktopBody}</span>
          </p>

          <div className="mt-4 grid gap-2.5 sm:hidden">
            {mobileHighlights.map((item) => (
              <div
                key={item.label}
                className="panel-muted flex items-center justify-between gap-3 rounded-[20px] px-4 py-3.5"
              >
                <div>
                  <p className="text-[12px] text-slate-500">{item.label}</p>
                  <p className="mt-1 font-display text-xl font-semibold text-white">{item.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-brand-400/18 bg-brand-400/10 text-brand-300">
                  <AppIcon name={item.icon} className="h-4.5 w-4.5" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 hidden gap-4 sm:grid md:grid-cols-2 xl:grid-cols-4">
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

        <Panel className="hidden px-6 py-6 sm:block sm:px-7 sm:py-7">
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

          <div className="mt-6 space-y-3">
            {coachOverview.map((item) => (
              <div
                key={item}
                className="panel-muted rounded-[22px] px-4 py-4 text-sm leading-7 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </motion.section>

      <motion.section className="grid gap-3 sm:gap-4 lg:grid-cols-3" variants={fadeUp}>
        {dashboardStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.1fr_0.9fr]" variants={fadeUp}>
        <StatePanel
          title="Priority modules"
          description="Feature modules stay visible only when they can change today's plan."
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
