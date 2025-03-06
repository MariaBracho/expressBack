import { Router } from 'express';
import validationHandler from '../middlewares/validator.handler';
import CategoryService from '../services/category.service';
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from '../schemas/category';

const router = Router();
const service = new CategoryService();
// get all categorys
// first params static then dynamic

// Si te preguntas cuántas funciones middleware puedes enviar como callback, la respuesta es: las que quieras. Esto siempre y cuando las separes con coma. Las puedes llamar si las definiste fuera, ejecutar o incluso llamar un array de funciones middlewares.

router.get(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const category = await service.find(Number(id));
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res) => {
  const categoryList = await service.getAll();
  res.status(200).json(categoryList);
});

// create category
router.post(
  '/',
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'category created successfully',
        data: await service.create(body),
      });
    } catch (error) {
      next(error);
    }
  }
);

// edit category
router.patch(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const category = await service.update(Number(id), body);
      res.json({
        message: 'category updated successfully',
        data: category,
        id,
      });
    } catch (error: any) {
      res.status(404).json({
        message: error.message,
      });
    }
  }
);

// delete category
router.delete(
  '/:id',
  validationHandler(deleteCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(Number(id));
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
