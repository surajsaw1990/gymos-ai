import asyncHandler from '../utils/asyncHandler.js';
import {
  createWorkoutPlan,
  getWorkoutPlans,
} from '../services/workoutService.js';

export const createWorkout = asyncHandler(async (req, res) => {
  const workout = await createWorkoutPlan(req.body);

  res.status(201).json({
    success: true,
    message: 'Workout created successfully.',
    data: workout,
  });
});

export const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await getWorkoutPlans(req.query);

  res.status(200).json({
    success: true,
    count: workouts.length,
    data: workouts,
  });
});
