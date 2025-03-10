import { Model, DataTypes, type Sequelize, ModelStatic } from 'sequelize';
import { CATEGORIES_TABLE } from './category.model';

const PRODUCT_TABLE = 'products';

const ProductSchema = {
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
  isblocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  categoryId: {
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORIES_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  image: {
    type: DataTypes.STRING,
    defaultValue:
      'https://image.freepik.com/vector-gratis/icono-cesta-compra_1063-6.jpg',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
};

class Product extends Model {
  static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.belongsTo(models.Category, {
      as: 'category',
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

export { Product, ProductSchema, PRODUCT_TABLE };
