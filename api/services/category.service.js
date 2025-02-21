const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class CategoryService {
  constructor() {
    this.categories = [];
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  addCategory(category) {
    const newCategory = {
      id: faker.database.mongodbObjectId(),
      ...category,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  async getCategories() {
    const query = 'SELECT * FROM categories';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async getCategoryById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const rta = await this.pool.query(query, [id]);
    return rta.rows[0];
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
