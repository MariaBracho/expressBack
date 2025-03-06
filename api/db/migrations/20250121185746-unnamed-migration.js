'use strict';

import { CATEGORIES_TABLE, CategorySchema } from '../models/category.model';
import { CUSTOMER_TABLE, CustomerSchema } from '../models/customers.model';
import { ORDER_TABLE, OrderSchema } from '../models/order.model';
import { ORDER_PRODUCT_TABLE, OrderProductSchema } from '../models/orderProduct.model';
import { PRODUCT_TABLE, ProductSchema } from '../models/products.model';
import { USER_TABLE, UserSchema } from '../models/users.model';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable(USER_TABLE, UserSchema);
  await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  await queryInterface.createTable(CATEGORIES_TABLE, CategorySchema);
  await queryInterface.createTable(ORDER_TABLE, OrderSchema);
  await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);

}
export async function down(queryInterface, Sequelize) {

  await queryInterface.dropTable('users');
  await queryInterface.dropTable('customers');
  await queryInterface.dropTable('products');
  await queryInterface.dropTable('categories');
  await queryInterface.dropTable('orders');
  await queryInterface.dropTable('order_products');
}