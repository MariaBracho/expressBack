'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { USER_TABLE } from '../models/users.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(USER_TABLE, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
  await queryInterface.dropTable(USER_TABLE, {
    cascade: true,
  });
}
