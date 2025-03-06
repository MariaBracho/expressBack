"use strict";

import { UserSchema, USER_TABLE } from "../models/users.model";

/** @type {require('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.createTable(USER_TABLE, UserSchema);
}
export async function down(queryInterface) {
  await queryInterface.dropTable(USER_TABLE);
}
