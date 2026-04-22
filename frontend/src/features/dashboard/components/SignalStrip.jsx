import { AppIcon } from '@/components/icons/AppIcons';

export function SignalStrip({ signals }) {
  return (
    <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
      {signals.map((signal, index) => (
        <article
          key={signal.title}
          className={`panel-muted rounded-[22px] px-4 py-4 sm:rounded-[24px] ${index > 1 ? 'hidden lg:block' : ''}`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] text-brand-300 sm:h-11 sm:w-11 sm:rounded-2xl">
            <AppIcon name={signal.icon} className="h-5 w-5" />
          </div>
          <h4 className="mt-3 font-display text-base font-semibold text-white sm:mt-4 sm:text-lg">
            {signal.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-400 sm:leading-7">{signal.detail}</p>
        </article>
      ))}
    </div>
  );
}
