import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@/components/icons/AppIcons';
import { cn } from '@/utils/cn';

const variants = {
  primary:
    'bg-brand-400 text-slate-950 shadow-[0_12px_30px_rgba(103,229,255,0.18)] hover:bg-brand-300 active:bg-brand-300/90',
  secondary:
    'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] active:bg-white/[0.1]',
  ghost:
    'bg-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white active:bg-white/[0.06]',
};

export function Button({
  children,
  className,
  icon = false,
  to,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const sharedClassName = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold select-none touch-manipulation active:scale-[0.985] disabled:pointer-events-none disabled:opacity-45 sm:px-5 sm:py-3',
    variants[variant],
    className,
  );

  if (to) {
    return (
      <Link className={sharedClassName} to={to} {...props}>
        <span>{children}</span>
        {icon ? <ArrowRightIcon className="h-4 w-4" /> : null}
      </Link>
    );
  }

  return (
    <button className={sharedClassName} type={type} {...props}>
      <span>{children}</span>
      {icon ? <ArrowRightIcon className="h-4 w-4" /> : null}
    </button>
  );
}
