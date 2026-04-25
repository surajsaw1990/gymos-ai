import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { MetricCard } from '@/components/ui/MetricCard';
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
  reminderWindowOptions,
  splitOptions,
  workoutDayOptions,
} from '@/constants/onboarding';
import { useAppState } from '@/hooks/useAppState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

function getOptionLabel(options, id) {
  return options.find((item) => item.id === id)?.title || id;
}

function formatSavedAt(savedAt) {
  return savedAt
    ? `Saved on ${new Date(savedAt).toLocaleDateString()}`
    : 'Profile is not saved yet';
}

export default function ProfilePage() {
  useDocumentTitle('Profile');
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const { analytics, userProfile } = state;

  const updateProfileField = (field) => (event) => {
    dispatch({
      type: 'UPDATE_PROFILE_FIELD',
      payload: {
        field,
        value: event.target.value,
      },
    });
  };

  const saveProfile = () => {
    dispatch({
      type: 'SAVE_PROFILE',
      payload: {
        savedAt: new Date().toISOString(),
      },
    });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const profileStats = [
    {
      label: 'Trainer identity',
      value: userProfile.trainerName,
      detail: `${userProfile.tone} tone in ${userProfile.language} for ${userProfile.name}.`,
      icon: 'spark',
    },
    {
      label: 'Training setup',
      value: `${userProfile.workoutDaysPerWeek} days`,
      detail: `${getOptionLabel(splitOptions, userProfile.preferredSplit)} with ${userProfile.experienceLevel} experience.`,
      icon: 'calendar',
    },
    {
      label: 'Nutrition profile',
      value: `${userProfile.dailyBudget} / day`,
      detail: `${getOptionLabel(foodPreferenceOptions, userProfile.foodPreference)} meals tuned to ${userProfile.goal.replace('_', ' ')}.`,
      icon: 'leaf',
    },
  ];

  const profileSummary = [
    {
      title: 'Name',
      value: userProfile.name,
    },
    {
      title: 'Phone number',
      value: userProfile.phoneNumber || 'Not added yet',
    },
    {
      title: 'Body metrics',
      value: `${userProfile.heightCm} cm | ${userProfile.weightKg} kg | ${userProfile.age} yr`,
    },
    {
      title: 'Saved state',
      value: formatSavedAt(userProfile.savedAt),
    },
  ];

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Profile"
        title="Your personal trainer profile, recovery context, and app identity."
        mobileTitle="Trainer profile"
        description="This profile feeds the workout plan, diet targets, analytics tone, and AI trainer chat. Keep it current and the whole app stays personal."
        mobileDescription="Edit the data your coach uses across the app."
        meta={['Editable profile', 'Local login', 'Trainer-driven app state']}
        actions={
          <>
            <Button onClick={saveProfile}>Save preference</Button>
            <Button to="/onboarding" variant="secondary">
              Open onboarding
            </Button>
          </>
        }
      />

      <motion.section className="grid gap-3 sm:gap-4 lg:grid-cols-3" variants={fadeUp}>
        {profileStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </motion.section>

      <motion.section className="grid gap-4 sm:gap-6 xl:grid-cols-[0.94fr_1.06fr]" variants={fadeUp}>
        <div className="space-y-4 sm:space-y-6">
          <Panel className="px-4 py-4 sm:px-7 sm:py-7">
            <p className="text-xs font-semibold tracking-[0.24em] text-brand-300 uppercase">
              GYMOS AI profile
            </p>
            <h3 className="mt-3 font-display text-[1.55rem] leading-[1.05] font-semibold tracking-tight text-white sm:mt-6 sm:text-3xl">
              Everything your coach should know before planning the day.
            </h3>
            <p className="mt-2.5 text-sm leading-6 text-slate-400 sm:mt-3 sm:leading-7">
              {userProfile.trainerName} is coaching {userProfile.name} toward {userProfile.goal.replace('_', ' ')} with a {userProfile.tone} voice, {userProfile.foodPreference} meals, and a {userProfile.workoutDaysPerWeek}-day split.
            </p>

            <div className="mt-5 grid gap-2.5 sm:mt-6 sm:gap-3">
              {profileSummary.map((item) => (
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
            title="Live profile signals"
            description="A few high-value signals stay visible before you dive into the full form."
          >
            <div className="space-y-2.5 sm:space-y-3">
              <div className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7">
                Recovery is sitting at {analytics.recovery}% and the discipline engine trusts your {userProfile.workoutDaysPerWeek}-day training rhythm.
              </div>
              <div className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7">
                Diet guidance is using a {getOptionLabel(budgetOptions, userProfile.budget).toLowerCase()} with {getOptionLabel(foodPreferenceOptions, userProfile.foodPreference).toLowerCase()} meals.
              </div>
              <div className="panel-muted rounded-[22px] px-4 py-3.5 text-sm leading-6 text-slate-300 sm:rounded-[24px] sm:py-4 sm:leading-7">
                Chat replies are personalized for {getOptionLabel(languageOptions, userProfile.language)}, {getOptionLabel(coachToneOptions, userProfile.tone).toLowerCase()}, and {userProfile.experienceLevel} experience.
              </div>
            </div>
          </StatePanel>
        </div>

        <Panel className="space-y-5 px-4 py-4 sm:space-y-6 sm:px-7 sm:py-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Full name"
              value={userProfile.name}
              onChange={updateProfileField('name')}
              placeholder="Enter your name"
            />
            <FormField
              label="Phone number"
              value={userProfile.phoneNumber}
              onChange={updateProfileField('phoneNumber')}
              placeholder="9876543210"
            />
            <FormField
              label="Age"
              value={userProfile.age}
              onChange={updateProfileField('age')}
              placeholder="27"
              type="number"
            />
            <FormField
              label="Gender"
              value={userProfile.gender}
              onChange={updateProfileField('gender')}
              options={genderOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Height (cm)"
              value={userProfile.heightCm}
              onChange={updateProfileField('heightCm')}
              placeholder="175"
              type="number"
            />
            <FormField
              label="Weight (kg)"
              value={userProfile.weightKg}
              onChange={updateProfileField('weightKg')}
              placeholder="74"
              type="number"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Fitness goal"
              value={userProfile.goal}
              onChange={updateProfileField('goal')}
              options={goalOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Experience level"
              value={userProfile.experienceLevel}
              onChange={updateProfileField('experienceLevel')}
              options={experienceOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Workout days per week"
              value={userProfile.workoutDaysPerWeek}
              onChange={updateProfileField('workoutDaysPerWeek')}
              options={workoutDayOptions.map((item) => ({
                label: item.title,
                value: String(Number.parseInt(item.id, 10)),
              }))}
            />
            <FormField
              label="Preferred split"
              value={userProfile.preferredSplit}
              onChange={updateProfileField('preferredSplit')}
              options={splitOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Food preference"
              value={userProfile.foodPreference}
              onChange={updateProfileField('foodPreference')}
              options={foodPreferenceOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Budget category"
              value={userProfile.budget}
              onChange={updateProfileField('budget')}
              options={budgetOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Daily budget"
              value={userProfile.dailyBudget}
              onChange={updateProfileField('dailyBudget')}
              placeholder="12"
              type="number"
            />
            <FormField
              label="Preferred language"
              value={userProfile.language}
              onChange={updateProfileField('language')}
              options={languageOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Trainer name preference"
              value={userProfile.trainerName}
              onChange={updateProfileField('trainerName')}
              placeholder="Coach Arjun"
            />
            <FormField
              label="Trainer tone"
              value={userProfile.tone}
              onChange={updateProfileField('tone')}
              options={coachToneOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
            <FormField
              label="Reminder mode"
              value={userProfile.reminders}
              onChange={updateProfileField('reminders')}
              options={reminderWindowOptions.map((item) => ({ label: item.title, value: item.id }))}
            />
          </div>

          <FormField
            label="Injuries or limitations"
            value={userProfile.injuries}
            onChange={updateProfileField('injuries')}
            placeholder="Shoulder pain, knee irritation, lower-back stiffness..."
            textarea
          />

          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <Button onClick={saveProfile}>Save preference</Button>
            <Button to="/onboarding" variant="secondary">
              Refine onboarding
            </Button>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </Panel>
      </motion.section>
    </motion.div>
  );
}
