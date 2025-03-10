'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { PRODUCT_TABLE } from '../models/products.model';
import { CATEGORIES_TABLE } from '../models/category.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(PRODUCT_TABLE, {
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
  });
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(PRODUCT_TABLE, {
    cascade: true,
  });
}
