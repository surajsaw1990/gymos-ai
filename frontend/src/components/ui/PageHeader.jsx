import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function PageHeader({
  actions,
  className,
  description,
  eyebrow,
  meta,
  title,
}) {
  return (
    <motion.section
      className={cn('grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-end', className)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="space-y-4">
        <p className="font-display text-xs font-semibold tracking-[0.32em] text-brand-300 uppercase">
          {eyebrow}
        </p>
        <h2 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl">
          {title}
        </h2>
        <p className="max-w-3xl text-base leading-8 text-slate-400">{description}</p>
        {meta?.length ? (
          <div className="flex flex-wrap gap-2 pt-2">
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

      <div className="flex flex-wrap items-center gap-3 xl:justify-end">{actions}</div>
    </motion.section>
  );
}
