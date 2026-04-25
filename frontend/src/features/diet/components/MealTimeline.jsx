export function MealTimeline({ meals }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {meals.map((meal) => (
        <div
          key={meal.time}
          className="panel-muted flex flex-col gap-3 rounded-[22px] px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:rounded-[24px]"
        >
          <div className="flex min-w-0 gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] border border-brand-400/18 bg-brand-400/10 font-display text-sm font-semibold text-brand-300 sm:rounded-2xl">
              {meal.time}
            </div>
            <div className="min-w-0">
              <h4 className="break-words font-medium text-white">{meal.title}</h4>
              <p className="mt-1.5 break-words text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
                {meal.detail}
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs tracking-[0.2em] text-slate-400 uppercase sm:py-2">
            {meal.cost}
          </span>
        </div>
      ))}
    </div>
  );
}
