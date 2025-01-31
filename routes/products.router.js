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

router.post('/', (req, res) => {
  res.status(201).json({
    message: 'Product created',
    data: req.body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Product updated',
    data: req.body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Product deleted',
    id,
  });
});

module.exports = router;
