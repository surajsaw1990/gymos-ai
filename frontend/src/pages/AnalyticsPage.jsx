import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatePanel } from '@/components/ui/StatePanel';
import { ProjectionList } from '@/features/analytics/components/ProjectionList';
import { TrendBars } from '@/features/analytics/components/TrendBars';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function AnalyticsPage() {
  useDocumentTitle('Analytics');
  const {
    analyticsStats,
    bodyTrend,
    consistencyFeed,
    hasCapture,
    lastRefreshSummary,
    latestCaptureLabel,
    captureCheckIn,
    refreshPrediction,
    strengthProjection,
  } = useAnalytics();
  const [isRefreshingPrediction, setIsRefreshingPrediction] = useState(false);
  const refreshTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const handleRefreshPrediction = () => {
    if (isRefreshingPrediction) {
      return;
    }

    setIsRefreshingPrediction(true);
    refreshTimerRef.current = window.setTimeout(() => {
      refreshPrediction();
      setIsRefreshingPrediction(false);
      refreshTimerRef.current = null;
    }, 700);
  };

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Analytics / Progress"
        title="Progress intelligence that feels cinematic, not clinical."
        mobileTitle="Progress shell"
        description="The analytics shell translates raw progress into clear momentum: body trend, strength trajectory, and discipline stability, all without drowning the user in charts."
        mobileDescription="Clear momentum across body trend, strength, and discipline."
        meta={['Progress prediction', 'Transformation-ready', 'Empty-safe check-ins']}
        actions={
          <>
            <Button loading={isRefreshingPrediction} onClick={handleRefreshPrediction}>
              Refresh prediction
            </Button>
            <Button variant="secondary" onClick={captureCheckIn}>
              {hasCapture ? 'Capture again' : 'Capture check-in'}
            </Button>
          </>
        }
      />

      {lastRefreshSummary ? (
        <motion.div className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7" variants={fadeUp}>
          {lastRefreshSummary}
        </motion.div>
      ) : null}

      <motion.section className="grid gap-3 sm:gap-4 lg:grid-cols-3" variants={fadeUp}>
        {analyticsStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.08fr_0.92fr]" variants={fadeUp}>
        <StatePanel
          title="Body recomposition trend"
          description="A restrained bar treatment keeps the screen premium while still showing momentum."
        >
          <TrendBars items={bodyTrend} />
        </StatePanel>

        <StatePanel
          title="Strength projection"
          description="Progress Prediction can turn training consistency into projected lift targets."
        >
          <ProjectionList items={strengthProjection} />
        </StatePanel>
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[0.95fr_1.05fr]" variants={fadeUp}>
        <StatePanel
          title="Discipline engine notes"
          description="The app treats adherence as a first-class metric, not an afterthought."
        >
          <div className="space-y-2.5 sm:space-y-3">
            {consistencyFeed.map((item) => (
              <div
                key={item}
                className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </StatePanel>

        <StatePanel
          title="Body transformation visualizer"
          description={
            hasCapture
              ? 'Recent capture metadata is flowing into the visualizer shell without breaking the premium layout.'
              : 'Media-dependent surfaces stay elegant even before uploads exist.'
          }
          isEmpty={!hasCapture}
          emptyIcon="body"
          emptyTitle="No progress captures uploaded yet"
          emptyDescription="Once front, side, or milestone check-ins are added, this area can evolve into a premium transformation visualizer with comparison and future-state previews."
        >
          <div className="space-y-2.5 sm:space-y-3">
            <div className="panel-muted rounded-[22px] px-4 py-3.5 sm:rounded-[24px] sm:py-4">
              <p className="text-xs tracking-[0.22em] text-brand-300 uppercase">Latest capture</p>
              <p className="mt-2 font-medium text-white">{latestCaptureLabel}</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
                The next visualizer pass can use this checkpoint as the newest comparison frame.
              </p>
            </div>
            {consistencyFeed.slice(0, 2).map((item) => (
              <div
                key={item}
                className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7"
              >
                {item}
              </div>
            ))}
          </div>
        </StatePanel>
      </motion.section>
    </motion.div>
  );
}
