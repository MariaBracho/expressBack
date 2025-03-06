import { notFound, conflict } from '@hapi/boom';
import type { Customer } from '../types/customer';

import sequelize from './../libs/sequelize';

class CustomerService {
  customer: Customer[] = [];

  constructor() {
    this.customer = [];
  }

  async getAll() {
    const result = await sequelize.models.Customer.findAll();
    return result;
  }

  async find(id: number) {
    const product: any = await sequelize.models.Customer.findByPk(id);
    if (!product) {
      throw notFound('Customer not found');
    }
    if (product.isblocked) {
      throw conflict('Customer is blocked');
    }
    return product;
  }

  async create(body: any) {
    const product = await sequelize.models.Customer.create(body);
    return product;
  }

  async update(id: number, body: Customer) {
    const customer = await this.find(id);
    const result = await customer.update(body, {
      where: {
        id,
      },
    });

    return result;
  }

  async delete(id: number) {
    const customer = await this.find(id);
    await customer.destroy({
      where: {
        id,
      },
    });
    return customer;
  }
}

export default CustomerService;
