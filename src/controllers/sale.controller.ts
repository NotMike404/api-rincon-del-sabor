import type { Request, Response } from 'express';
import * as saleModel from '../models/sale.model.js';

// 1. Obtener todas las ventas
export const getSales = async (_req: Request, res: Response) => {
  try {
    const sales = await saleModel.findAllSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ventas', error });
  }
};

// 2. Obtener una sola venta por su ID con manejo de 404
export const getSaleById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID debe ser numérico' });
    }

    const sale = await saleModel.findSaleById(id);
    if (!sale) {
      return res.status(404).json({ message: `Venta con ID ${id} no encontrada` });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la venta', error });
  }
};

// 3. Registrar una nueva venta
export const createSale = async (req: Request, res: Response) => {
  try {
    const { customer_id, total } = req.body;

    if (!customer_id || total === undefined) {
      return res.status(400).json({ message: 'customer_id y total son requeridos' });
    }

    const newSale = await saleModel.createSaleDB(Number(customer_id), Number(total));
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la venta', error });
  }
};