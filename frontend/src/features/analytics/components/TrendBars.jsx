export function TrendBars({ items }) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2 sm:gap-3">
          <div className="flex h-36 w-full items-end rounded-[18px] bg-white/[0.04] p-1.5 sm:h-48 sm:rounded-[22px] sm:p-2">
            <div
              className="w-full rounded-[16px] bg-[linear-gradient(180deg,rgba(103,229,255,0.95),rgba(43,167,255,0.55))]"
              style={{ height: `${item.value}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 sm:text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
