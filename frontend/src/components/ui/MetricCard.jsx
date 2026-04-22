import { motion } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcons';

export function MetricCard({ detail, icon, label, value }) {
  return (
    <motion.div
      className="panel-muted metric-glow rounded-[26px] px-5 py-5"
      whileHover={{ y: -3 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-400/15 bg-brand-400/10 text-brand-300">
          <AppIcon name={icon} className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-500">{detail}</p>
    </motion.div>
  );
}
