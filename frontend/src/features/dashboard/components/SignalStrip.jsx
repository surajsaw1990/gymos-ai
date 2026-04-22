import { AppIcon } from '@/components/icons/AppIcons';

export function SignalStrip({ signals }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {signals.map((signal) => (
        <article key={signal.title} className="panel-muted rounded-[24px] px-4 py-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-brand-300">
            <AppIcon name={signal.icon} className="h-5 w-5" />
          </div>
          <h4 className="mt-4 font-display text-lg font-semibold text-white">{signal.title}</h4>
          <p className="mt-2 text-sm leading-7 text-slate-400">{signal.detail}</p>
        </article>
      ))}
    </div>
  );
}
