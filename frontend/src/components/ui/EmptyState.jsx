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
    <div className="flex flex-col items-start rounded-[22px] border border-dashed border-white/12 bg-white/[0.02] px-4 py-5 sm:rounded-[24px] sm:px-5 sm:py-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-brand-400/18 bg-brand-400/10 text-brand-300 sm:h-12 sm:w-12 sm:rounded-2xl">
        <AppIcon name={icon} className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-white sm:mt-5 sm:text-xl">
        {title}
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:leading-7">{description}</p>
      {actionLabel && actionTo ? (
        <div className="mt-4 w-full sm:mt-5 sm:w-auto">
          <Button to={actionTo} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
