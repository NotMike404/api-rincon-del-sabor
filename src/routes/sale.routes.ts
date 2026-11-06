import { Router } from 'express';
import { getSales, getSaleById, createSale } from '../controllers/sale.controller.js';

const router: Router = Router();

// 1. Rutas para consultar ventas
router.get('/sales', getSales);
router.get('/sales/:id', getSaleById);

// 2. Ruta para registrar una nueva venta
router.post('/sales', createSale);

export default router;