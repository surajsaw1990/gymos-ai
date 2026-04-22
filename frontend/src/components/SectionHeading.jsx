import { cn } from '@/utils/cn';

export function SectionHeading({ eyebrow, title, description, className }) {
  return (
    <div className={cn('max-w-3xl space-y-3', className)}>
      <p className="font-display text-xs font-semibold tracking-[0.3em] text-brand-400 uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      <p className="text-sm leading-7 text-slate-400 sm:text-base">{description}</p>
    </div>
  );
}
