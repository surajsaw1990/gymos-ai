import { Router } from 'express';
import requireDatabaseConnection from '../middlewares/requireDatabaseConnection.js';
import dietRoutes from './dietRoutes.js';
import healthRoutes from './healthRoutes.js';
import userRoutes from './userRoutes.js';
import workoutRoutes from './workoutRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/users', requireDatabaseConnection, userRoutes);
router.use('/workouts', requireDatabaseConnection, workoutRoutes);
router.use('/diets', requireDatabaseConnection, dietRoutes);

export default router;
