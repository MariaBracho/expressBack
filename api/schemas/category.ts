import * as yup from 'yup';

const id = yup.number().min(1);
const name = yup.string().min(3).max(30);

const getCategorySchema = yup.object({
  id: id.required(),
});

const createCategorySchema = yup.object({
  name: name.required(),
  description: yup.string(),
});

const updateCategorySchema = yup.object({
  name,
  description: yup.string(),
});

const deleteCategorySchema = yup.object({
  id: id.required(),
});

export type CreateCategory = yup.InferType<typeof createCategorySchema>;
export type UpdateCategory = yup.InferType<typeof updateCategorySchema>;

export {
  deleteCategorySchema,
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
