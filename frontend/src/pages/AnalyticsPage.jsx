import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatePanel } from '@/components/ui/StatePanel';
import {
  analyticsStats,
  bodyTrend,
  consistencyFeed,
  strengthProjection,
} from '@/constants/analytics';
import { ProjectionList } from '@/features/analytics/components/ProjectionList';
import { TrendBars } from '@/features/analytics/components/TrendBars';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function AnalyticsPage() {
  useDocumentTitle('Analytics');

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Analytics / Progress"
        title="Progress intelligence that feels cinematic, not clinical."
        description="The analytics shell translates raw progress into clear momentum: body trend, strength trajectory, and discipline stability, all without drowning the user in charts."
        meta={['Progress prediction', 'Transformation-ready', 'Empty-safe check-ins']}
        actions={
          <>
            <Button>Run prediction refresh</Button>
            <Button variant="secondary">Capture new check-in</Button>
          </>
        }
      />

      <motion.section className="grid gap-4 lg:grid-cols-3" variants={fadeUp}>
        {analyticsStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]" variants={fadeUp}>
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

      <motion.section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]" variants={fadeUp}>
        <StatePanel
          title="Discipline engine notes"
          description="The app treats adherence as a first-class metric, not an afterthought."
        >
          <div className="space-y-3">
            {consistencyFeed.map((item) => (
              <div key={item} className="panel-muted rounded-[24px] px-4 py-4 text-sm leading-7 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </StatePanel>

        <StatePanel
          title="Body transformation visualizer"
          description="Media-dependent surfaces stay elegant even before uploads exist."
          isEmpty
          emptyIcon="body"
          emptyTitle="No progress captures uploaded yet"
          emptyDescription="Once front, side, or milestone check-ins are added, this area can evolve into a premium transformation visualizer with comparison and future-state previews."
        />
      </motion.section>
    </motion.div>
  );
}
