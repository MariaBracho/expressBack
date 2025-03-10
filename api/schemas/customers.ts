import * as yup from 'yup';

const id = yup.number().min(1);
const firstName = yup.string().min(3).max(30);
const phone = yup.string().min(8).max(30);
const lastName = yup.string().min(3).max(30);

const getCustomerSchema = yup.object({
  id: id.required(),
});

const createCustomerSchema = yup.object({
  firstName: firstName.required(),
  phone: phone.required(),
  lastName: lastName.required(),
  userId: id.required(),
});

const updateCustomerSchema = yup.object({
  firstName,
  lastName,
  phone,
});

const deleteCustomerSchema = yup.object({
  id: id.required(),
});

export type CreateCustomer = yup.InferType<typeof createCustomerSchema>;
export type UpdateCustomer = yup.InferType<typeof updateCustomerSchema>;

export {
  deleteCustomerSchema,
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
