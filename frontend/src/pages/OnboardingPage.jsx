import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import {
  budgetOptions,
  cadenceOptions,
  coachToneOptions,
  goalOptions,
  onboardingSteps,
  reminderWindowOptions,
} from '@/constants/onboarding';
import { JourneyStepper } from '@/features/onboarding/components/JourneyStepper';
import { OptionGroup } from '@/features/onboarding/components/OptionGroup';
import { useAppState } from '@/hooks/useAppState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

function formatSavedAt(savedAt) {
  if (!savedAt) {
    return 'Setup has not been saved yet.';
  }

  return `Setup saved on ${new Date(savedAt).toLocaleDateString()}.`;
}

export default function OnboardingPage() {
  useDocumentTitle('Onboarding');
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const { userProfile } = state;

  const updateProfileField = (field) => (value) => {
    dispatch({
      type: 'UPDATE_PROFILE_FIELD',
      payload: { field, value },
    });
  };

  const saveSetup = () => {
    dispatch({
      type: 'SAVE_PROFILE',
      payload: { savedAt: new Date().toISOString() },
    });
    navigate('/profile');
  };

  const summary = [
    goalOptions.find((item) => item.id === userProfile.goal),
    cadenceOptions.find((item) => item.id === userProfile.cadence),
    budgetOptions.find((item) => item.id === userProfile.budget),
    coachToneOptions.find((item) => item.id === userProfile.tone),
    reminderWindowOptions.find((item) => item.id === userProfile.reminders),
  ].filter(Boolean);

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Onboarding"
        title="Tune how the coach thinks before the first serious session."
        mobileTitle="Coach setup"
        description="This is where GYMOS AI learns your pace, budget tolerance, coaching tone, and reminder intensity so every downstream module feels personal."
        mobileDescription="Set the pace, tone, and reminder behavior that should shape the app."
        meta={['Goal-aware', 'Budget-aware', 'Reminder-aware']}
        actions={
          <>
            <Button to="/profile">Back to profile</Button>
            <Button variant="secondary" onClick={saveSetup}>
              Save setup
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.08fr_0.92fr]" variants={fadeUp}>
        <div className="order-first space-y-4 sm:space-y-6 xl:order-last">
          <Panel className="px-4 py-4 sm:px-7 sm:py-7">
            <div className="hidden flex-wrap items-center gap-3 sm:flex">
              <Badge icon="spark">Live profile summary</Badge>
              <Badge icon="bell" tone="neutral">
                {userProfile.savedAt ? 'Setup saved' : 'Reminder engine preview'}
              </Badge>
            </div>

            <h3 className="mt-1 font-display text-[1.6rem] leading-[1.05] font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl">
              Current coaching profile.
            </h3>
            <div className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
              {summary.map((item) => (
                <div
                  key={item.id}
                  className="panel-muted rounded-[20px] px-4 py-3.5 sm:rounded-[24px] sm:py-4"
                >
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400 sm:mt-2 sm:leading-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <StatePanel
            title="Connected biometrics"
            description="The onboarding shell is already safe for partial user data."
            isEmpty
            emptyIcon="pulse"
            emptyTitle="No wearable data connected yet"
            emptyDescription={`Once sleep, heart-rate, or recovery data is connected, this panel can immediately enrich the onboarding profile without breaking the flow. ${formatSavedAt(userProfile.savedAt)}`}
          />
        </div>

        <Panel className="space-y-5 px-4 py-4 sm:space-y-8 sm:px-7 sm:py-7">
          <JourneyStepper activeStep={2} steps={onboardingSteps} />

          <OptionGroup
            title="Primary goal"
            description="Set the outcome the coach should protect when tradeoffs appear."
            options={goalOptions}
            selectedId={userProfile.goal}
            onChange={updateProfileField('goal')}
          />

          <OptionGroup
            title="Training rhythm"
            description="Choose a weekly cadence the recovery engine can realistically sustain."
            options={cadenceOptions}
            selectedId={userProfile.cadence}
            onChange={updateProfileField('cadence')}
          />

          <OptionGroup
            title="Nutrition budget"
            description="Tell the diet engine how aggressively it should optimize for cost."
            options={budgetOptions}
            selectedId={userProfile.budget}
            onChange={updateProfileField('budget')}
          />

          <OptionGroup
            title="Coach tone"
            description="Pick the emotional texture of the coaching."
            options={coachToneOptions}
            selectedId={userProfile.tone}
            onChange={updateProfileField('tone')}
          />

          <OptionGroup
            title="Reminder behavior"
            description="The reminder engine can whisper, adapt, or push harder when streak risk rises."
            options={reminderWindowOptions}
            selectedId={userProfile.reminders}
            onChange={updateProfileField('reminders')}
          />
        </Panel>
      </motion.section>
    </motion.div>
  );
}
