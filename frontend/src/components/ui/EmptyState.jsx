import { AppIcon } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/Button';

export function EmptyState({
  actionLabel,
  actionTo,
  description,
  icon = 'spark',
  title,
}) {
  return (
    <div className="flex flex-col items-start rounded-[24px] border border-dashed border-white/12 bg-white/[0.02] px-5 py-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-400/18 bg-brand-400/10 text-brand-300">
        <AppIcon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">{description}</p>
      {actionLabel && actionTo ? (
        <div className="mt-5">
          <Button to={actionTo} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
