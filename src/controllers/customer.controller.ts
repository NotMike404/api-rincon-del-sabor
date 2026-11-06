import type { Request, Response } from 'express';
import * as customerModel from '../models/customer.model.js';

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await customerModel.findAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID debe ser numérico' });
    }

    const customer = await customerModel.findCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: `Cliente con ID ${id} no encontrado` });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente', error });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body; // 👈 Esto activa la cajita en Swagger
    const newCustomer = await customerModel.createCustomerDB({ name, email, phone });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'El ID debe ser numérico' });
    }

    const { name, email, phone } = req.body; // 👈 Esto activa la cajita en Swagger
    const updatedCustomer = await customerModel.updateCustomerDB(id, { name, email, phone });
    if (!updatedCustomer) {
      return res.status(404).json({ message: `Cliente con ID ${id} no encontrado` });
    }

    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cliente', error });
  }
};