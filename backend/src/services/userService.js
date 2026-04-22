import mongoose from 'mongoose';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export async function createUserProfile(payload) {
  const { name, email, fitnessGoal, experienceLevel } = payload;

  if (!name || !email) {
    throw new AppError('Name and email are required.', 400);
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    throw new AppError('A user with this email already exists.', 409);
  }

  return User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    fitnessGoal,
    experienceLevel,
  });
}

export async function getUserProfileById(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError('Invalid user id.', 400);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User not found.', 404);
  }

  return user;
}
