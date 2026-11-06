import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';

// Esquema de validación del cliente
export const customerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Debe ser un correo electrónico válido'),
  phone: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos').optional()
});

// Middleware de validación
export const validateCustomer = (req: Request, res: Response, next: NextFunction) => {
  const result = customerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Error de validación',
      details: result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  req.body = result.data;
  next();
};