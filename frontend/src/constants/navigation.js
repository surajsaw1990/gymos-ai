export const primaryNavigation = [
  {
    label: 'Dashboard',
    to: '/',
    description: 'Daily command center',
    icon: 'dashboard',
  },
  {
    label: 'Workout',
    to: '/workout',
    description: 'Live gym session shell',
    icon: 'dumbbell',
  },
  {
    label: 'Diet',
    to: '/diet',
    description: 'Budget-smart nutrition',
    icon: 'leaf',
  },
  {
    label: 'Analytics',
    to: '/analytics',
    description: 'Progress and prediction',
    icon: 'chart',
  },
  {
    label: 'Profile',
    to: '/profile',
    description: 'Identity and preferences',
    icon: 'profile',
  },
];

export const utilityNavigation = [
  {
    label: 'Onboarding',
    to: '/onboarding',
    description: 'Coach setup and identity',
    icon: 'spark',
  },
];

export const allNavigationItems = [...primaryNavigation, ...utilityNavigation];
