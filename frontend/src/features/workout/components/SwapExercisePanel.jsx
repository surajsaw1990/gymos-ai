import { Button } from '@/components/ui/Button';

export function SwapExercisePanel({
  currentExercise,
  feedbackMessage,
  isEasyMode,
  onReplace,
  onToggleIntensityMode,
  options,
}) {
  return (
    <div className="space-y-3">
      <div className="panel-muted rounded-[22px] px-4 py-4">
        <p className="text-xs font-semibold tracking-[0.22em] text-brand-300 uppercase">
          Swap exercise
        </p>
        <h4 className="mt-2 font-medium text-white">{currentExercise.name}</h4>
        <p className="mt-1.5 text-sm leading-6 text-slate-400">
          Pick a same-muscle alternative and the queue will update immediately.
        </p>
      </div>

      {options.map((item) => (
        <div key={item.key} className="panel-muted rounded-[22px] px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-white">{item.name}</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-400">
                {item.sets} sets x {item.repsLabel} | {item.restSeconds} sec rest
              </p>
            </div>
            <Button variant="ghost" onClick={() => onReplace(item.key)}>
              Swap
            </Button>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button variant="secondary" onClick={onToggleIntensityMode}>
          {isEasyMode ? 'Return to full plan' : 'Not feeling this workout?'}
        </Button>
      </div>

      {feedbackMessage ? (
        <div className="panel-muted rounded-[22px] px-4 py-3 text-sm leading-6 text-slate-300">
          {feedbackMessage}
        </div>
      ) : null}
    </div>
  );
}
