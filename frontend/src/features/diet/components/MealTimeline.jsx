export function MealTimeline({ meals }) {
  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div
          key={meal.time}
          className="panel-muted flex flex-col gap-4 rounded-[24px] px-4 py-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-400/18 bg-brand-400/10 font-display text-sm font-semibold text-brand-300">
              {meal.time}
            </div>
            <div>
              <h4 className="font-medium text-white">{meal.title}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-400">{meal.detail}</p>
            </div>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-2 text-xs tracking-[0.2em] text-slate-400 uppercase">
            {meal.cost}
          </span>
        </div>
      ))}
    </div>
  );
}
