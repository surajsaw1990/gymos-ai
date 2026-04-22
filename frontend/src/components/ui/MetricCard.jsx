import { motion } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcons';

export function MetricCard({ detail, icon, label, value }) {
  return (
    <motion.div
      className="panel-muted metric-glow rounded-[22px] px-4 py-4 sm:rounded-[26px] sm:px-5 sm:py-5"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] text-slate-400 sm:text-sm">{label}</p>
          <p className="mt-2.5 font-display text-[1.65rem] font-semibold tracking-tight text-white sm:mt-3 sm:text-3xl">
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-[18px] border border-brand-400/15 bg-brand-400/10 text-brand-300 sm:h-11 sm:w-11 sm:rounded-2xl">
          <AppIcon name={icon} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500 sm:mt-4 sm:leading-7">{detail}</p>
    </motion.div>
  );
}
