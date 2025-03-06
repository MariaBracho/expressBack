import Joi from 'joi';

const id = Joi.number().min(1);
const name = Joi.string().min(3).max(30);
const price = Joi.number().min(5);
const image = Joi.string().uri();
const isblocked = Joi.boolean();
const createdAt = Joi.date();
const categoryId = Joi.number().min(1);

const getProductsSchema = Joi.object({
  id: id.required(),
});

const getQueryProductsSchema = Joi.object({
  limit: Joi.number().min(1),
  offset: Joi.number().min(0),
  price,
  price_max: Joi.number(),
  price_min: Joi.number().when('price_max', {
    is: Joi.exist(),
    then: Joi.number().required(),
  }),
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image,
  isblocked,
  categoryId,
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  isblocked,
  createdAt,
  categoryId,
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

export {
  deleteProductSchema,
  getProductsSchema,
  createProductSchema,
  updateProductSchema,
  getQueryProductsSchema,
};
