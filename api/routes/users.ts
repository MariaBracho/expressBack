import { Router } from 'express';
import UserService from '../services/users.service';
import {
  deleteUserSchema,
  getUsersSchema,
  createUserSchema,
  updateUserSchema,
} from '../schemas/users';
import validationHandler from '../middlewares/validator.handler';

const router = Router();
const service = new UserService();
// get all Users
// first params static then dynamic

// Si te preguntas cuántas funciones middleware puedes enviar como callback, la respuesta es: las que quieras. Esto siempre y cuando las separes con coma. Las puedes llamar si las definiste fuera, ejecutar o incluso llamar un array de funciones middlewares.

router.get(
  '/:id',
  validationHandler(getUsersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const User = await service.find(Number(id));
      res.status(200).json(User);
    } catch (error: any) {
      next(error);
    }
  }
);

router.get('/', async (req, res) => {
  const UsersList = await service.getAll();
  res.status(200).json(UsersList);
});

// create User
router.post(
  '/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'User created successfully',
        data: await service.create(body),
      });
    } catch (error: any) {
      next(error);
    }
  }
);

// edit User
router.patch(
  '/:id',
  validationHandler(getUsersSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const User = await service.update(Number(id), body);
      res.json({
        message: 'User updated successfully',
        data: User,
        id,
      });
    } catch (error: any) {
      res.status(404).json({
        message: error?.message,
      });
    }
  }
);

// delete User
router.delete(
  '/:id',
  validationHandler(deleteUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await service.delete(Number(id));
      res.json({
        message: 'User deleted successfully',
        data: message,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
