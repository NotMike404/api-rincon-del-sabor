import { Router } from 'express';
import { getMenu } from '../controllers/product.controller.js';

const router = Router();

router.get('/menu', getMenu);

export default router;