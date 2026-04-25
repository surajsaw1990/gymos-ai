import { AppIcon } from '@/components/icons/AppIcons';
import { cn } from '@/utils/cn';

const tones = {
  brand: 'border-brand-400/20 bg-brand-400/10 text-brand-300',
  neutral: 'border-white/10 bg-white/[0.05] text-slate-300',
  mint: 'border-mint-400/20 bg-mint-400/10 text-mint-400',
};

export function Badge({ children, icon, tone = 'brand', className }) {
  return (
    <div
      className={cn(
        'inline-flex max-w-full min-w-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold tracking-[0.2em] uppercase',
        tones[tone],
        className,
      )}
    >
      {icon ? <AppIcon name={icon} className="h-3.5 w-3.5" /> : null}
      <span className="truncate">{children}</span>
    </div>
  );
}
