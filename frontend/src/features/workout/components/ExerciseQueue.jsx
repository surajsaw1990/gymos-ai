import { cn } from '@/utils/cn';

export function ExerciseQueue({ items, onSelect }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <button
          key={item.name}
          type="button"
          className="panel-muted flex w-full items-center justify-between gap-4 rounded-[24px] px-4 py-4 text-left"
          onClick={() => onSelect?.(item.key)}
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-display text-sm font-semibold text-white">
              {index + 1}
            </div>
            <div className="min-w-0">
              <h4 className="break-words font-medium text-white">{item.name}</h4>
              <p className="mt-1 break-words text-sm text-slate-400">{item.detail}</p>
              <p className="mt-1 break-words text-xs tracking-[0.18em] text-slate-500 uppercase">
                {item.targetMusclesLabel}
              </p>
            </div>
          </div>
          <span
            className={cn(
              'shrink-0 rounded-full border px-3 py-2 text-xs tracking-[0.2em] uppercase',
              item.isSelected && 'border-brand-400/20 bg-brand-400/10 text-brand-300',
              item.readiness === 'Optional'
                ? 'border-white/10 text-slate-500'
                : 'border-brand-400/18 bg-brand-400/10 text-brand-300',
            )}
          >
            {item.readiness}
          </span>
        </button>
      ))}
    </div>
  );
}
