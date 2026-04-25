import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import DietPage from '@/pages/DietPage';
import LoginPage from '@/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import OnboardingPage from '@/pages/OnboardingPage';
import ProfilePage from '@/pages/ProfilePage';
import WorkoutPage from '@/pages/WorkoutPage';
import { useAppState } from '@/hooks/useAppState';

function RequireAuth() {
  const { state } = useAppState();

  if (!state.auth.isLoggedIn) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
}

function PublicOnly() {
  const { state } = useAppState();

  if (state.auth.isLoggedIn) {
    return <Navigate replace to={state.userProfile.savedAt ? '/' : '/onboarding'} />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    element: <PublicOnly />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
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
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
