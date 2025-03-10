import { Model, DataTypes, type Sequelize, type ModelStatic } from 'sequelize';

const CATEGORIES_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
};

class Category extends Model {
  static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.hasMany(models.Product, {
      as: 'product',
      foreignKey: 'categoryId',
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}

export { Category, CategorySchema, CATEGORIES_TABLE };
