import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { coachCues, exerciseQueue, liveSession, workoutStats } from '@/constants/workout';
import { ExerciseQueue } from '@/features/workout/components/ExerciseQueue';
import { SessionControlCard } from '@/features/workout/components/SessionControlCard';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function WorkoutPage() {
  useDocumentTitle('Workout');

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Workout Screen Shell"
        title="A focused gym-mode interface with big signals and low noise."
        description="The workout shell is designed for glanceability under fatigue: active set state, controlled rest pacing, and quiet AI coaching that only appears when it adds value."
        meta={['Gym mode UI', 'Chat mode ready', 'Form trainer ready']}
        actions={
          <>
            <Button>Start session</Button>
            <Button variant="secondary">Open chat coach</Button>
          </>
        }
      />

      <motion.section className="grid gap-4 lg:grid-cols-3" variants={fadeUp}>
        {workoutStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]" variants={fadeUp}>
        <SessionControlCard session={liveSession} />

        <Panel className="px-6 py-6 sm:px-7 sm:py-7">
          <div className="flex flex-wrap items-center gap-3">
            <Badge icon="pulse" tone="mint">
              Readiness stable
            </Badge>
            <Badge icon="chat" tone="neutral">
              Coach mode restrained
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
              <div key={cue} className="panel-muted rounded-[24px] px-4 py-4 text-sm leading-7 text-slate-300">
                {cue}
              </div>
            ))}
          </div>
        </Panel>
      </motion.section>

      <motion.section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" variants={fadeUp}>
        <StatePanel
          title="Exercise queue"
          description="Large touch targets and clear pacing keep this shell usable mid-session."
          action={<Button variant="ghost">Reorder block</Button>}
        >
          <ExerciseQueue items={exerciseQueue} />
        </StatePanel>

        <StatePanel
          title="Smart Form Trainer"
          description="Camera and pose feedback can drop into the shell without breaking layout."
          isEmpty
          emptyIcon="camera"
          emptyTitle="Camera feed is not attached yet"
          emptyDescription="The form trainer panel is ready for a live camera stream, movement scoring, and corrective cue overlays as soon as the vision pipeline is connected."
        />
      </motion.section>
    </motion.div>
  );
}
