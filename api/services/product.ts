import { faker } from "@faker-js/faker";
import { notFound, conflict } from "@hapi/boom";
import type { Product } from "../types/products";

class ProductService {
  product: Product[] = [];

  constructor() {
    this.product = [];
    this.generater();
  }

  generater() {
    const arr = Array.from({ length: 100 }).fill(0);

    const productsList = arr?.map((item) => {
      return {
        id: faker.helpers.unique(faker.datatype.uuid),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        isBlocked: faker.datatype.boolean()
      };
    });

    this.product.push(...productsList);
  }

  async getAll() {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.product);
      }, 4000);
    });
  }

  async find(id: string) {
    const product = this.product.find((item) => item.id === id);

    if (!product) {
      throw notFound("Product not found");
    }
    if (product.isBlocked) {
      throw conflict("Product is blocked");
    }
    return product;
  }

  async create(body: Product) {
    const { name, price, image, isBlocked } = body;
    const product = {
      id: faker.helpers.unique(faker.datatype.uuid),
      name,
      price,
      image: image || faker.image.imageUrl(),
      isBlocked
    };
    this.product.push(product);

    return product;
  }

  async update(id: string, body: Product) {
    const index = this.product.findIndex((item) => item.id === id);
    const product = this.product[index];
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.product[index] = {
      ...product,
      ...body
    };

    return this.product[index];
  }

  async delete(id: string) {
    const isFind = this.product.findIndex((item) => item.id === id);

    if (isFind === -1) {
      throw notFound("Producto no encontrado");
    }
    this.product.splice(isFind, 1);
    return id;
  }
}

export default ProductService;
