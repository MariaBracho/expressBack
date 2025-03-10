import { notFound } from '@hapi/boom';
import sequelize from '@/libs/sequelize';
import type { Category } from '@/types/category';
import type { CreateCategory, UpdateCategory } from '@/schemas/category';

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
    const category = await sequelize.models.Category.findByPk(id);
    if (!category) {
      throw notFound('category not found');
    }
    return category;
  }

  async create(body: CreateCategory) {
    const category = await sequelize.models.Category.create(body);
    return category;
  }

  async update(id: number, body: UpdateCategory) {
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
    await category.destroy();
    return category;
  }
}

export default CategoryService;
