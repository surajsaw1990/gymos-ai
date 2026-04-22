import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';

export function SessionControlCard({
  isChatModeEnabled,
  isSessionActive,
  session,
  onCompleteSet,
  onToggleChatMode,
}) {
  return (
    <Panel className="px-4 py-4 sm:px-7 sm:py-7">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Badge icon="dumbbell">{session.phase}</Badge>
        <Badge icon="pulse" tone="mint">
          {session.recovery}
        </Badge>
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:mt-6 sm:text-4xl">
        {session.title}
      </h3>
      <p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base sm:leading-8">
        Next movement: {session.nextExercise}. Rest timer is active, cue density stays low,
        and form prompts only interrupt when technique drift appears.
      </p>

      <div className="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
        <div className="panel-muted rounded-[22px] px-4 py-4 sm:rounded-[24px]">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Rest timer</p>
          <p className="mt-2.5 font-display text-[1.7rem] font-semibold text-white sm:mt-3 sm:text-3xl">
            {session.restTimer}
          </p>
        </div>
        <div className="panel-muted rounded-[22px] px-4 py-4 sm:rounded-[24px]">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Current block</p>
          <p className="mt-2.5 font-display text-xl font-semibold text-white sm:mt-3 sm:text-2xl">
            {session.blockLabel}
          </p>
        </div>
        <div className="panel-muted rounded-[22px] px-4 py-4 sm:rounded-[24px]">
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Coach note</p>
          <p className="mt-2.5 text-sm leading-6 text-slate-300 sm:mt-3 sm:leading-7">
            {session.notes}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
        <Button disabled={!isSessionActive} onClick={onCompleteSet}>
          Complete set
        </Button>
        <Button variant="secondary" onClick={onToggleChatMode}>
          {isChatModeEnabled ? 'Close chat mode' : 'Open chat mode'}
        </Button>
      </div>
    </Panel>
  );
}
