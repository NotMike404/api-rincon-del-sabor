import type { Request, Response } from 'express';
import { getAllProducts } from '../models/product.model.js';

export async function getMenu(req: Request, res: Response) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error al consultar menú:', error);

    res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}