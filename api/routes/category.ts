import { Router } from 'express';
import validationHandler from '@/middlewares/validator.handler';
import CategoryService from '@/services/category.service';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '@/schemas/category';

const router = Router();
const categoryService = new CategoryService();

router.get(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await categoryService.find(Number(id));
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res) => {
  const categoryList = await categoryService.getAll();
  res.status(200).json(categoryList);
});

router.post(
  '/',
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'category created successfully',
        data: await categoryService.create(body),
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const category = await categoryService.update(Number(id), body);
      res.json({
        message: 'category updated successfully',
        data: category,
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
  validationHandler(deleteCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await categoryService.delete(Number(id));
      res.json({
        message: 'category deleted successfully',
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
