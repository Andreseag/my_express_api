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
    const query =
      'UPDATE products SET name = $1, price = $2, image = $3, isBlock = $4 WHERE id = $5 RETURNING *';
    const rta = await this.pool.query(query, [
      data.name,
      data.price,
      data.image,
      data.isBlock,
      id,
    ]);
    return rta.rows[0];
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1';
    await this.pool.query(query, [id]);
    return { id };
  }

  async find() {
    console.log('find');
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
