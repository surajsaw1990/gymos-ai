import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Panel } from '@/components/ui/Panel';

export function SessionControlCard({
  isChatModeEnabled,
  isSessionActive,
  isSessionComplete,
  session,
  onCompleteSet,
  onResetRestTimer,
  onToggleChatMode,
}) {
  return (
    <Panel className="px-4 py-4 sm:px-7 sm:py-7">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Badge icon="dumbbell">{session.phase}</Badge>
        <Badge icon="pulse" tone="mint">
          {session.recovery}
        </Badge>
        <Badge icon={isSessionComplete ? 'spark' : 'target'} tone="neutral">
          {session.stateLabel}
        </Badge>
        {isChatModeEnabled ? (
          <Badge icon="chat" tone="brand">
            Chat open
          </Badge>
        ) : null}
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:mt-6 sm:text-4xl">
        {session.title}
      </h3>
      <p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:text-base sm:leading-8">
        {session.description}
      </p>

      <div className="panel-muted mt-5 flex flex-col gap-3 rounded-[22px] px-4 py-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-[24px]">
        <div>
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Current exercise</p>
          <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
            {session.currentExerciseName}
          </p>
        </div>
        <div className="soft-divider hidden h-12 w-px sm:block" />
        <div>
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Set progression</p>
          <p className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl">
            {session.setProgressLabel}
          </p>
        </div>
      </div>

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
          <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">
            {isSessionComplete ? 'Success state' : 'Coach note'}
          </p>
          <p className="mt-2.5 text-sm leading-6 text-slate-300 sm:mt-3 sm:leading-7">
            {session.notes}
          </p>
        </div>
      </div>

      {session.summary ? (
        <div className="panel-muted mt-5 rounded-[22px] px-4 py-4 sm:mt-6 sm:rounded-[24px]">
          <p className="text-xs font-semibold tracking-[0.24em] text-brand-300 uppercase">
            Session Summary
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Total sets completed</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">
                {session.summary.totalSetsCompleted}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Mock duration</p>
              <p className="mt-2 font-display text-2xl font-semibold text-white">
                {session.summary.durationLabel}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300 sm:leading-7">
            {session.summary.message}
          </p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
        <Button disabled={!isSessionActive} onClick={onCompleteSet}>
          {isSessionComplete ? 'Session complete' : 'Complete set'}
        </Button>
        <Button disabled={!isSessionActive} variant="ghost" onClick={onResetRestTimer}>
          Reset rest
        </Button>
        <Button variant="secondary" onClick={onToggleChatMode}>
          {isChatModeEnabled ? 'Close chat mode' : 'Open chat mode'}
        </Button>
      </div>
    </Panel>
  );
}
