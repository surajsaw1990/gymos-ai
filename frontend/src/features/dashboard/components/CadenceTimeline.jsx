export function CadenceTimeline({ items }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item, index) => (
        <div key={item.time} className="flex gap-3 sm:gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-[18px] border border-brand-400/18 bg-brand-400/10 font-display text-[12px] font-semibold text-brand-300 sm:h-11 sm:w-11 sm:rounded-2xl sm:text-sm">
              {item.time}
            </div>
            {index < items.length - 1 ? <div className="mt-3 h-full w-px bg-white/10" /> : null}
          </div>
          <div className="pb-4 sm:pb-5">
            <h4 className="font-medium text-white">{item.title}</h4>
            <p className="mt-1.5 text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
              {item.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
