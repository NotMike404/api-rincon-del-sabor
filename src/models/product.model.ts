import pool from '../config/db.js';

export async function getAllProducts() {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
}

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