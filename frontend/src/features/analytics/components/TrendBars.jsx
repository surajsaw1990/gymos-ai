export function TrendBars({ items }) {
  return (
    <div className="grid grid-cols-6 gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-3">
          <div className="flex h-48 w-full items-end rounded-[22px] bg-white/[0.04] p-2">
            <div
              className="w-full rounded-[16px] bg-[linear-gradient(180deg,rgba(103,229,255,0.95),rgba(43,167,255,0.55))]"
              style={{ height: `${item.value}%` }}
            />
          </div>
          <span className="text-sm text-slate-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
