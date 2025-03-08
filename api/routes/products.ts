import { Router } from 'express';
import ProductService from '../services/product';
import {
  deleteProductSchema,
  getProductsSchema,
  createProductSchema,
  updateProductSchema,
  getQueryProductsSchema,
} from '../schemas/products';
import validationHandler from '../middlewares/validator.handler';

const router = Router();
const service = new ProductService();
// get all products
// first params static then dynamic

// Si te preguntas cuántas funciones middleware puedes enviar como callback, la respuesta es: las que quieras. Esto siempre y cuando las separes con coma. Las puedes llamar si las definiste fuera, ejecutar o incluso llamar un array de funciones middlewares.

router.get(
  '/:id',
  validationHandler(getProductsSchema, 'params'),
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

router.get(
  '/',
  validationHandler(getQueryProductsSchema, 'query'),
  async (req, res) => {
    const productsList = await service.getAll(req.query);
    res.status(200).json(productsList);
  }
);

// create product
router.post(
  '/',
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'Product created successfully',
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
  validationHandler(getProductsSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await service.update(Number(id), body);
      res.json({
        message: 'Product updated successfully',
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
  validationHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(Number(id));
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
