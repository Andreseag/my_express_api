const { faker, da } = require('@faker-js/faker');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const products = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.url(),
    }));

    this.products = products;
  }

  create(data) {
    const newProduct = {
      id: this.products.length,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products[index] = {
      ...this.products[index],
      ...data,
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((product) => product.id === id);
  }
}

module.exports = ProductsService;
