function IconWrapper({ children, className = 'h-5 w-5' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function DashboardIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="4" width="7" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="17" width="7" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function SparkIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path
        d="M12 3.75L13.93 9.07L19.25 11L13.93 12.93L12 18.25L10.07 12.93L4.75 11L10.07 9.07L12 3.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </IconWrapper>
  );
}

export function DumbbellIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path d="M7 9V15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M17 9V15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M4.5 8V16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M19.5 8V16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M7 12H17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function LeafIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path
        d="M19 5C12.5 5 8 8.75 8 15.25C8 17.88 9.88 20 12.5 20C18 20 20 13 19 5Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M6 19C6.8 14.4 11.2 10.8 16 9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function ChartIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path d="M5 19V10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M12 19V5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M19 19V13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M4 19H20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function PulseIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path
        d="M4 12H7.5L9.7 8L13 16L15.5 10.5L16.7 12H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </IconWrapper>
  );
}

export function ChatIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path
        d="M7 18.5L4 20V7.5C4 6.67 4.67 6 5.5 6H18.5C19.33 6 20 6.67 20 7.5V16.5C20 17.33 19.33 18 18.5 18H7Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M8 10.5H16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M8 13.5H13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function CameraIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <rect x="4" y="7" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 7L10.25 5.5H13.75L15 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function TargetIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2V5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M19 12H22" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function BodyIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path
        d="M12 4C10.62 4 9.5 5.12 9.5 6.5S10.62 9 12 9S14.5 7.88 14.5 6.5S13.38 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 20L10 14.75L8.25 11.25C7.88 10.51 8.42 9.65 9.25 9.65H14.75C15.58 9.65 16.12 10.51 15.75 11.25L14 14.75L15 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </IconWrapper>
  );
}

export function BellIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path
        d="M8.5 17H15.5C16.33 17 17 16.33 17 15.5V11.5C17 8.74 14.76 6.5 12 6.5C9.24 6.5 7 8.74 7 11.5V15.5C7 16.33 7.67 17 8.5 17Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M10 19C10.42 19.62 11.16 20 12 20C12.84 20 13.58 19.62 14 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M12 4V6.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function StreakIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path
        d="M13.5 3.5C9 6 8 10.5 8 13C8 16.87 10.69 19.5 14.5 19.5C17.54 19.5 20 17.04 20 14C20 10.74 17.97 8.93 16.75 7.94C15.92 7.27 15.5 6.28 15.5 5.22V4.5C15.5 4.08 15.11 3.82 14.75 3.98L13.5 4.5V3.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path d="M8 17.5C5.24 16.83 4 14.63 4 12.5C4 10.46 5.17 8.53 7 7.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function CalendarIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <rect x="4" y="6" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 4V8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M16 4V8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M4 10.5H20" stroke="currentColor" strokeWidth="1.7" />
    </IconWrapper>
  );
}

export function BoltIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path d="M13 3L6.75 12H11L10 21L17.25 11.75H13.25L13 3Z" fill="currentColor" />
    </IconWrapper>
  );
}

export function ArrowRightIcon({ className }) {
  return (
    <IconWrapper className={className}>
      <path d="M5 12H19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M13 6L19 12L13 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </IconWrapper>
  );
}

const iconMap = {
  analytics: ChartIcon,
  bell: BellIcon,
  body: BodyIcon,
  bolt: BoltIcon,
  camera: CameraIcon,
  calendar: CalendarIcon,
  chart: ChartIcon,
  chat: ChatIcon,
  dashboard: DashboardIcon,
  dumbbell: DumbbellIcon,
  leaf: LeafIcon,
  pulse: PulseIcon,
  profile: BodyIcon,
  spark: SparkIcon,
  streak: StreakIcon,
  target: TargetIcon,
};

export function AppIcon({ name, className }) {
  const Icon = iconMap[name] || SparkIcon;

  return <Icon className={className} />;
}
