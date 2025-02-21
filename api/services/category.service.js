const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class CategoryService {
  constructor() {
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

  async updateCategory(id, data) {
    const query = 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *';
    const rta = await this.pool.query(query, [data.name, id]);
    return rta.rows[0];
  }

  deleteCategory(id) {
    const query = 'DELETE FROM categories WHERE id = $1';
    const rta = this.pool.query(query, [id]);
    if (!rta) {
      throw boom.notFound('Category not found');
    }
    return { id };
  }
}

module.exports = CategoryService;
