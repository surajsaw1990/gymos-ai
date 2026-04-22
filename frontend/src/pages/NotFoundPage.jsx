import { Link } from 'react-router-dom';
import { BRAND_NAME } from '@/constants/brand';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <div className="glass-panel premium-border w-full rounded-[2rem] p-8 text-center sm:p-10">
        <p className="font-display text-xs font-semibold tracking-[0.3em] text-brand-400 uppercase">
          {BRAND_NAME}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-base leading-8 text-slate-400">
          The route you requested does not exist in the current frontend foundation.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
