import { FindOptions, Model, Op } from 'sequelize';
import { notFound, conflict } from '@hapi/boom';
import sequelize from '@/libs/sequelize';
import type { Product } from '@/types/products';

interface ProductModel extends Model {
  isblocked: boolean;
}
import type {
  CreateProduct,
  GetProducts,
  UpdateProduct,
} from '@/schemas/products';

class ProductService {
  product: Product[] = [];

  constructor() {
    this.product = [];
  }

  async getAll(query: GetProducts) {
    const options: FindOptions & {
      where: Record<string, number | string>;
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
    const product = (await sequelize.models.Product.findByPk(
      id
    )) as ProductModel;

    if (!product) {
      throw notFound('Product not found');
    }
    if (product?.isblocked) {
      throw conflict('Product is blocked');
    }
    return product;
  }

  async create(body: CreateProduct) {
    return await sequelize.models.Product.create(body);
  }

  async update(id: number, body: UpdateProduct) {
    const product = await this.find(id);
    const result = await product.update(body, {
      where: {
        id,
      },
    });

    return result;
  }

  async delete(id: number) {
    const product = (await this.find(id)) as ProductModel;
    await product.destroy();
    return product;
  }
}

export default ProductService;
