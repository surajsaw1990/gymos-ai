import { cn } from '@/utils/cn';

export function JourneyStepper({ activeStep = 0, steps }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible">
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn(
            'min-w-[140px] rounded-[20px] border px-3.5 py-3.5 sm:min-w-0 sm:rounded-[22px] sm:px-4 sm:py-4',
            index <= activeStep
              ? 'border-brand-400/18 bg-brand-400/10 text-white'
              : 'border-white/8 bg-white/[0.03] text-slate-500',
          )}
        >
          <p className="text-[11px] tracking-[0.24em] uppercase">Step {index + 1}</p>
          <p className="mt-2 text-sm font-medium">{step}</p>
        </div>
      ))}
    </div>
  );
}
