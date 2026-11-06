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
export const getMenu = async (req: Request, res: Response) => {
  try {
    // 1. Convertimos los textos de la URL (req.query) a números
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

    // 2. Le pedimos los productos al modelo pasándole los filtros
   const products = await getAllProducts( maxPrice, page, limit );

    // 3. Respondemos al usuario con la lista en formato JSON
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

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