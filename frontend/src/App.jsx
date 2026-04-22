import { MotionConfig } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

export default function App() {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
