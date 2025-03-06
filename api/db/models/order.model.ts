import { Model, DataTypes, type Sequelize } from 'sequelize';
import { CUSTOMER_TABLE } from './customers.model';

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
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
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      try {
        const order = this as any;

        if (order.items?.length > 0) {
          return order.reduce(
            (
              total: number,
              item: {
                price: number;
                OrderProduct: { amout: number };
              }
            ) => {
              return total + item.price * item.OrderProduct.amout;
            },
            0
          );
        }
        return 0;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

class Order extends Model {
  items?: Array<{
    price: number;
    OrderProduct: { amout: number };
  }>;
  static associate(models: any) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

export { Order, OrderSchema, ORDER_TABLE };
