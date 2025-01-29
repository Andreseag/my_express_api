const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit = 10 } = req.query;

  const products = Array.from({ length: limit }, (_, index) => ({
    id: index,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.url(),
  }));

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Filter products');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Product ${id}`,
    price: 100 * id,
  });
});

module.exports = router;
