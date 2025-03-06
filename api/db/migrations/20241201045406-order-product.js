'use strict';

import { OrderProductSchema, ORDER_PRODUCT_TABLE } from '../models/orderProduct.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

}
export async function down(queryInterface, Sequelize) {

  await queryInterface.dropTable(ORDER_PRODUCT_TABLE);

}
