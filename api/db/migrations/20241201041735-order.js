'use strict';

import { ORDER_TABLE, OrderSchema } from '../models/order.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable(ORDER_TABLE, OrderSchema);

}
export async function down(queryInterface, Sequelize) {

  await queryInterface.dropTable(ORDER_TABLE);

}
