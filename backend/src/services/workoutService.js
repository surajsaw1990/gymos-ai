import mongoose from 'mongoose';
import User from '../models/User.js';
import Workout from '../models/Workout.js';
import AppError from '../utils/AppError.js';

export async function createWorkoutPlan(payload) {
  const {
    userId,
    title,
    category,
    durationMinutes,
    caloriesBurned,
    scheduledFor,
    notes,
  } = payload;

  if (!userId || !title) {
    throw new AppError('userId and title are required.', 400);
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError('Invalid user id.', 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found for workout creation.', 404);
  }

  return Workout.create({
    user: userId,
    title: title.trim(),
    category,
    durationMinutes,
    caloriesBurned,
    scheduledFor,
    notes,
  });
}

export async function getWorkoutPlans(query = {}) {
  const filters = {};

  if (query.userId) {
    if (!mongoose.Types.ObjectId.isValid(query.userId)) {
      throw new AppError('Invalid user id.', 400);
    }

    filters.user = query.userId;
  }

  return Workout.find(filters).populate('user').sort({ createdAt: -1 });
}
