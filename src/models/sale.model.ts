import pool from '../config/db.js';

// 1. Obtener todas las ventas uniendo la tabla de clientes (INNER JOIN)
export const findAllSales = async () => {
  const query = `
    SELECT 
      sales.id,
      sales.customer_id,
      customers.name AS customer_name,
      sales.total
    FROM sales
    INNER JOIN customers ON sales.customer_id = customers.id
    ORDER BY sales.id ASC;
  `;
  const result = await pool.query(query);
  return result.rows;
};

// 2. Obtener una sola venta por su ID
export const findSaleById = async (id: number) => {
  const query = `
    SELECT 
      sales.id,
      sales.customer_id,
      customers.name AS customer_name,
      sales.total
    FROM sales
    INNER JOIN customers ON sales.customer_id = customers.id
    WHERE sales.id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

// 3. Crear una venta básica en la base de datos
export const createSaleDB = async (customerId: number, total: number) => {
  const query = `
    INSERT INTO sales (customer_id, total)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await pool.query(query, [customerId, total]);
  return result.rows[0];
};