export function ProjectionList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.lift}
          className="panel-muted flex items-center justify-between gap-4 rounded-[24px] px-4 py-4"
        >
          <div>
            <h4 className="font-medium text-white">{item.lift}</h4>
            <p className="mt-1 text-sm text-slate-400">Current: {item.current}</p>
          </div>
          <div className="text-right">
            <p className="text-xs tracking-[0.2em] text-slate-500 uppercase">Projected</p>
            <p className="mt-2 font-display text-xl font-semibold text-white">{item.target}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
