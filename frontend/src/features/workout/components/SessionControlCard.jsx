import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';

export function SessionControlCard({ session }) {
  return (
    <Panel className="px-6 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-wrap items-center gap-3">
        <Badge icon="dumbbell">{session.phase}</Badge>
        <Badge icon="pulse" tone="mint">
          {session.recovery}
        </Badge>
      </div>

      <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {session.title}
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-8 text-slate-400">
        Next movement: {session.nextExercise}. Rest timer is active, cue density stays low,
        and form prompts only interrupt when technique drift appears.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="panel-muted rounded-[24px] px-4 py-4">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Rest timer</p>
          <p className="mt-3 font-display text-3xl font-semibold text-white">{session.restTimer}</p>
        </div>
        <div className="panel-muted rounded-[24px] px-4 py-4">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Current block</p>
          <p className="mt-3 font-display text-2xl font-semibold text-white">Heavy neural</p>
        </div>
        <div className="panel-muted rounded-[24px] px-4 py-4">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Coach note</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">{session.notes}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button>Complete set</Button>
        <Button variant="secondary">Open chat mode</Button>
      </div>
    </Panel>
  );
}
