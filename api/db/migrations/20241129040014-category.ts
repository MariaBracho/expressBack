'use strict';

import { DataTypes, QueryInterface } from 'sequelize';
import { CATEGORIES_TABLE } from '../models/category.model';

/** @type {require('sequelize-cli').Migration} */
export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(CATEGORIES_TABLE, {
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
  });
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(CATEGORIES_TABLE, {
    cascade: true,
  });
}
