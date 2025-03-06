import { notFound, conflict } from '@hapi/boom';
import type { Product } from '../types/products';
import { Op } from 'sequelize';

import sequelize from './../libs/sequelize';

class ProductService {
  product: Product[] = [];

  constructor() {
    this.product = [];
  }

  async getAll(query: any) {
    const options: {
      limit?: number;
      offset?: number;
      include: string[];
      price?: number;
      price_max?: number;
      price_min?: number;
      where: Record<string, any>;
    } = {
      include: ['category'],
      where: {},
    };

    if (query.limit && query.offset) {
      options.limit = query.limit;
      options.offset = query.offset;
    }

    if (query.price) {
      options.where.price = query.price;
    }

    if (query.price_min && !query.price_max) {
      options.where.price = {
        [Op.gte]: query.price_min,
      };
    }

    if (query.price_max && query.price_min) {
      options.where.price = {
        [Op.gte]: query.price_min,
        [Op.lte]: query.price_max,
      };
    }

    const result = await sequelize.models.Product.findAll(options);

    return result;
  }

  async find(id: number) {
    const product: any = await sequelize.models.Product.findByPk(id);
    if (!product) {
      throw notFound('Product not found');
    }
    if (product.isblocked) {
      throw conflict('Product is blocked');
    }
    return product;
  }

  async create(body: any) {
    const product = await sequelize.models.Product.create(body);
    return product;
  }

  async update(id: number, body: Product) {
    const product = await this.find(id);
    const result = await product.update(body, {
      where: {
        id,
      },
    });

    return result;
  }

  async delete(id: number) {
    const product = await this.find(id);
    await product.destroy({
      where: {
        id,
      },
    });
    return product;
  }
}

export default ProductService;
