import { NavLink, Outlet } from 'react-router-dom';
import { BrandMark } from '@/components/BrandMark';
import { APP_TAGLINE, BRAND_NAME } from '@/constants/brand';
import { primaryNavigation } from '@/constants/navigation';
import { cn } from '@/utils/cn';

export default function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="hero-orb absolute -left-24 top-20 h-72 w-72 rounded-full" />
      <div className="hero-orb absolute right-0 top-1/3 h-96 w-96 rounded-full opacity-70" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <header className="glass-panel premium-border sticky top-6 z-20 mb-8 flex items-center justify-between gap-6 px-5 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <BrandMark />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold tracking-[0.24em] text-brand-400 uppercase">
                {BRAND_NAME}
              </p>
              <p className="truncate text-sm text-slate-400">{APP_TAGLINE}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {primaryNavigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white',
                    isActive && 'bg-white/10 text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="mt-10 flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>{BRAND_NAME}</p>
          <p>Premium-ready frontend foundation built with React, Vite, and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
