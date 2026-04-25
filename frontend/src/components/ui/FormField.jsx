import { cn } from '@/utils/cn';

const inputClassName =
  'w-full rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400/30 focus:bg-white/[0.05] focus:ring-2 focus:ring-brand-400/12 placeholder:text-slate-500 sm:rounded-[24px]';

export function FormField({
  className,
  hint,
  label,
  options,
  textarea = false,
  type = 'text',
  ...props
}) {
  return (
    <label className={cn('block space-y-2', className)}>
      <span className="block text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
        {label}
      </span>
      {options ? (
        <select className={inputClassName} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : textarea ? (
        <textarea className={cn(inputClassName, 'min-h-[104px] resize-none')} {...props} />
      ) : (
        <input className={inputClassName} type={type} {...props} />
      )}
      {hint ? <p className="text-xs leading-5 text-slate-500">{hint}</p> : null}
    </label>
  );
}
