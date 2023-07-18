import Joi from "joi";

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().min(5);
const image = Joi.string().uri();
const isBlocked = Joi.boolean();

const getProductsSchema = Joi.object({
  id: id.required()
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlocked
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  isBlocked
});

const deleteProductSchema = Joi.object({
  id: id.required()
});

export {
  deleteProductSchema,
  getProductsSchema,
  createProductSchema,
  updateProductSchema
};
