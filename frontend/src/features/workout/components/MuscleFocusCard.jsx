export function MuscleFocusCard({ focus }) {
  return (
    <div className="space-y-3">
      <div className="panel-muted rounded-[22px] px-4 py-4">
        <p className="text-xs font-semibold tracking-[0.22em] text-brand-300 uppercase">
          Muscle focus
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="panel-muted flex min-h-[220px] items-center justify-center rounded-[22px] px-4 py-4">
            <div className="relative h-44 w-28">
              <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full border border-white/12 bg-white/[0.04]" />
              <div className="absolute left-1/2 top-8 h-16 w-14 -translate-x-1/2 rounded-[22px] border border-white/12 bg-white/[0.03]" />
              <div className="absolute left-[14px] top-[44px] h-4 w-10 rounded-full border border-brand-400/20 bg-brand-400/10" />
              <div className="absolute right-[14px] top-[44px] h-4 w-10 rounded-full border border-brand-400/20 bg-brand-400/10" />
              <div className="absolute left-1/2 top-[92px] h-[4.5rem] w-4 -translate-x-1/2 rounded-full border border-brand-400/20 bg-brand-400/10" />
              <div className="absolute left-[26px] top-[86px] h-24 w-5 rounded-full border border-white/10 bg-white/[0.04]" />
              <div className="absolute right-[26px] top-[86px] h-24 w-5 rounded-full border border-white/10 bg-white/[0.04]" />
              <div className="absolute left-[14px] top-[152px] h-[4.5rem] w-5 rounded-full border border-white/10 bg-white/[0.03]" />
              <div className="absolute right-[14px] top-[152px] h-[4.5rem] w-5 rounded-full border border-white/10 bg-white/[0.03]" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="panel-muted rounded-[22px] px-4 py-3.5">
              <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Primary muscles</p>
              <p className="mt-2 text-sm leading-6 text-white">{focus.primaryMuscles.join(', ')}</p>
            </div>
            <div className="panel-muted rounded-[22px] px-4 py-3.5">
              <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Secondary muscles</p>
              <p className="mt-2 text-sm leading-6 text-white">{focus.secondaryMuscles.join(', ') || 'Minimal assistance'}</p>
            </div>
            <div className="panel-muted rounded-[22px] px-4 py-3.5">
              <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Form cue</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{focus.formCue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="panel-muted rounded-[22px] px-4 py-3.5">
          <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Common mistake</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{focus.commonMistake}</p>
        </div>
        <div className="panel-muted rounded-[22px] px-4 py-3.5">
          <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Safety note</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">{focus.safetyNote}</p>
        </div>
      </div>
    </div>
  );
}
