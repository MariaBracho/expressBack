import { notFound } from '@hapi/boom';
import sequelize from '@/libs/sequelize';
import type { Customer } from '@/types/customer';
import type { AddItems, CreateOrder, UpdateOrder } from '@/schemas/order';

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
    const oreder = await sequelize.models.Order.findByPk(id, {
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

  async create(body: CreateOrder) {
    const order = await sequelize.models.Order.create(body, {
      include: ['customer'],
    });
    return order;
  }

  async addItem(data: AddItems) {
    await this.find(Number(data?.orderId));
    const newItem = await sequelize.models.OrderProduct.create(data);
    return newItem;
  }

  async update(id: number, body: UpdateOrder) {
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
    await order.destroy();

    return order;
  }
}

export default OrderService;
