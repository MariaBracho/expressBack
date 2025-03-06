import { notFound } from '@hapi/boom';
import type { Customer } from '../types/customer';

import sequelize from './../libs/sequelize';

class OrderService {
  order: Customer[] = [];

  constructor() {
    this.order = [];
  }

  async getAll() {
    const result = await sequelize.models.Order.findAll({
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    return result;
  }

  async find(id: number) {
    const oreder: any = await sequelize.models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!oreder) {
      throw notFound('Order not found');
    }
    return oreder;
  }

  async create(body: any) {
    const order = await sequelize.models.Order.create(body, {
      include: ['customer'],
    });
    return order;
  }

  async addItem(data: any) {
    await this.find(data.orderId);
    const newItem = await sequelize.models.OrderProduct.create(data);
    return newItem;
  }

  async update(id: number, body: Customer) {
    const order = await this.find(id);
    const result = await order.update(body, {
      where: {
        id,
      },
    });

    return result;
  }

  async delete(id: number) {
    const order = await this.find(id);
    await order.destroy({
      where: {
        id,
      },
    });
    return order;
  }
}

export default OrderService;
