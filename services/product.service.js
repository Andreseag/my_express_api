const { faker } = require('@faker-js/faker');

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

  create() {
    return 'create';
  }

  update() {
    return 'update';
  }

  delete() {
    return 'delete';
  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((product) => product.id === id);
  }
}

module.exports = ProductsService;
