export function MacroSplit({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">{item.label}</span>
            <span className="text-slate-500">{item.value}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.05]">
            <div
              className={`h-2 rounded-full ${item.color}`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
