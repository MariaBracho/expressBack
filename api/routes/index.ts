import productsRouter from './products';
import taskRouter from './task';
import usersRouter from './users';
import customerRouter from './customer';
import categoryRouter from './category';
import orderRouter from './order';
import hello from './hello';
import express from 'express';
import type core from 'express';

export default function routerApi(app: core.Express) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/', hello);
  router.use('/products', productsRouter);
  router.use('/task', taskRouter);
  router.use('/users', usersRouter);
  router.use('/customer', customerRouter);
  router.use('/category', categoryRouter);
  router.use('/order', orderRouter);
}
