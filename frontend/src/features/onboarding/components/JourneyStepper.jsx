import { cn } from '@/utils/cn';

export function JourneyStepper({ activeStep = 0, steps }) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn(
            'rounded-[22px] border px-4 py-4',
            index <= activeStep
              ? 'border-brand-400/18 bg-brand-400/10 text-white'
              : 'border-white/8 bg-white/[0.03] text-slate-500',
          )}
        >
          <p className="text-xs tracking-[0.24em] uppercase">Step {index + 1}</p>
          <p className="mt-2 text-sm font-medium">{step}</p>
        </div>
      ))}
    </div>
  );
}
