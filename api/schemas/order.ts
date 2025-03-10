import * as yup from 'yup';

const id = yup.number().min(1);

const getOrderSchema = yup.object({
  id: id.required(),
});

const createOrderSchema = yup.object({
  customerId: id.required(),
});

const orderId = yup.string().required();

const addItemsSchema = yup.object({
  productId: id.required(),
  amout: yup.number().min(1).required(),
  orderId,
});

const updateOrderSchema = yup.object({
  customerId: id,
});

const deleteOrderSchema = yup.object({
  id: id.required(),
});

export type AddItems = yup.InferType<typeof addItemsSchema>;
export type CreateOrder = yup.InferType<typeof createOrderSchema>;
export type UpdateOrder = yup.InferType<typeof updateOrderSchema>;

export {
  deleteOrderSchema,
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemsSchema,
  orderId,
};
