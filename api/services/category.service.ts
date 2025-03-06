import { notFound } from '@hapi/boom';
import type { Category } from '../types/category';
import sequelize from './../libs/sequelize';

class CategoryService {
  category: Category[] = [];

  constructor() {
    this.category = [];
  }

  async getAll() {
    const result = await sequelize.models.Category.findAll();
    if (!result) {
      throw notFound('category not found');
    }
    return result;
  }

  async find(id: number) {
    const category: any = await sequelize.models.Category.findByPk(id);
    if (!category) {
      throw notFound('category not found');
    }
    return category;
  }

  async create(body: any) {
    const category = await sequelize.models.Category.create(body);
    return category;
  }

  async update(id: number, body: Category) {
    const category = await this.find(id);
    const result = await category.update(body, {
      where: {
        id,
      },
    });

    return result;
  }

  async delete(id: number) {
    const category = await this.find(id);
    await category.destroy({
      where: {
        id,
      },
    });
    return category;
  }
}

export default CategoryService;
