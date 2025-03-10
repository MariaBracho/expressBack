import * as yup from 'yup';

const id = yup.number().min(1);
const name = yup.string().min(3).max(30);
const price = yup.number().min(5);
const image = yup.string().url();
const isblocked = yup.boolean();
const createdAt = yup.date();
const categoryId = yup.number().min(1);

const getProductsSchema = yup.object({
  id: id.required(),
});

const getQueryProductsSchema = yup.object({
  limit: yup.number().min(1),
  offset: yup.number().min(0),
  price,
  price_max: yup.number(),
  price_min: yup.number().when('price_max', {
    is: (price_max: number) => Boolean(price_max),
    then: (schema) => schema.required(),
  }),
});

const createProductSchema = yup.object({
  name: name.required(),
  price: price.required(),
  image,
  isblocked,
  categoryId,
});

const updateProductSchema = yup.object({
  name,
  price,
  image,
  isblocked,
  createdAt,
  categoryId,
});

const deleteProductSchema = yup.object({
  id: id.required(),
});

export type CreateProduct = yup.InferType<typeof createProductSchema>;
export type UpdateProduct = yup.InferType<typeof updateProductSchema>;
export type GetProducts = yup.InferType<typeof getQueryProductsSchema>;

export {
  deleteProductSchema,
  getProductsSchema,
  createProductSchema,
  updateProductSchema,
  getQueryProductsSchema,
};
