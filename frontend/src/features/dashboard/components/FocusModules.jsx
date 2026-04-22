import { motion } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcons';

export function FocusModules({ modules }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {modules.map((module) => (
        <motion.article
          key={module.id}
          className="panel-muted rounded-[24px] px-4 py-4"
          whileHover={{ y: -4 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-400/18 bg-brand-400/10 text-brand-300">
              <AppIcon name={module.icon} className="h-5 w-5" />
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] tracking-[0.2em] text-slate-400 uppercase">
              {module.id}
            </span>
          </div>
          <h4 className="mt-4 font-display text-lg font-semibold text-white">{module.title}</h4>
          <p className="mt-2 text-sm leading-7 text-slate-400">{module.summary}</p>
        </motion.article>
      ))}
    </div>
  );
}
