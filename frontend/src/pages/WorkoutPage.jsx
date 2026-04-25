import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { ExerciseQueue } from '@/features/workout/components/ExerciseQueue';
import { SessionControlCard } from '@/features/workout/components/SessionControlCard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useWorkout } from '@/hooks/useWorkout';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function WorkoutPage() {
  useDocumentTitle('Workout');
  const {
    coachCues,
    exerciseItems,
    isChatModeEnabled,
    isSessionActive,
    isSessionComplete,
    session,
    workoutStats,
    completeSet,
    reorderBlock,
    resetRestTimer,
    startSession,
    toggleChatMode,
  } = useWorkout();

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Workout Screen Shell"
        title="A focused gym-mode interface with big signals and low noise."
        mobileTitle="Workout shell"
        description="The workout shell is designed for glanceability under fatigue: active set state, controlled rest pacing, and quiet AI coaching that only appears when it adds value."
        mobileDescription="Live set state, rest pacing, and quiet AI cues."
        meta={['Gym mode UI', 'Chat mode ready', 'Form trainer ready']}
        actions={
          <>
            <Button disabled={isSessionActive} onClick={startSession}>
              {isSessionComplete ? 'Restart session' : isSessionActive ? 'Session live' : 'Start session'}
            </Button>
            <Button variant="secondary" onClick={toggleChatMode}>
              {isChatModeEnabled ? 'Close chat coach' : 'Open chat coach'}
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
              {isChatModeEnabled ? 'Coach mode active' : 'Coach mode restrained'}
            </Badge>
          </div>
          <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
            Live coaching posture
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            The shell is optimized for in-gym speed: no clutter, large decision points, and a
            visible recovery status before each key movement.
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
          title="Exercise queue"
          description="Large touch targets and clear pacing keep this shell usable mid-session."
          action={
            <Button variant="ghost" onClick={reorderBlock}>
              Reorder block
            </Button>
          }
        >
          <ExerciseQueue items={exerciseItems} />
        </StatePanel>

        <StatePanel
          title="Smart Form Trainer"
          description="Camera and pose feedback can drop into the shell without breaking layout."
          isEmpty
          emptyIcon="camera"
          emptyTitle={isSessionActive ? 'Camera feed is not attached yet' : 'Form trainer is standing by'}
          emptyDescription={
            isSessionActive
              ? 'The form trainer panel is ready for a live camera stream, movement scoring, and corrective cue overlays as soon as the vision pipeline is connected.'
              : 'Start the workout session and this surface is ready to receive camera-driven scoring, movement tracking, and quiet corrective cues.'
          }
        />
      </motion.section>
    </motion.div>
  );
}
