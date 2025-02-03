const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoryService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  async generate() {
    const categories = Array.from({ length: 10 }, (_, index) => ({
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
    }));

    this.categories = categories;
  }

  addCategory(category) {
    const newCategory = {
      id: faker.database.mongodbObjectId(),
      ...category,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  getCategories() {
    return this.categories;
  }

  getCategoryById(id) {
    return this.categories.find((category) => category.id === id);
  }

  updateCategory(id, data) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories[index] = {
      ...this.categories[index],
      ...data,
    };
    return this.categories[index];
  }

  deleteCategory(id) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoryService;
