import asyncHandler from '../utils/asyncHandler.js';
import {
  createDietPlan,
  getDietPlans,
} from '../services/dietService.js';

export const createDiet = asyncHandler(async (req, res) => {
  const diet = await createDietPlan(req.body);

  res.status(201).json({
    success: true,
    message: 'Diet created successfully.',
    data: diet,
  });
});

export const getDiets = asyncHandler(async (req, res) => {
  const diets = await getDietPlans(req.query);

  res.status(200).json({
    success: true,
    count: diets.length,
    data: diets,
  });
});
