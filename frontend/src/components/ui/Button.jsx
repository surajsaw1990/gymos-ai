import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@/components/icons/AppIcons';
import { cn } from '@/utils/cn';

const variants = {
  primary:
    'bg-brand-400 text-slate-950 shadow-[0_12px_30px_rgba(103,229,255,0.18)] hover:bg-brand-300',
  secondary: 'border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]',
  ghost: 'bg-transparent text-slate-300 hover:bg-white/[0.04] hover:text-white',
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
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold',
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
