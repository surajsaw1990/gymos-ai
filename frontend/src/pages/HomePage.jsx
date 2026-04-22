import { SectionHeading } from '@/components/SectionHeading';
import { APP_DESCRIPTION, BRAND_NAME, LOCKED_FEATURES } from '@/constants/brand';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { FeatureGrid } from '@/features/home/components/FeatureGrid';

const highlights = [
  { label: 'Locked AI Features', value: '11' },
  { label: 'Frontend Pattern', value: 'Feature-Based' },
  { label: 'UI Direction', value: 'Premium Dark' },
];

export default function HomePage() {
  useDocumentTitle(BRAND_NAME);

  return (
    <div className="space-y-8">
      <section className="glass-panel premium-border relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(94,231,255,0.16),transparent_58%)] lg:block" />

        <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-2 text-xs font-medium tracking-[0.28em] text-brand-300 uppercase">
              {APP_DESCRIPTION}
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {BRAND_NAME}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A premium-ready frontend base for AI-powered training, adaptive workouts,
                disciplined habit systems, and gym-first coaching experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
              >
                Explore Foundation
              </button>
              <button
                type="button"
                className="rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Feature Modules
              </button>
            </div>
          </div>

          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
              >
                <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_20rem]">
        <div className="glass-panel premium-border px-6 py-8 sm:px-8">
          <SectionHeading
            eyebrow="Core Modules"
            title="Scalable starting point for the full GYMOS AI experience."
            description="Each feature can now grow independently without mixing route logic, presentation, hooks, and service calls into a single global layer."
          />

          <div className="mt-8">
            <FeatureGrid features={LOCKED_FEATURES} />
          </div>
        </div>

        <aside className="glass-panel premium-border px-6 py-8">
          <SectionHeading
            eyebrow="Foundation"
            title="Ready for backend integration."
            description="This base includes structure for pages, shared components, hooks, services, utilities, layouts, constants, and feature modules."
            className="space-y-2"
          />

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">
                Router
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Data-router setup with a shared app layout and a safe not-found route.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">
                Styling
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Tailwind CSS is wired through the Vite plugin with a dark premium visual base.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs tracking-[0.24em] text-slate-500 uppercase">
                Services
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                API client stub is ready for the upcoming GYMOS AI backend endpoints.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
