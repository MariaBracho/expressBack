import { faker } from "@faker-js/faker";
import type { Product } from "@/types/products";

class ProductService {
  product: Product[] = [];

  constructor() {
    this.product = [];
    this.generater();
  }

  generater() {
    const size = 100;
    const arr = new Array(Number(size)).fill(0);

    const productsList = arr?.map((item) => {
      return {
        id: faker.helpers.unique(faker.datatype.uuid),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl()
      };
    });

    this.product.push(...productsList);
  }

  getAll() {
    return this.product;
  }

  find(id: string) {
    return this.product.find((item) => item.id?.includes(id));
  }

  create(body: Product) {
    const { name, price, image } = body;
    const product = {
      id: faker.helpers.unique(faker.datatype.uuid),
      name,
      price,
      image
    };
    this.product.push(product);
    console.log(product, "new product");
    return product;
  }

  update(id: string, body: Product) {
    const isFind = this.product.findIndex((item) => item.id === id);
    const product = this.product[isFind];
    console.log(isFind, "isFind");
    if (isFind === -1) {
      throw new Error("Product not found");
    }
    this.product[isFind] = {
      ...product,
      ...body
    };
    console.log(this.product[isFind], "updated product");
    return this.product[isFind];
  }

  delete(id: string) {
    const isFind = this.product.findIndex((item) => item.id === id);
    if (isFind === -1) {
      throw new Error("Element not found");
    }
    this.product.splice(isFind, 1);
    return id;
  }
}

export default ProductService;
