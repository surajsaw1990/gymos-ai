import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BrandMark } from '@/components/BrandMark';
import { Button } from '@/components/ui/Button';
import { BRAND_NAME } from '@/constants/brand';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-10">
      <motion.div
        className="panel-surface premium-border ambient-frame w-full rounded-[32px] p-8 text-center sm:p-12"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mx-auto flex w-fit items-center gap-4">
          <BrandMark />
          <p className="font-display text-xs font-semibold tracking-[0.3em] text-brand-300 uppercase">
            {BRAND_NAME}
          </p>
        </div>
        <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          This route is off-program.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-400">
          The screen you requested has not been mapped into the current GYMOS AI navigation yet.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/">Back to dashboard</Button>
          <Link
            to="/onboarding"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.08]"
          >
            Open onboarding
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
