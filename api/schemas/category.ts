import Joi from 'joi';

const id = Joi.number().min(1);
const name = Joi.string().min(3).max(30);

const getCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: name.required(),
  description: Joi.string(),
});

const updateCategorySchema = Joi.object({
  name,
  description: Joi.string(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

export {
  deleteCategorySchema,
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
