import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { BrandMark } from '@/components/BrandMark';
import { AppIcon } from '@/components/icons/AppIcons';
import { Badge } from '@/components/ui/Badge';
import { BRAND_SHORT } from '@/constants/brand';
import { primaryNavigation, utilityNavigation } from '@/constants/navigation';
import { useAppState } from '@/hooks/useAppState';
import { cn } from '@/utils/cn';

function resolveReminderLabel(reminders) {
  if (reminders === 'minimal') {
    return 'Minimal reminders';
  }

  if (reminders === 'high') {
    return 'High accountability';
  }

  return 'Smart reminders';
}

function isItemActive(pathname, item) {
  if (item.to === '/') {
    return pathname === '/';
  }

  if (item.to === '/profile') {
    return (
      pathname === '/profile' ||
      pathname.startsWith('/profile/') ||
      pathname === '/onboarding' ||
      pathname.startsWith('/onboarding/')
    );
  }

  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export function AppSidebar() {
  const location = useLocation();
  const { state } = useAppState();
  const { analytics, userProfile } = state;

  return (
    <motion.aside
      className="panel-surface premium-border ambient-frame sticky top-4 hidden h-[calc(100vh-2rem)] w-[312px] shrink-0 flex-col overflow-hidden lg:flex"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="panel-muted flex items-center gap-4 px-4 py-4">
          <BrandMark />
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.24em] text-brand-300 uppercase">
              {BRAND_SHORT}
            </p>
            <p className="mt-1 text-sm text-slate-400">Personal Trainer & Workout App</p>
          </div>
        </div>

        <div className="mt-6 space-y-2 pb-2">
          {primaryNavigation.map((item) => {
            const isActive = isItemActive(location.pathname, item);

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'group flex items-center gap-4 rounded-[22px] border border-transparent px-4 py-3.5 text-left',
                  isActive
                    ? 'border-brand-400/20 bg-brand-400/10 text-white pill-glow'
                    : 'bg-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white',
                )}
              >
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl border text-slate-300',
                    isActive
                      ? 'border-brand-400/20 bg-brand-400/15 text-brand-300'
                      : 'border-white/8 bg-white/[0.03] group-hover:text-white',
                  )}
                >
                  <AppIcon name={item.icon} className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 space-y-4 border-t border-white/5 px-4 py-4">
        <Link
          to={utilityNavigation[0].to}
          className="panel-muted flex items-center justify-between gap-4 rounded-[24px] px-4 py-4 text-left"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-brand-300 uppercase">
              {utilityNavigation[0].label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Fine-tune coaching identity, {resolveReminderLabel(userProfile.reminders).toLowerCase()}, and your {userProfile.cadence} rhythm.
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-400/18 bg-brand-400/10 text-brand-300">
            <AppIcon name={utilityNavigation[0].icon} className="h-5 w-5" />
          </div>
        </Link>

        <div className="panel-muted rounded-[24px] px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-brand-300 uppercase">
                Readiness pulse
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-white">{analytics.recovery}%</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-400/20 bg-brand-400/10">
              <AppIcon name="pulse" className="h-6 w-6 text-brand-300" />
            </div>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {analytics.recovery >= 86
              ? 'Recovery is high enough for a strength-biased session with moderate volume.'
              : 'Recovery is steady, so the system is protecting quality and pacing tonight.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge icon="streak">{analytics.streak}-day discipline run</Badge>
          <Badge icon="bell" tone="neutral">
            {resolveReminderLabel(userProfile.reminders)}
          </Badge>
        </div>

        <p className="text-xs text-slate-600">
          Viewing {location.pathname === '/' ? '/dashboard' : location.pathname}
        </p>
      </div>
    </motion.aside>
  );
}
