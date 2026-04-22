import asyncHandler from '../utils/asyncHandler.js';
import {
  createUserProfile,
  getUserProfileById,
} from '../services/userService.js';

export const registerUser = asyncHandler(async (req, res) => {
  const user = await createUserProfile(req.body);

  res.status(201).json({
    success: true,
    message: 'User registered successfully.',
    data: user,
  });
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await getUserProfileById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
