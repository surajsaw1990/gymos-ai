import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { AppIcon } from '@/components/icons/AppIcons';
import { primaryNavigation } from '@/constants/navigation';
import { cn } from '@/utils/cn';

export function MobileDock() {
  return (
    <motion.nav
      className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="panel-surface premium-border mx-auto flex max-w-xl items-center justify-between px-2 py-2">
        {primaryNavigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-medium text-slate-500',
                isActive && 'bg-white/[0.06] text-white',
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-2xl border border-transparent',
                    isActive && 'border-brand-400/20 bg-brand-400/15 text-brand-300',
                  )}
                >
                  <AppIcon name={item.icon} className="h-4.5 w-4.5" />
                </span>
                <span className="truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  );
}
