import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { AppIcon } from '@/components/icons/AppIcons';
import { primaryNavigation } from '@/constants/navigation';
import { cn } from '@/utils/cn';

export function MobileDock() {
  const location = useLocation();

  const isItemActive = (item) => {
    if (item.to === '/') {
      return location.pathname === '/';
    }

    if (item.to === '/profile') {
      return (
        location.pathname === '/profile' ||
        location.pathname.startsWith('/profile/') ||
        location.pathname === '/onboarding' ||
        location.pathname.startsWith('/onboarding/')
      );
    }

    return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  };

  return (
    <motion.nav
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom)+0.7rem)] md:hidden"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="premium-border mx-auto flex max-w-[430px] items-center justify-between rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,29,50,0.92),rgba(7,16,31,0.96))] px-1.5 py-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        {primaryNavigation.map((item) => {
          const isActive = isItemActive(item);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[22px] px-2 py-1.5 text-[10px] font-medium text-slate-500',
                isActive && 'text-white',
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="mobile-nav-active"
                  className="absolute inset-0 rounded-[22px] bg-white/[0.07]"
                />
              ) : null}
              <span
                className={cn(
                  'relative z-10 flex h-11 w-11 items-center justify-center rounded-[18px] border border-transparent',
                  isActive && 'border-brand-400/20 bg-brand-400/15 text-brand-300',
                )}
              >
                <AppIcon name={item.icon} className="h-4.5 w-4.5" />
              </span>
              <span className="relative z-10 truncate pb-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
