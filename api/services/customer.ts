import { notFound, conflict } from '@hapi/boom';
import sequelize from '@/libs/sequelize';
import type { Customer } from '@/types/customer';
import type { CreateCustomer, UpdateCustomer } from '@/schemas/customers';
import { Model } from 'sequelize';

type CustomerModel = Model & Customer;

class CustomerService {
  customer: Customer[] = [];

  constructor() {
    this.customer = [];
  }

  async getAll() {
    return await sequelize.models.Customer.findAll();
  }

  async find(id: number) {
    const customer = (await sequelize.models.Customer.findByPk(
      id
    )) as CustomerModel;
    if (!customer) {
      throw notFound('Customer not found');
    }
    if (customer.isblocked) {
      throw conflict('Customer is blocked');
    }
    return customer;
  }

  async create(body: CreateCustomer) {
    return await sequelize.models.Customer.create(body);
  }

  async update(id: number, body: UpdateCustomer) {
    const customer = await this.find(id);
    return await customer.update(body, {
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    const customer = await this.find(id);
    await customer.destroy();
    return customer;
  }
}

export default CustomerService;
