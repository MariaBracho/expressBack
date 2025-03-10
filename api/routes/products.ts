import { Router } from 'express';
import ProductService from '@/services/product';
import {
  deleteProductSchema,
  getProductsSchema,
  createProductSchema,
  updateProductSchema,
  getQueryProductsSchema,
} from '@/schemas/products';
import validationHandler from '@/middlewares/validator.handler';

const router = Router();
const propductService = new ProductService();

router.get(
  '/:id',
  validationHandler(getProductsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await propductService.find(Number(id));
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  validationHandler(getQueryProductsSchema, 'query'),
  async (req, res) => {
    const productsList = await propductService.getAll(req.query);
    res.status(200).json(productsList);
  }
);

router.post(
  '/',
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'Product created successfully',
        data: await propductService.create(body),
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getProductsSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await propductService.update(Number(id), body);
      res.json({
        message: 'Product updated successfully',
        data: product,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

router.delete(
  '/:id',
  validationHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await propductService.delete(Number(id));
      res.json({
        message: 'Product deleted successfully',
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
