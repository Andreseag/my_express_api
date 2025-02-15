const { faker, da } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class ProductsService {
  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async create(data) {
    const query =
      'INSERT INTO products (name, price, image, isBlock) VALUES ($1, $2, $3, $4) RETURNING *';
    const rta = await this.pool.query(query, [
      data.name,
      data.price,
      data.image,
      data.isBlock,
    ]);
    return rta.rows[0];
  }

  async update(id, data) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.products[index] = {
      ...this.products[index],
      ...data,
    };
    return this.products[index];
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1';
    await this.pool.query(query, [id]);
    return { id };
  }

  async find() {
    const query = 'SELECT * FROM products';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const rta = await this.pool.query(query, [id]);
    return rta.rows[0];
  }
}

module.exports = ProductsService;
