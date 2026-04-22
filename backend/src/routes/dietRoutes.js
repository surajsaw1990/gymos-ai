import { Router } from 'express';
import { createDiet, getDiets } from '../controllers/dietController.js';

const router = Router();

router.post('/', createDiet);
router.get('/', getDiets);

export default router;
