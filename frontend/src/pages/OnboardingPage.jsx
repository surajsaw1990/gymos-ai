import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

export default function OnboardingPage() {
  const [goal, setGoal] = useState(goalOptions[0].id);
  const [cadence, setCadence] = useState(cadenceOptions[1].id);
  const [budget, setBudget] = useState(budgetOptions[1].id);
  const [coachTone, setCoachTone] = useState(coachToneOptions[0].id);
  const [reminders, setReminders] = useState(reminderWindowOptions[1].id);

  useDocumentTitle('Onboarding');

  const summary = [
    goalOptions.find((item) => item.id === goal),
    cadenceOptions.find((item) => item.id === cadence),
    budgetOptions.find((item) => item.id === budget),
    coachToneOptions.find((item) => item.id === coachTone),
    reminderWindowOptions.find((item) => item.id === reminders),
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <PageHeader
        eyebrow="Onboarding"
        title="Tune how the coach thinks before the first serious session."
        description="This is where GYMOS AI learns your pace, budget tolerance, coaching tone, and reminder intensity so every downstream module feels personal."
        meta={['Goal-aware', 'Budget-aware', 'Reminder-aware']}
        actions={
          <>
            <Button to="/">Back to dashboard</Button>
            <Button variant="secondary">Save profile shell</Button>
          </>
        }
      />

      <motion.section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]" variants={fadeUp}>
        <Panel className="space-y-8 px-6 py-6 sm:px-7 sm:py-7">
          <JourneyStepper activeStep={2} steps={onboardingSteps} />

          <OptionGroup
            title="Primary goal"
            description="Set the outcome the coach should protect when tradeoffs appear."
            options={goalOptions}
            selectedId={goal}
            onChange={setGoal}
          />

          <OptionGroup
            title="Training rhythm"
            description="Choose a weekly cadence the recovery engine can realistically sustain."
            options={cadenceOptions}
            selectedId={cadence}
            onChange={setCadence}
          />

          <OptionGroup
            title="Nutrition budget"
            description="Tell the diet engine how aggressively it should optimize for cost."
            options={budgetOptions}
            selectedId={budget}
            onChange={setBudget}
          />

          <OptionGroup
            title="Coach tone"
            description="Premium products feel personal. Pick the emotional texture of the coaching."
            options={coachToneOptions}
            selectedId={coachTone}
            onChange={setCoachTone}
          />

          <OptionGroup
            title="Reminder behavior"
            description="The reminder engine can whisper, adapt, or push harder when streak risk rises."
            options={reminderWindowOptions}
            selectedId={reminders}
            onChange={setReminders}
          />
        </Panel>

        <div className="space-y-6">
          <Panel className="px-6 py-6 sm:px-7 sm:py-7">
            <div className="flex flex-wrap items-center gap-3">
              <Badge icon="spark">Live profile summary</Badge>
              <Badge icon="bell" tone="neutral">
                Reminder engine preview
              </Badge>
            </div>

            <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
              Your current GYMOS AI personality.
            </h3>
            <div className="mt-6 space-y-3">
              {summary.map((item) => (
                <div key={item.id} className="panel-muted rounded-[24px] px-4 py-4">
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.description}</p>
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
            emptyDescription="Once sleep, heart-rate, or recovery data is connected, this panel can immediately enrich the onboarding profile without breaking the flow."
          />
        </div>
      </motion.section>
    </motion.div>
  );
}
