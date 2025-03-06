import { Router } from 'express';
import CustomerService from '../services/customer';

import {
  deleteCustomerSchema,
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} from '../schemas/customers';

import validationHandler from '../middlewares/validator.handler';

const router = Router();
const service = new CustomerService();

router.get(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.find(Number(id));
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res) => {
  const productsList = await service.getAll();
  res.status(200).json(productsList);
});

// create product
router.post(
  '/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'Customer created successfully',
        data: await service.create(body),
      });
    } catch (error) {
      next(error);
    }
  }
);

// edit product
router.patch(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await service.update(Number(id), body);
      res.json({
        message: 'Customer updated successfully',
        data: product,
        id,
      });
    } catch (error: any) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

// delete product
router.delete(
  '/:id',
  validationHandler(deleteCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(Number(id));
      res.json({
        message: 'Customer deleted successfully',
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
