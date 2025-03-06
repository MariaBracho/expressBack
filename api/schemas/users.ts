import Joi from "joi";

const id = Joi.number().min(1);
const name = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8).max(30);
const role = Joi.string()

const getUsersSchema = Joi.object({
  id: id.required()
});

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = Joi.object({
  name,
  email,
  password,
  role
});

const deleteUserSchema = Joi.object({
  id: id.required()
});

export { deleteUserSchema, getUsersSchema, createUserSchema, updateUserSchema };
