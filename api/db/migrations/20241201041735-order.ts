'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { ORDER_TABLE } from '../models/order.model';
import { CUSTOMER_TABLE } from '../models/customers.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(ORDER_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    customerId: {
      field: 'customer_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: CUSTOMER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        try {
          const order = this as any;
          if (order.items?.length > 0) {
            return order.items.reduce(
              (
                total: number,
                item: {
                  price: number;
                  OrderProduct: { amount: number };
                }
              ) => {
                return total + item.price * item.OrderProduct.amount;
              },
              0
            );
          }
          return 0;
        } catch (err) {
          console.error(err);
        }
      },
    },
  });
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(ORDER_TABLE, {
    cascade: true,
  });
}
