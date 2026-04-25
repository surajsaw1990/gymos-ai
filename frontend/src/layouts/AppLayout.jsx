import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { AppIcon } from '@/components/icons/AppIcons';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { MobileDock } from '@/components/navigation/MobileDock';
import { MobileTopBar } from '@/components/navigation/MobileTopBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { APP_FOOTNOTE, APP_TAGLINE, BRAND_NAME } from '@/constants/brand';
import { allNavigationItems, primaryNavigation } from '@/constants/navigation';
import { ChatPanel } from '@/features/workout/components/ChatPanel';
import { useAppState } from '@/hooks/useAppState';
import { routeTransition } from '@/utils/motion';

function resolveGoalLabel(goal) {
  if (goal === 'muscle_gain') {
    return 'Muscle gain';
  }

  if (goal === 'fat_loss') {
    return 'Fat loss';
  }

  if (goal === 'strength') {
    return 'Strength';
  }

  return 'Recomposition';
}

function resolveToneLabel(tone) {
  if (tone === 'strict') {
    return 'Strict coach';
  }

  if (tone === 'motivational') {
    return 'Motivational coach';
  }

  if (tone === 'friendly') {
    return 'Friendly coach';
  }

  return 'Calm coach';
}

export default function AppLayout() {
  const location = useLocation();
  const { state } = useAppState();
  const { analytics, userProfile, workout } = state;
  const activeItem =
    allNavigationItems.find((item) =>
      item.to === '/'
        ? location.pathname === '/'
        : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
    ) || primaryNavigation[0];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="hero-orb absolute -left-24 top-12 h-72 w-72 rounded-full opacity-90" />
      <div className="hero-orb absolute right-0 top-1/4 h-96 w-96 rounded-full opacity-70" />
      <div className="hero-orb absolute bottom-0 left-1/3 h-64 w-64 rounded-full opacity-55" />

      <div className="relative mx-auto flex min-h-screen max-w-[1440px] gap-3 px-3 py-3 sm:px-4 sm:py-4 md:px-6 lg:gap-4 lg:px-8">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-x-clip pb-[calc(env(safe-area-inset-bottom)+8.35rem)] md:gap-4 md:pb-4">
          <MobileTopBar activeItem={activeItem} />

          <motion.header
            className="panel-surface premium-border ambient-frame hidden px-5 py-4 md:block md:px-6"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-brand-300 uppercase">
                    <AppIcon name={activeItem.icon} className="h-4 w-4" />
                    {activeItem.label}
                  </div>
                  <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {BRAND_NAME}
                  </h1>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                    {APP_TAGLINE}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-5">
                  <Badge icon="pulse">{analytics.recovery}% recovery</Badge>
                  <Badge icon="spark" tone="neutral">
                    {userProfile.name} | {resolveGoalLabel(userProfile.goal)} | {resolveToneLabel(userProfile.tone)}
                  </Badge>
                  <Button to="/onboarding" variant="secondary">
                    {userProfile.savedAt ? 'Refine setup' : 'Finish setup'}
                  </Button>
                </div>
              </div>

              <div className="soft-divider" />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-3xl text-sm leading-7 text-slate-500">{APP_FOOTNOTE}</p>
                <div className="hidden items-center gap-2 md:flex">
                  {primaryNavigation.map((item) => (
                    <Badge
                      key={item.to}
                      icon={item.icon}
                      tone={item.to === activeItem.to ? 'brand' : 'neutral'}
                    >
                      {item.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.header>

          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              className="flex-1 min-w-0 overflow-x-clip pb-2"
              variants={routeTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>

          <footer className="hidden px-2 pb-2 pt-4 text-sm text-slate-500 md:block">
            <div className="panel-muted flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p>{BRAND_NAME}</p>
              <p>
                Built for {userProfile.workoutDaysPerWeek} training days, {userProfile.dailyBudget} daily budget, and {analytics.projectedWeeks}-week progress intelligence.
              </p>
            </div>
          </footer>
        </div>

        {location.pathname.startsWith('/workout') && workout.chatModeEnabled ? <ChatPanel /> : null}
        <MobileDock />
      </div>
    </div>
  );
}
