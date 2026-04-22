import { motion } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcons';

export function FocusModules({ modules }) {
  return (
    <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
      {modules.map((module) => (
        <motion.article
          key={module.id}
          className="panel-muted rounded-[22px] px-4 py-4 sm:rounded-[24px]"
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[18px] border border-brand-400/18 bg-brand-400/10 text-brand-300 sm:h-11 sm:w-11 sm:rounded-2xl">
              <AppIcon name={module.icon} className="h-5 w-5" />
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              {module.id}
            </span>
          </div>
          <h4 className="mt-3 font-display text-base font-semibold text-white sm:mt-4 sm:text-lg">
            {module.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-400 sm:leading-7">{module.summary}</p>
        </motion.article>
      ))}
    </div>
  );
}
