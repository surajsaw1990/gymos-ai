import { Router } from 'express';
import {
  createWorkout,
  getWorkouts,
} from '../controllers/workoutController.js';

const router = Router();

router.post('/', createWorkout);
router.get('/', getWorkouts);

export default router;
