export function CadenceTimeline({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.time} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-400/18 bg-brand-400/10 font-display text-sm font-semibold text-brand-300">
              {item.time}
            </div>
            {index < items.length - 1 ? <div className="mt-3 h-full w-px bg-white/10" /> : null}
          </div>
          <div className="pb-5">
            <h4 className="font-medium text-white">{item.title}</h4>
            <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
