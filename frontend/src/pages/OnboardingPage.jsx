import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import {
  budgetOptions,
  coachToneOptions,
  experienceOptions,
  foodPreferenceOptions,
  genderOptions,
  goalOptions,
  languageOptions,
  onboardingSteps,
  reminderWindowOptions,
  splitOptions,
  workoutDayOptions,
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

  const updateField = (field) => (eventOrValue) => {
    const value =
      typeof eventOrValue === 'string' ? eventOrValue : eventOrValue.target.value;

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
    `${userProfile.name} | ${userProfile.age} yr | ${userProfile.weightKg} kg`,
    `${userProfile.goal.replace('_', ' ')} goal with ${userProfile.experienceLevel} experience`,
    `${userProfile.workoutDaysPerWeek} training days using ${userProfile.preferredSplit.replaceAll('-', ' ')}`,
    `${userProfile.foodPreference} diet | ${userProfile.dailyBudget} per day | ${userProfile.language}`,
  ];

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Onboarding"
        title="Teach the trainer who you are before the next serious session."
        mobileTitle="Trainer setup"
        description="Onboarding now feeds login, workout planning, diet guidance, analytics language, and the AI coach voice. Keep the inputs practical and the app will stay personal."
        mobileDescription="Set identity, body metrics, training style, and coach tone."
        meta={['Profile-driven chat', 'Workout personalization', 'Diet personalization']}
        actions={
          <>
            <Button onClick={saveSetup}>Save setup</Button>
            <Button to="/profile" variant="secondary">
              Back to profile
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.08fr_0.92fr]" variants={fadeUp}>
        <div className="order-first space-y-4 sm:space-y-6 xl:order-last">
          <Panel className="px-4 py-4 sm:px-7 sm:py-7">
            <div className="hidden flex-wrap items-center gap-3 sm:flex">
              <Badge icon="spark">Live trainer summary</Badge>
              <Badge icon="bell" tone="neutral">
                {userProfile.savedAt ? 'Setup saved' : 'Awaiting save'}
              </Badge>
            </div>

            <h3 className="mt-1 font-display text-[1.6rem] leading-[1.05] font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl">
              Your current coaching profile.
            </h3>
            <div className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
              {summary.map((item) => (
                <div
                  key={item}
                  className="panel-muted rounded-[20px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <StatePanel
            title="Setup status"
            description="The system is already able to train around the data you give it."
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7">
                {userProfile.trainerName} will talk in {userProfile.language} with a {userProfile.tone} tone.
              </div>
              <div className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7">
                The workout engine will protect {userProfile.goal.replace('_', ' ')}, {userProfile.experienceLevel} experience, and {userProfile.injuries || 'no major limitations saved yet'}.
              </div>
              <div className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7">
                The diet engine will stay around {userProfile.foodPreference} meals and a {userProfile.dailyBudget} daily budget. {formatSavedAt(userProfile.savedAt)}
              </div>
            </div>
          </StatePanel>
        </div>

        <Panel className="space-y-5 px-4 py-4 sm:space-y-8 sm:px-7 sm:py-7">
          <JourneyStepper activeStep={3} steps={onboardingSteps} />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Full name"
              value={userProfile.name}
              onChange={updateField('name')}
              placeholder="Your name"
            />
            <FormField
              label="Phone number"
              value={userProfile.phoneNumber}
              onChange={updateField('phoneNumber')}
              placeholder="9876543210"
            />
            <FormField
              label="Age"
              value={userProfile.age}
              onChange={updateField('age')}
              type="number"
            />
            <FormField
              label="Gender"
              value={userProfile.gender}
              onChange={updateField('gender')}
              options={genderOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Height (cm)"
              value={userProfile.heightCm}
              onChange={updateField('heightCm')}
              type="number"
            />
            <FormField
              label="Weight (kg)"
              value={userProfile.weightKg}
              onChange={updateField('weightKg')}
              type="number"
            />
            <FormField
              label="Daily budget"
              value={userProfile.dailyBudget}
              onChange={updateField('dailyBudget')}
              type="number"
            />
            <FormField
              label="Trainer name"
              value={userProfile.trainerName}
              onChange={updateField('trainerName')}
              placeholder="Coach Arjun"
            />
          </div>

          <OptionGroup
            title="Primary goal"
            description="Set the main result your trainer should protect when fatigue or tradeoffs appear."
            options={goalOptions}
            selectedId={userProfile.goal}
            onChange={updateField('goal')}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <OptionGroup
              title="Experience"
              description="This changes exercise choices, set count, and coaching language."
              options={experienceOptions}
              selectedId={userProfile.experienceLevel}
              onChange={updateField('experienceLevel')}
            />

            <OptionGroup
              title="Workout days"
              description="Pick the weekly rhythm the app should actually plan around."
              options={workoutDayOptions}
              selectedId={`${userProfile.workoutDaysPerWeek}x`}
              onChange={(value) => updateField('workoutDaysPerWeek')(String(Number.parseInt(value, 10)))}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <OptionGroup
              title="Preferred split"
              description="Choose the workout structure that feels natural enough to repeat."
              options={splitOptions}
              selectedId={userProfile.preferredSplit}
              onChange={updateField('preferredSplit')}
            />

            <OptionGroup
              title="Food preference"
              description="The diet coach will stay inside this preference before suggesting meals."
              options={foodPreferenceOptions}
              selectedId={userProfile.foodPreference}
              onChange={updateField('foodPreference')}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <OptionGroup
              title="Budget category"
              description="The meal engine uses this along with daily budget to keep suggestions realistic."
              options={budgetOptions}
              selectedId={userProfile.budget}
              onChange={updateField('budget')}
            />

            <OptionGroup
              title="Coach tone"
              description="This changes how the trainer sounds across chat, reminders, and summaries."
              options={coachToneOptions}
              selectedId={userProfile.tone}
              onChange={updateField('tone')}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <OptionGroup
              title="Language"
              description="Pick the language style the trainer should use most naturally."
              options={languageOptions}
              selectedId={userProfile.language}
              onChange={updateField('language')}
            />

            <OptionGroup
              title="Reminder mode"
              description="Smart reminders can stay quiet or push harder when streak risk rises."
              options={reminderWindowOptions}
              selectedId={userProfile.reminders}
              onChange={updateField('reminders')}
            />
          </div>

          <FormField
            label="Injuries or limitations"
            value={userProfile.injuries}
            onChange={updateField('injuries')}
            placeholder="Shoulder pain, knee irritation, lower-back sensitivity..."
            textarea
          />
        </Panel>
      </motion.section>
    </motion.div>
  );
}
