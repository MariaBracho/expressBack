import Joi from 'joi';

const id = Joi.number().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: id.required(),
});

const orderId = Joi.string().required();

const addItemsSchema = Joi.object({
  productId: id.required(),
  amout: Joi.number().min(1).required(),
});

const updateOrderSchema = Joi.object({
  customerId: id,
});

const deleteOrderSchema = Joi.object({
  id: id.required(),
});

export {
  deleteOrderSchema,
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemsSchema,
  orderId,
};
