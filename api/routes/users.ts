import { Router } from 'express';
import UserService from '@/services/users.service';
import {
  deleteUserSchema,
  getUsersSchema,
  createUserSchema,
  updateUserSchema,
} from '@/schemas/users';
import validationHandler from '@/middlewares/validator.handler';

const router = Router();
const userService = new UserService();

router.get(
  '/:id',
  validationHandler(getUsersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const User = await userService.find(Number(id));
      res.status(200).json(User);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res) => {
  const UsersList = await userService.getAll();
  res.status(200).json(UsersList);
});

router.post(
  '/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      res.status(201).json({
        message: 'User created successfully',
        data: await userService.create(body),
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getUsersSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const User = await userService.update(Number(id), body);
      res.json({
        message: 'User updated successfully',
        data: User,
        id,
      });
    } catch (error) {
      res.status(404).json({
        message: error?.message,
      });
    }
  }
);

router.delete(
  '/:id',
  validationHandler(deleteUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const message = await userService.delete(Number(id));
      res.json({
        message: 'User deleted successfully',
        data: message,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
