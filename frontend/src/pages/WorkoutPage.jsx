import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { ExerciseQueue } from '@/features/workout/components/ExerciseQueue';
import { MuscleFocusCard } from '@/features/workout/components/MuscleFocusCard';
import { SessionControlCard } from '@/features/workout/components/SessionControlCard';
import { SwapExercisePanel } from '@/features/workout/components/SwapExercisePanel';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useWorkout } from '@/hooks/useWorkout';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function WorkoutPage() {
  useDocumentTitle('Workout');
  const {
    canCompleteSet,
    coachCues,
    exerciseItems,
    isChatModeEnabled,
    isSessionActive,
    isSessionComplete,
    muscleFocus,
    replacementOptions,
    selectedExercise,
    session,
    workoutStats,
    completeSet,
    replaceExercise,
    resetRestTimer,
    selectExercise,
    startSession,
    toggleChatMode,
    toggleIntensityMode,
  } = useWorkout();
  const selectedExerciseIndex = exerciseItems.findIndex((item) => item.key === selectedExercise?.key);

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Workout"
        title="A personal trainer shell built for fast decisions under fatigue."
        mobileTitle="Today’s workout"
        description="This screen now reads from your saved split, injuries, recovery, and coach tone so today feels like your own trainer wrote it, not a generic demo."
        mobileDescription="Trainer-built session, swaps, and muscle guidance."
        meta={['Today’s focus', 'Swap exercise', 'Ask trainer']}
        actions={
          <>
            <Button disabled={isSessionActive} onClick={startSession}>
              {isSessionComplete ? 'Restart session' : isSessionActive ? 'Session live' : 'Start session'}
            </Button>
            <Button variant="secondary" onClick={toggleChatMode}>
              {isChatModeEnabled ? 'Close trainer chat' : 'Ask trainer'}
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-3 sm:gap-4 lg:grid-cols-3" variants={fadeUp}>
        {workoutStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.15fr_0.85fr]" variants={fadeUp}>
        <SessionControlCard
          canCompleteSet={canCompleteSet}
          isChatModeEnabled={isChatModeEnabled}
          isSessionActive={isSessionActive}
          isSessionComplete={isSessionComplete}
          session={session}
          onCompleteSet={completeSet}
          onResetRestTimer={resetRestTimer}
          onToggleChatMode={toggleChatMode}
        />

        <Panel className="hidden px-6 py-6 md:block md:px-7 md:py-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge icon="pulse" tone="mint">
              {session.recovery} recovery
            </Badge>
            <Badge icon={isSessionComplete ? 'spark' : 'target'} tone="neutral">
              {session.stateLabel}
            </Badge>
            <Badge icon="chat" tone="neutral">
              {isChatModeEnabled ? 'Trainer chat open' : 'Trainer chat ready'}
            </Badge>
          </div>
          <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
            {isSessionComplete ? 'Session summary posture' : 'Why this workout?'}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {isSessionComplete ? session.notes : session.whyThisWorkout}
          </p>

          <div className="mt-6 space-y-3">
            {coachCues.map((cue) => (
              <div
                key={cue}
                className="panel-muted rounded-[24px] px-4 py-4 text-sm leading-7 text-slate-300"
              >
                {cue}
              </div>
            ))}
          </div>
        </Panel>
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.1fr_0.9fr]" variants={fadeUp}>
        <StatePanel
          title="Today’s workout"
          description="Tap any movement to see muscle focus, form cues, and same-muscle swaps."
        >
          <ExerciseQueue items={exerciseItems} onSelect={selectExercise} />
        </StatePanel>

        <StatePanel
          title={selectedExercise ? `${selectedExercise.name} guidance` : 'Muscle focus'}
          description="This premium card stays visual, practical, and gym-floor useful."
        >
          <MuscleFocusCard focus={muscleFocus} />
        </StatePanel>
      </motion.section>

      <motion.section variants={fadeUp}>
        <StatePanel
          title="Swap exercise"
          description="Not feeling a movement today? Swap it without breaking the plan."
        >
          <SwapExercisePanel
            currentExercise={selectedExercise}
            feedbackMessage={session.feedbackMessage}
            isEasyMode={session.easyMode}
            onReplace={(replacementKey) => replaceExercise(selectedExerciseIndex, replacementKey)}
            onToggleIntensityMode={toggleIntensityMode}
            options={replacementOptions}
          />
        </StatePanel>
      </motion.section>
    </motion.div>
  );
}
