"use strict";
import { DataTypes } from "sequelize";

import { CUSTOMER_TABLE } from "../models/customers.model";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn(CUSTOMER_TABLE, "user_id", {
    field: "user_id",
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true
  });
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
