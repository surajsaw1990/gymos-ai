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
      desktopHeadline: 'Strength is the priority today, with recovery and nutrition keeping the output clean.',
      mobileHeadline: 'Train strong. Recover smart.',
      desktopBody:
        'GYMOS AI is biasing your session toward stronger main lifts, while the diet layer keeps the close-out meal practical and repeatable.',
      mobileBody: 'Your trainer is keeping today strong, focused, and easy to recover from.',
    };
  }

  if (goal === 'muscle_gain') {
    return {
      desktopHeadline: 'Today is built for quality volume, muscular tension, and low-noise progression.',
      mobileHeadline: 'Build size. Keep form tight.',
      desktopBody:
        'The trainer is protecting hypertrophy quality first, then using meals, reminders, and recovery to keep growth consistent.',
      mobileBody: 'Quality volume is the target, with nutrition staying simple after the gym.',
    };
  }

  if (goal === 'fat_loss') {
    return {
      desktopHeadline: 'Today is shaped for clean output, controlled fatigue, and a budget-safe nutrition finish.',
      mobileHeadline: 'Stay sharp. Keep the deficit clean.',
      desktopBody:
        'The app is balancing recovery, intensity, and affordable meals so fat loss does not turn into chaos.',
      mobileBody: 'Your plan keeps training efficient and food practical for fat loss.',
    };
  }

  return {
    desktopHeadline: 'Today is shaped for steady recomposition with a personal trainer feel all the way through.',
    mobileHeadline: 'Train clean. Recomp steady.',
    desktopBody:
      'Workout, diet, reminders, and chat are all speaking from the same profile now, so the app feels more like one real coach.',
    mobileBody: 'Everything is aligned around clean training and realistic nutrition today.',
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
          ? 'Readiness is high enough for a confident session with quality output.'
          : 'Recovery is stable, so the trainer is protecting quality over ego.',
      icon: 'pulse',
    },
    {
      label: 'Discipline streak',
      value: `${analytics.streak} days`,
      detail: `${userProfile.trainerName} is trusting your ${userProfile.workoutDaysPerWeek}-day rhythm right now.`,
      icon: 'streak',
    },
    {
      label: 'Today\'s focus',
      value: workout.plan.dayLabel,
      detail: workout.sessionActive
        ? `Session is live on ${currentExercise.name}.`
        : workout.plan.todayFocus,
      icon: 'chart',
    },
  ];

  const focusModules = [
    {
      id: 'F2',
      title: 'Workout Intelligence Engine',
      summary: workout.sessionActive
        ? `${currentExercise.name} is live with ${currentExercise.sets} x ${currentExercise.repsLabel} and ${currentExercise.restSeconds} sec rest.`
        : `${workout.plan.dayLabel} is ready with ${workout.plan.todayFocus.toLowerCase()}.`,
      icon: 'dumbbell',
    },
    {
      id: 'F5',
      title: 'Workout Chat Mode',
      summary: `${userProfile.trainerName} replies in ${userProfile.language} using your ${userProfile.tone} tone and ${userProfile.goal.replace('_', ' ')} goal.`,
      icon: 'chat',
    },
    {
      id: 'F6',
      title: 'Recovery & Fatigue Tracker',
      summary:
        analytics.recovery >= 86
          ? 'Readiness is high, so the trainer is not trimming the main lifts.'
          : 'Recovery is softer today, so pacing and exercise selection stay more protective.',
      icon: 'pulse',
    },
    {
      id: 'F11',
      title: 'Smart AI Reminder',
      summary: `Reminder mode ${userProfile.reminders} is synced to ${userProfile.workoutDaysPerWeek} training days and a ${userProfile.dailyBudget} daily budget.`,
      icon: 'bell',
    },
  ];

  const cadenceTimeline = [
    {
      time: '07:00',
      title: 'Trainer greeting',
      detail: workout.plan.trainerGreeting,
    },
    {
      time: workout.plan.isWorkoutDay ? '18:30' : '19:00',
      title: workout.plan.dayLabel,
      detail: workout.sessionActive
        ? `${currentExercise.name} is already active in gym mode.`
        : workout.plan.whyThisWorkout,
    },
    {
      time: workout.plan.isWorkoutDay ? '20:15' : '20:30',
      title: diet.dinnerLogged ? 'Dinner logged' : 'Tonight\'s meal',
      detail: diet.dinnerLogged
        ? `${diet.lastDinnerLog?.mealTitle || 'Dinner'} is logged with $${diet.remainingBudget.toFixed(2)} left.`
        : `${userProfile.foodPreference} dinner guidance will stay inside your ${userProfile.dailyBudget} budget.`,
    },
    {
      time: '22:30',
      title: 'Recovery cutoff',
      detail:
        userProfile.tone === 'strict'
          ? `${userProfile.trainerName} will be direct about caffeine, sleep, and recovery cutoffs.`
          : `${userProfile.trainerName} will keep recovery prompts calm, clear, and useful.`,
    },
  ];

  const aiSignals = [
    {
      title: 'Personal trainer greeting is live',
      detail: `${workout.plan.trainerGreeting} The app is speaking from your saved profile now.`,
      icon: 'spark',
    },
    {
      title: workout.plan.isWorkoutDay ? 'Why this workout makes sense' : 'Why today is lighter',
      detail: workout.plan.whyThisWorkout,
      icon: 'dumbbell',
    },
    {
      title: 'Diet is linked to the same profile',
      detail: diet.dinnerLogged
        ? `${diet.lastDinnerLog?.mealTitle || 'Dinner'} moved protein up without pushing budget negative.`
        : `${userProfile.foodPreference} meals are aligned to your ${userProfile.goal.replace('_', ' ')} target and ${userProfile.dailyBudget} daily spend.`,
      icon: 'leaf',
    },
  ];

  const coachOverview = [
    `${userProfile.trainerName} is coaching ${userProfile.name} in ${userProfile.language} with a ${userProfile.tone} tone.`,
    `${workout.plan.dayLabel} is built around ${userProfile.preferredSplit.replaceAll('-', ' ')}, ${userProfile.experienceLevel} experience, and ${userProfile.injuries || 'no major limitations saved.'}`,
    analytics.recovery >= 86
      ? 'Recovery is green enough that the plan can stay direct and productive.'
      : 'Recovery is softer, so the plan stays honest and avoids junk fatigue.',
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
        title="A calm command center for training, food, recovery, and personal coaching."
        mobileTitle="Train sharp with your coach."
        description="The GYMOS AI dashboard now surfaces trainer-aware signals first: greeting, focus, workout logic, diet pressure, and the next clear move."
        hideDescriptionOnMobile
        meta={['Profile-driven trainer', 'Premium mobile shell', 'Personalized daily focus']}
        actions={
          <>
            <Button to="/workout" icon>
              Start workout
            </Button>
            <Button to="/profile" variant="secondary">
              Open profile
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-4 xl:grid-cols-[1.28fr_0.72fr]" variants={fadeUp}>
        <Panel className="px-4 py-4 sm:px-7 sm:py-7">
          <div className="hidden flex-wrap items-center gap-3 sm:flex">
            <span className="rounded-full border border-brand-400/18 bg-brand-400/10 px-3 py-1.5 text-xs font-semibold tracking-[0.22em] text-brand-300 uppercase">
              {workout.plan.trainerGreeting}
            </span>
            <span className="rounded-full border border-mint-400/18 bg-mint-400/10 px-3 py-1.5 text-xs font-semibold tracking-[0.22em] text-mint-400 uppercase">
              Today&apos;s focus: {workout.plan.dayLabel}
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
            Personal coaching is active.
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            The app is using your stored profile instead of generic placeholders, so today feels more like a trainer relationship than a demo shell.
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
          title="Today’s focus"
          description="Trainer modules only stay visible when they help you make a better decision today."
        >
          <FocusModules modules={focusModules} />
        </StatePanel>

        <StatePanel
          title="Why this workout?"
          description="The daily flow stays personal from greeting to dinner."
        >
          <CadenceTimeline items={cadenceTimeline} />
        </StatePanel>
      </motion.section>

      <motion.section variants={fadeUp}>
        <StatePanel
          title="AI signals"
          description="Short, high-signal updates across training, chat, food, and prediction."
        >
          <SignalStrip signals={aiSignals} />
        </StatePanel>
      </motion.section>
    </motion.div>
  );
}
