import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/ui/MetricCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import {
  budgetOptions,
  cadenceOptions,
  coachToneOptions,
  goalOptions,
  reminderWindowOptions,
} from '@/constants/onboarding';
import { useAppState } from '@/hooks/useAppState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

function getOptionLabel(options, id) {
  return options.find((item) => item.id === id)?.title || id;
}

function formatSavedAt(savedAt) {
  return savedAt ? new Date(savedAt).toLocaleDateString() : 'Not saved yet';
}

export default function ProfilePage() {
  useDocumentTitle('Profile');
  const { state, dispatch } = useAppState();
  const { analytics, userProfile } = state;

  const profileStats = [
    {
      label: 'Coach tone',
      value: getOptionLabel(coachToneOptions, userProfile.tone),
      detail: 'Measured cues and reminders follow the tone you selected in onboarding.',
      icon: 'spark',
    },
    {
      label: 'Reminder mode',
      value: getOptionLabel(reminderWindowOptions, userProfile.reminders),
      detail: 'Prompt intensity adapts across workouts, meals, and streak risk.',
      icon: 'bell',
    },
    {
      label: 'Weekly cadence',
      value: getOptionLabel(cadenceOptions, userProfile.cadence),
      detail: `Recovery and discipline logic are tuned around your ${userProfile.cadence} rhythm.`,
      icon: 'calendar',
    },
  ];

  const profilePreferences = [
    {
      title: 'Primary goal',
      value: getOptionLabel(goalOptions, userProfile.goal),
    },
    {
      title: 'Nutrition budget',
      value: getOptionLabel(budgetOptions, userProfile.budget),
    },
    {
      title: 'Readiness pulse',
      value: `${analytics.recovery}% synced`,
    },
    {
      title: 'Profile saved',
      value: formatSavedAt(userProfile.savedAt),
    },
  ];

  const profileShortcuts = [
    `Goal focus is currently ${getOptionLabel(goalOptions, userProfile.goal)}.`,
    `${getOptionLabel(reminderWindowOptions, userProfile.reminders)} is active with a ${getOptionLabel(coachToneOptions, userProfile.tone).toLowerCase()} tone.`,
    `Discipline engine is tracking a ${analytics.streak}-day run at your ${userProfile.cadence} pace.`,
  ];

  const saveProfile = () => {
    dispatch({
      type: 'SAVE_PROFILE',
      payload: { savedAt: new Date().toISOString() },
    });
  };

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Profile"
        title="Your coaching identity, reminder posture, and preference stack."
        mobileTitle="Profile"
        description="Profile keeps the system personal: tone, cadence, reminders, and the quick links that matter before you expand the product surface."
        mobileDescription="Identity, reminders, and coaching preferences."
        meta={['Identity', 'Coach tone', 'Reminders']}
        actions={
          <>
            <Button to="/onboarding">Open onboarding</Button>
            <Button variant="secondary" onClick={saveProfile}>
              Save profile
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-3 sm:gap-4 lg:grid-cols-3" variants={fadeUp}>
        {profileStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.02fr_0.98fr]" variants={fadeUp}>
        <Panel className="px-4 py-4 sm:px-7 sm:py-7">
          <p className="text-xs font-semibold tracking-[0.24em] text-brand-300 uppercase">
            GYMOS AI profile
          </p>
          <h3 className="mt-3 font-display text-[1.55rem] leading-[1.05] font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl">
            Personal setup with a low-noise coaching feel.
          </h3>
          <p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-3 sm:leading-7">
            This screen keeps the identity layer compact on mobile while still giving direct access
            to onboarding, reminders, and future profile-linked systems.
          </p>

          <div className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3">
            {profilePreferences.map((item) => (
              <div
                key={item.title}
                className="panel-muted flex items-center justify-between gap-4 rounded-[22px] px-4 py-3.5 sm:rounded-[24px] sm:py-4"
              >
                <p className="text-sm text-slate-400">{item.title}</p>
                <p className="text-sm font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </Panel>

        <StatePanel
          title="Quick profile actions"
          description="The next high-value moves stay one tap away."
          action={
            <Button to="/onboarding" variant="ghost">
              Refine setup
            </Button>
          }
        >
          <div className="space-y-2.5 sm:space-y-3">
            {profileShortcuts.map((item) => (
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
