import Joi from 'joi';

const id = Joi.number().min(1);
const firstName = Joi.string().min(3).max(30);
const phone = Joi.string().min(8).max(30);
const lastName = Joi.string().min(3).max(30);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  phone: phone.required(),
  lastName: lastName.required(),
  userId: id.required(),
});

const updateCustomerSchema = Joi.object({
  firstName,
  lastName,
  phone,
});

const deleteCustomerSchema = Joi.object({
  id: id.required(),
});

export {
  deleteCustomerSchema,
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
