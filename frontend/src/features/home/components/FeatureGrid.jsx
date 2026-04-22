export function FeatureGrid({ features }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {features.map((feature) => (
        <article
          key={feature.id}
          className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-brand-400/30 hover:bg-white/6"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-lg font-semibold text-white">{feature.id}</p>
            <span className="rounded-full border border-brand-400/20 bg-brand-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em] text-brand-300 uppercase">
              Locked
            </span>
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-100">{feature.name}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">{feature.summary}</p>
        </article>
      ))}
    </div>
  );
}
