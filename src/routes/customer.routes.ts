import { Router } from 'express';
import { validateCustomer } from '../middlewares/validate-customer.js';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer
} from '../controllers/customer.controller.js';

const router: Router = Router();

router.get('/customers', getCustomers);

router.get('/customers/:id', getCustomerById);

router.post('/customers', validateCustomer, createCustomer);

router.put('/customers/:id', validateCustomer, updateCustomer);

export default router;