import type { Request, Response } from 'express';

import {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct
} from '../models/product.model.js';

/*
  #swagger.tags = ['Products']
  #swagger.summary = 'Obtener todos los productos'
*/
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

/*
  #swagger.tags = ['Products']
  #swagger.summary = 'Obtener producto por ID'
*/
export async function getProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado',
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

/*
  #swagger.tags = ['Products']
  #swagger.summary = 'Crear producto'
*/
export async function createProduct(req: Request, res: Response) {
  try {
    const { name, stock, description, price } = req.body;

    const product = await insertProduct(
      name,
      stock,
      description,
      price
    );

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

/*
  #swagger.tags = ['Products']
  #swagger.summary = 'Actualizar producto'
*/
export async function updateProductController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    const { name, stock, description, price } = req.body;

    const product = await updateProduct(
      id,
      name,
      stock,
      description,
      price
    );

    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado',
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}