import pool from '../config/db.js';

export const getAllProducts = async (maxPrice?: number, page: number = 1, limit: number = 10) => {
  const values: any[] = [];
  let query = 'SELECT * FROM products';

  // 1. Si enviaron filtro de precio máximo:
  if (maxPrice !== undefined) {
    values.push(maxPrice);
    query += ` WHERE price <= $${values.length}`;
  }

  // Ordenamos siempre por ID
  query += ' ORDER BY id ASC';

  // 2. Calculamos el OFFSET para la paginación: (página - 1) * límite
  const offset = (page - 1) * limit;

  values.push(limit);
  query += ` LIMIT $${values.length}`;

  values.push(offset);
  query += ` OFFSET $${values.length}`;

  // Ejecutamos la consulta con parámetros seguros
  const result = await pool.query(query, values);
  return result.rows;
};

export async function getProductById(id: number) {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );

  return result.rows[0] || null;
}

export async function insertProduct(
  name: string,
  stock: number,
  description: string,
  price: number
) {
  const result = await pool.query(
    `INSERT INTO products (name, stock, description, price)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, stock, description, price]
  );

  return result.rows[0];
}

export async function updateProduct(
  id: number,
  name: string,
  stock: number,
  description: string,
  price: number
) {
  const result = await pool.query(
    `UPDATE products
     SET name = $1,
          stock = $2,
         description = $3,
         price = $4
     WHERE id = $5
     RETURNING *`,
    [name, stock, description, price, id]
  );

  return result.rows[0] || null;
}