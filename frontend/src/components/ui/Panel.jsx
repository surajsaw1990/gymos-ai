import { cn } from '@/utils/cn';

export function Panel({ as: Component = 'section', children, className }) {
  return (
    <Component className={cn('panel-surface premium-border ambient-frame', className)}>
      {children}
    </Component>
  );
}
