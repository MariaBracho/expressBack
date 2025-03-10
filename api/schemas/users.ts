import * as yup from 'yup';

const id = yup.number().min(1);
const name = yup.string().min(3).max(30);
const email = yup.string().email();
const password = yup.string().min(8).max(30);
const role = yup.string();

const getUsersSchema = yup.object({
  id: id.required(),
});

const createUserSchema = yup.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = yup.object({
  name,
  email,
  password,
  role,
});

const deleteUserSchema = yup.object({
  id: id.required(),
});

export type CreateUser = yup.InferType<typeof createUserSchema>;
export type UpdateUser = yup.InferType<typeof updateUserSchema>;

export { deleteUserSchema, getUsersSchema, createUserSchema, updateUserSchema };
