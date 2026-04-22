import { Children, Fragment, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

function flattenActionItems(children) {
  return Children.toArray(children).flatMap((child) => {
    if (isValidElement(child) && child.type === Fragment) {
      return flattenActionItems(child.props.children);
    }

    return [child];
  });
}

export function PageHeader({
  actions,
  className,
  description,
  eyebrow,
  hideDescriptionOnMobile = false,
  meta,
  mobileDescription,
  mobileTitle,
  title,
}) {
  const actionItems = flattenActionItems(actions).filter(Boolean);

  return (
    <motion.section
      className={cn('grid gap-4 sm:gap-5 xl:grid-cols-[1.15fr_0.85fr] xl:items-end', className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-2.5 sm:space-y-4">
        <p className="hidden font-display text-xs font-semibold tracking-[0.32em] text-brand-300 uppercase sm:block">
          {eyebrow}
        </p>
        <h2 className="max-w-4xl font-display text-[1.95rem] leading-[1.02] font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
          <span className="sm:hidden">{mobileTitle || title}</span>
          <span className="hidden sm:inline">{title}</span>
        </h2>
        {hideDescriptionOnMobile ? (
          <p className="hidden max-w-3xl text-base leading-8 text-slate-400 sm:block">
            {description}
          </p>
        ) : (
          <p className="max-w-3xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-8">
            <span className="sm:hidden">{mobileDescription || description}</span>
            <span className="hidden sm:inline">{description}</span>
          </p>
        )}
        {meta?.length ? (
          <div className="hidden flex-wrap gap-2 pt-2 sm:flex">
            {meta.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium tracking-[0.18em] text-slate-300 uppercase"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
        {actionItems.map((action, index) => (
          <div
            key={index}
            className={cn(
              '[&>*]:w-full sm:[&>*]:w-auto',
              index > 0 && 'hidden sm:block',
            )}
          >
            {action}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
