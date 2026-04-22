import mongoose from 'mongoose';
import Diet from '../models/Diet.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export async function createDietPlan(payload) {
  const {
    userId,
    title,
    goal,
    calories,
    protein,
    carbs,
    fats,
    meals,
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
    throw new AppError('User not found for diet creation.', 404);
  }

  return Diet.create({
    user: userId,
    title: title.trim(),
    goal,
    calories,
    protein,
    carbs,
    fats,
    meals,
    notes,
  });
}

export async function getDietPlans(query = {}) {
  const filters = {};

  if (query.userId) {
    if (!mongoose.Types.ObjectId.isValid(query.userId)) {
      throw new AppError('Invalid user id.', 400);
    }

    filters.user = query.userId;
  }

  return Diet.find(filters).populate('user').sort({ createdAt: -1 });
}
