import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useWorkout } from '@/hooks/useWorkout';
import { cn } from '@/utils/cn';

export function ChatPanel() {
  const [draft, setDraft] = useState('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollContainerRef = useRef(null);
  const {
    chatMessages,
    currentExercise,
    isChatPending,
    isSessionActive,
    isSessionComplete,
    trainerName,
    userName,
    session,
    sendChatMessage,
    toggleChatMode,
  } = useWorkout();

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatMessages, isChatPending]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) {
      return undefined;
    }

    const viewport = window.visualViewport;

    const updateKeyboardOffset = () => {
      const nextOffset = Math.max(
        0,
        Math.round(window.innerHeight - viewport.height - viewport.offsetTop),
      );
      setKeyboardOffset(nextOffset);
    };

    updateKeyboardOffset();
    viewport.addEventListener('resize', updateKeyboardOffset);
    viewport.addEventListener('scroll', updateKeyboardOffset);

    return () => {
      viewport.removeEventListener('resize', updateKeyboardOffset);
      viewport.removeEventListener('scroll', updateKeyboardOffset);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!draft.trim() || isChatPending) {
      return;
    }

    sendChatMessage(draft);
    setDraft('');
  };

  return (
    <AnimatePresence>
      <motion.aside
        className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+6.7rem)] z-50 md:inset-x-auto md:right-6 md:bottom-6 md:w-[420px]"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          bottom:
            keyboardOffset > 0
              ? `calc(env(safe-area-inset-bottom) + ${keyboardOffset + 16}px)`
              : undefined,
        }}
      >
        <div className="panel-surface premium-border ambient-frame overflow-hidden rounded-[30px] border border-white/10 shadow-[0_22px_80px_rgba(0,0,0,0.42)]">
          <div className="px-4 py-4 sm:px-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.26em] text-brand-300 uppercase">
                  Workout Chat Mode
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white">
                  {trainerName} is live
                </h3>
                <p className="mt-1 text-xs text-slate-500">{userName}&apos;s personal trainer chat</p>
              </div>
              <button
                type="button"
                className="panel-muted shrink-0 rounded-full px-3 py-2 text-xs font-semibold tracking-[0.2em] text-slate-300 uppercase hover:text-white"
                onClick={toggleChatMode}
              >
                Close
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge icon="chat" tone="brand">
                Chat open
              </Badge>
              <Badge icon="dumbbell" tone="neutral">
                {isSessionComplete ? 'Session summary' : currentExercise.name}
              </Badge>
              <Badge icon="pulse" tone="mint">
                {isSessionActive ? 'Live session' : 'Coach standby'}
              </Badge>
            </div>
          </div>

          <div className="soft-divider" />

          <div
            ref={scrollContainerRef}
            className="max-h-[min(46dvh,22rem)] space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:max-h-[28rem] sm:px-5"
          >
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[88%] rounded-[24px] px-4 py-3 text-sm leading-6 sm:max-w-[82%]',
                    message.role === 'user'
                      ? 'border border-brand-400/18 bg-brand-400/12 text-white'
                      : 'panel-muted text-slate-300',
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isChatPending ? (
              <div className="flex justify-start">
                <div className="panel-muted flex items-center gap-2 rounded-[24px] px-4 py-3 text-sm text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-brand-300 animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-brand-300 animate-pulse [animation-delay:120ms]" />
                  <span className="h-2 w-2 rounded-full bg-brand-300 animate-pulse [animation-delay:240ms]" />
                  <span className="ml-1 text-slate-400">Coach is thinking</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="soft-divider" />

          <form className="space-y-3 px-4 py-4 sm:px-5" onSubmit={handleSubmit}>
            <div className="panel-muted rounded-[24px] px-4 py-3">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={
                  isSessionComplete
                    ? 'Ask for recovery or tomorrow’s plan'
                    : `Ask ${trainerName} about ${currentExercise.name.toLowerCase()}`
                }
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs leading-5 text-slate-500">
                {session.stateLabel}. Messages stay local for now.
              </p>
              <Button loading={isChatPending} type="submit">
                Send
              </Button>
            </div>
          </form>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
