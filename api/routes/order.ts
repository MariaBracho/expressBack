import { Router } from 'express';
import validationHandler from '../middlewares/validator.handler';
import {
  addItemsSchema,
  createOrderSchema,
  deleteOrderSchema,
  getOrderSchema,
  updateOrderSchema,
} from '../schemas/order';
import OrderService from '../services/order.service';

const router = Router();
const service = new OrderService();

router.get(
  '/:id',
  validationHandler(getOrderSchema, 'params'),
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
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'Order created successfully',
        data: await service.create(body),
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:id/add-items',
  validationHandler(getOrderSchema, 'params'),
  validationHandler(addItemsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const { params } = req;

      res.status(201).json({
        message: 'Order added successfully',
        data: await service.addItem({ ...body, orderId: params.id }),
      });
    } catch (error) {
      next(error);
    }
  }
);

// edit product
router.patch(
  '/:id',
  validationHandler(getOrderSchema, 'params'),
  validationHandler(updateOrderSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await service.update(Number(id), body);
      res.json({
        message: 'Order updated successfully',
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
  validationHandler(deleteOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(Number(id));
      res.json({
        message: 'Order deleted successfully',
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
