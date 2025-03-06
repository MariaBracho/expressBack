"use strict";

import { CATEGORIES_TABLE, CategorySchema } from "../models/category.model";



/** @type {require('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.createTable(CATEGORIES_TABLE, CategorySchema);
}
export async function down(queryInterface) {
  await queryInterface.dropTable(
    CATEGORIES_TABLE
  );
}