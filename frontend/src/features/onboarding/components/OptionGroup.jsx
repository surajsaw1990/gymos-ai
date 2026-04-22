import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function OptionGroup({
  description,
  onChange,
  options,
  selectedId,
  title,
}) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {options.map((option) => {
          const isSelected = option.id === selectedId;

          return (
            <motion.button
              key={option.id}
              type="button"
              className={cn(
                'rounded-[24px] border px-4 py-4 text-left',
                isSelected
                  ? 'border-brand-400/20 bg-brand-400/10 text-white'
                  : 'border-white/8 bg-white/[0.03] text-slate-400 hover:border-white/12 hover:bg-white/[0.05]',
              )}
              onClick={() => onChange(option.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <p className="font-medium text-white">{option.title}</p>
              <p className="mt-2 text-sm leading-7 text-inherit">{option.description}</p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
