import { Model, DataTypes, type Sequelize, type ModelStatic } from 'sequelize';
import { USER_TABLE } from '../models/users.model';

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
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
};

class Customers extends Model {
  static associate(models: { [key: string]: ModelStatic<Model> }) {
    this.belongsTo(models.User, {
      as: 'user',
    });
    this.hasMany(models.Order, {
      as: 'order',
      foreignKey: 'customerId',
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    };
  }
}

export { Customers, CustomerSchema, CUSTOMER_TABLE };
