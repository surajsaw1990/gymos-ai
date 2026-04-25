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
    <section className="space-y-3 sm:space-y-4">
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
          {description}
        </p>
      </div>

      <div className="grid gap-2.5 sm:gap-3 md:grid-cols-3">
        {options.map((option) => {
          const isSelected = option.id === selectedId;

          return (
            <motion.button
              key={option.id}
              type="button"
              className={cn(
                'min-h-11 rounded-[22px] border px-4 py-3.5 text-left sm:rounded-[24px] sm:py-4',
                isSelected
                  ? 'border-brand-400/20 bg-brand-400/10 text-white'
                  : 'border-white/8 bg-white/[0.03] text-slate-400 hover:border-white/12 hover:bg-white/[0.05]',
              )}
              onClick={() => onChange(option.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
            >
              <p className="break-words font-medium text-white">{option.title}</p>
              <p className="mt-2 break-words text-sm leading-6 text-inherit sm:leading-7">
                {option.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
