'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { CUSTOMER_TABLE } from '../models/customers.model';
import { USER_TABLE } from '../models/users.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(CUSTOMER_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      field: 'user_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: USER_TABLE,
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
  });
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(CUSTOMER_TABLE, {
    cascade: true,
  });
}
