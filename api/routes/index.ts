import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import productsRouter from './products';
import usersRouter from './users';
import customerRouter from './customer';
import categoryRouter from './category';
import orderRouter from './order';
import hello from './hello';
import options from '@/utils/swaggerOptions';
import type core from 'express';

export default function routerApi(app: core.Express) {
  const router = express.Router();
  const specs = swaggerJsdoc(options);

  // hello
  app.use('/', hello);

  // Swagger
  app.use('/api-docs', serve, setup(specs, { explorer: true }));

  // api/v1
  app.use('/api/v1', router);

  router.use('/', hello);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customer', customerRouter);
  router.use('/category', categoryRouter);
  router.use('/order', orderRouter);
}
