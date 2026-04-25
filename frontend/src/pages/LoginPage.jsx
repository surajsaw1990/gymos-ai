import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrandMark } from '@/components/BrandMark';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/ui/FormField';
import { Panel } from '@/components/ui/Panel';
import { StatePanel } from '@/components/ui/StatePanel';
import { BRAND_NAME, BRAND_SHORT } from '@/constants/brand';
import { useAppState } from '@/hooks/useAppState';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { fadeUp, staggerContainer } from '@/utils/motion';

function sanitizePhone(value) {
  return value.replace(/\D/g, '').slice(-10);
}

export default function LoginPage() {
  useDocumentTitle('Login');
  const navigate = useNavigate();
  const { state, dispatch } = useAppState();
  const [phoneNumber, setPhoneNumber] = useState(state.auth.phoneNumber || state.userProfile.phoneNumber || '');
  const [otpValue, setOtpValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isOtpStep = Boolean(state.auth.phoneNumber && state.auth.otpRequestedAt && !state.auth.isLoggedIn);
  const trainerPreview = useMemo(
    () => `${state.userProfile.trainerName} | ${state.userProfile.language} | ${state.userProfile.tone}`,
    [state.userProfile.language, state.userProfile.tone, state.userProfile.trainerName],
  );

  const requestOtp = () => {
    const cleanPhone = sanitizePhone(phoneNumber);

    if (cleanPhone.length < 10) {
      setErrorMessage('Enter a valid 10-digit phone number.');
      return;
    }

    setErrorMessage('');
    setOtpValue('');
    dispatch({
      type: 'REQUEST_LOGIN_OTP',
      payload: {
        phoneNumber: cleanPhone,
        otpCode: String(1000 + Math.floor(Math.random() * 9000)),
        requestedAt: new Date().toISOString(),
      },
    });
  };

  const verifyOtp = () => {
    if (otpValue.trim() !== state.auth.otpCode) {
      setErrorMessage('OTP did not match. Try the local demo code again.');
      return;
    }

    setErrorMessage('');
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        phoneNumber: state.auth.phoneNumber,
        verifiedAt: new Date().toISOString(),
      },
    });
    navigate(state.userProfile.savedAt ? '/' : '/onboarding');
  };

  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden px-3 py-3 sm:px-4 sm:py-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className="hero-orb absolute -left-20 top-10 h-72 w-72 rounded-full opacity-90" />
      <div className="hero-orb absolute right-0 top-1/4 h-80 w-80 rounded-full opacity-70" />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1180px] gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <motion.section className="space-y-4 sm:space-y-6" variants={fadeUp}>
          <Panel className="px-4 py-5 sm:px-7 sm:py-7">
            <div className="flex items-center gap-4">
              <BrandMark />
              <div>
                <p className="font-display text-sm font-semibold tracking-[0.24em] text-brand-300 uppercase">
                  {BRAND_SHORT}
                </p>
                <p className="mt-1 text-sm text-slate-400">{BRAND_NAME}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Badge icon="chat">AI trainer ready</Badge>
              <Badge icon="dumbbell" tone="neutral">
                Personalized workout flow
              </Badge>
              <Badge icon="leaf" tone="neutral">
                Budget-smart meals
              </Badge>
            </div>

            <h1 className="mt-5 font-display text-[2rem] leading-[1.02] font-semibold tracking-tight text-white sm:mt-8 sm:text-5xl">
              Personal coaching starts with a clean phone login.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base sm:leading-8">
              Enter your phone number, complete the local OTP step, and GYMOS AI will load your trainer identity, workout split, food preference, and coaching tone.
            </p>
          </Panel>

          <StatePanel
            title="Trainer preview"
            description="Your saved profile already shapes how the coach will talk, plan, and motivate."
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="panel-muted rounded-[22px] px-4 py-4">
                <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Trainer</p>
                <p className="mt-2 font-medium text-white">{state.userProfile.trainerName}</p>
              </div>
              <div className="panel-muted rounded-[22px] px-4 py-4">
                <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Profile</p>
                <p className="mt-2 font-medium text-white">{trainerPreview}</p>
              </div>
              <div className="panel-muted rounded-[22px] px-4 py-4">
                <p className="text-xs tracking-[0.22em] text-slate-500 uppercase">Goal</p>
                <p className="mt-2 font-medium text-white">{state.userProfile.goal.replace('_', ' ')}</p>
              </div>
            </div>
          </StatePanel>
        </motion.section>

        <motion.section variants={fadeUp}>
          <Panel className="px-4 py-5 sm:px-7 sm:py-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge icon="body">Phone login</Badge>
              <Badge icon="spark" tone="neutral">
                Mock OTP
              </Badge>
            </div>

            <h2 className="mt-5 font-display text-[1.7rem] leading-[1.04] font-semibold tracking-tight text-white sm:text-3xl">
              {isOtpStep ? 'Enter the coach code' : 'Continue with phone number'}
            </h2>
            <p className="mt-2.5 text-sm leading-6 text-slate-400 sm:leading-7">
              {isOtpStep
                ? 'This is a local-only flow for now, so the code stays inside the app.'
                : 'No paid SMS API is connected yet. The OTP is generated locally for a realistic first-run flow.'}
            </p>

            <div className="mt-5 space-y-4">
              <FormField
                label="Phone number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(sanitizePhone(event.target.value))}
                placeholder="9876543210"
                inputMode="numeric"
                maxLength={10}
                hint="Indian mobile number style input for the local auth simulation."
              />

              {isOtpStep ? (
                <div className="space-y-4">
                  <div className="panel-muted rounded-[22px] px-4 py-4">
                    <p className="text-xs tracking-[0.22em] text-brand-300 uppercase">Local demo OTP</p>
                    <p className="mt-2 font-display text-3xl font-semibold text-white">
                      {state.auth.otpCode}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Use this local code to simulate OTP verification without SMS.
                    </p>
                  </div>

                  <FormField
                    label="One-time password"
                    value={otpValue}
                    onChange={(event) => setOtpValue(event.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="Enter 4-digit code"
                    inputMode="numeric"
                    maxLength={4}
                  />
                </div>
              ) : null}

              {errorMessage ? (
                <div className="panel-muted rounded-[22px] px-4 py-3 text-sm leading-6 text-rose-200">
                  {errorMessage}
                </div>
              ) : null}

              <div className="flex flex-col gap-2.5 sm:flex-row">
                <Button className="sm:min-w-[168px]" onClick={isOtpStep ? verifyOtp : requestOtp}>
                  {isOtpStep ? 'Verify and enter app' : 'Send OTP'}
                </Button>
                {isOtpStep ? (
                  <Button className="sm:min-w-[136px]" variant="secondary" onClick={requestOtp}>
                    Resend code
                  </Button>
                ) : null}
              </div>
            </div>
          </Panel>
        </motion.section>
      </div>
    </motion.div>
  );
}
