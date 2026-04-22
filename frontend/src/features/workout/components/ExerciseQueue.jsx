import { cn } from '@/utils/cn';

export function ExerciseQueue({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.name}
          className="panel-muted flex items-center justify-between gap-4 rounded-[24px] px-4 py-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-display text-sm font-semibold text-white">
              {index + 1}
            </div>
            <div>
              <h4 className="font-medium text-white">{item.name}</h4>
              <p className="mt-1 text-sm text-slate-400">{item.detail}</p>
            </div>
          </div>
          <span
            className={cn(
              'rounded-full border px-3 py-2 text-xs tracking-[0.2em] uppercase',
              item.readiness === 'Optional'
                ? 'border-white/10 text-slate-500'
                : 'border-brand-400/18 bg-brand-400/10 text-brand-300',
            )}
          >
            {item.readiness}
          </span>
        </div>
      ))}
    </div>
  );
}
