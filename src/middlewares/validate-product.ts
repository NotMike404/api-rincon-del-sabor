import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),

  description: z.string().min(1, 'La descripción es obligatoria'),

  price: z.number().positive('El precio debe ser mayor a cero'),

  stock: z.number().int().min(0, 'El stock debe ser mayor o igual a 0'),
});

export function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  next();
}