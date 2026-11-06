import pool from '../config/db.js';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone?: string;
}

// 1. Funciones para buscar en la base de datos de clientes
export const findAllCustomers = async (): Promise<Customer[]> => {
  const query = 'SELECT * FROM customers ORDER BY id ASC;';
  const result = await pool.query(query);
  return result.rows;
};

export const findCustomerById = async (id: number): Promise<Customer | null> => {
  const query = 'SELECT * FROM customers WHERE id = $1;';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
};

// 2. Funciones para crear clientes en la base de datos
export const createCustomerDB = async (customer: Customer): Promise<Customer> => {
  const { name, email, phone } = customer;
  const query = `
    INSERT INTO customers (name, email, phone)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [name, email, phone]);
  return result.rows[0];
};
// 3. Función para actualizar un cliente existente en la base de datos
export const updateCustomerDB = async (id: number, customer: Customer): Promise<Customer | null> => {
  const { name, email, phone } = customer;
  const query = `
    UPDATE customers
    SET name = $1, email = $2, phone = $3
    WHERE id = $4
    RETURNING *;
  `;
  const result = await pool.query(query, [name, email, phone, id]);
  return result.rows[0] || null;
};