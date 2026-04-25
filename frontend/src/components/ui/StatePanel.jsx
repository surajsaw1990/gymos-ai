import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingBlock } from '@/components/ui/LoadingBlock';
import { Panel } from '@/components/ui/Panel';
import { cn } from '@/utils/cn';

export function StatePanel({
  action,
  children,
  className,
  contentClassName,
  description,
  emptyDescription = 'This panel will populate as soon as the related data starts flowing.',
  emptyIcon = 'spark',
  emptyTitle = 'Nothing here yet',
  isEmpty = false,
  isLoading = false,
  title,
}) {
  return (
    <Panel className={cn('px-4 py-4 sm:px-6 sm:py-6', className)}>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {title}
            </h3>
            {description ? (
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0 [&>*]:w-full sm:[&>*]:w-auto">{action}</div> : null}
        </div>

        <div className="soft-divider" />

        <div className={cn('min-h-[116px] min-w-0 sm:min-h-[140px]', contentClassName)}>
          {isLoading ? <LoadingBlock lines={4} /> : null}
          {!isLoading && isEmpty ? (
            <EmptyState
              description={emptyDescription}
              icon={emptyIcon}
              title={emptyTitle}
            />
          ) : null}
          {!isLoading && !isEmpty ? children : null}
        </div>
      </div>
    </Panel>
  );
}
