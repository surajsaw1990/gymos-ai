import { motion } from 'framer-motion';
import { BrandMark } from '@/components/BrandMark';
import { AppIcon } from '@/components/icons/AppIcons';
import { BRAND_SHORT } from '@/constants/brand';

export function MobileTopBar({ activeItem }) {
  return (
    <motion.header
      className="panel-surface premium-border ambient-frame sticky top-3 z-30 px-4 py-3 md:hidden"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="origin-left scale-[0.82]">
            <BrandMark />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold tracking-[0.28em] text-brand-300 uppercase">
              {BRAND_SHORT}
            </p>
            <p className="truncate font-display text-lg font-semibold tracking-tight text-white">
              {activeItem.label}
            </p>
          </div>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] border border-brand-400/18 bg-brand-400/10 text-brand-300">
          <AppIcon name={activeItem.icon} className="h-5 w-5" />
        </div>
      </div>
    </motion.header>
  );
}
