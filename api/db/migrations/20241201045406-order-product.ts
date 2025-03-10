'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { ORDER_PRODUCT_TABLE } from '../models/orderProduct.model';
import { ORDER_TABLE } from '../models/order.model';
import { PRODUCT_TABLE } from '../models/products.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amout: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    orderId: {
      field: 'order_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: ORDER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    productId: {
      field: 'product_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
  await queryInterface.dropTable(ORDER_PRODUCT_TABLE, {
    cascade: true,
  });
}
