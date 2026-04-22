import { motion } from 'framer-motion';
import { BoltIcon } from '@/components/icons/AppIcons';

export function BrandMark() {
  return (
    <motion.div
      className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[20px] border border-brand-400/25 bg-white/[0.06]"
      initial={{ scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,229,255,0.28),transparent_58%)]" />
      <div className="absolute inset-[1px] rounded-[19px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]" />
      <div className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-brand-500/20 blur-xl" />
      <span className="relative flex items-center gap-1 font-display text-[11px] font-semibold tracking-[0.26em] text-brand-300">
        GY
        <BoltIcon className="h-3.5 w-3.5 text-brand-400" />
      </span>
    </motion.div>
  );
}
