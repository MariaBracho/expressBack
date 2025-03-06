"use strict";

import { CUSTOMER_TABLE, CustomerSchema } from "../models/customers.model";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable(CUSTOMER_TABLE);
}
