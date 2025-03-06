import { Category, CategorySchema } from './category.model';
import { OrderProduct, OrderProductSchema } from './orderProduct.model';
import { Product, ProductSchema } from './products.model';
import { Customers, CustomerSchema } from './customers.model';
import { User, UserSchema } from './users.model';
import { Order, OrderSchema } from './order.model';

function setupModels(sequelize: any) {
  Product.init(ProductSchema, Product.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Customers.init(CustomerSchema, Customers.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  Customers.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

export { setupModels };
