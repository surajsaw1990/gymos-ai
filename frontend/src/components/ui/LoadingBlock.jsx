import { cn } from '@/utils/cn';

export function LoadingBlock({ className, lines = 3 }) {
  return (
    <div className={cn('space-y-3', className)} role="status" aria-label="Loading section">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="shimmer-line h-4"
          style={{ width: index === lines - 1 ? '56%' : '100%' }}
        />
      ))}
    </div>
  );
}
