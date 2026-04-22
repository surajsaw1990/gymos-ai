import { createBrowserRouter } from 'react-router-dom';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import DietPage from '@/pages/DietPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OnboardingPage from '@/pages/OnboardingPage';
import ProfilePage from '@/pages/ProfilePage';
import WorkoutPage from '@/pages/WorkoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
      },
      {
        path: 'workout',
        element: <WorkoutPage />,
      },
      {
        path: 'diet',
        element: <DietPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
