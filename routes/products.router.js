const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  res.json(service.find());
});

router.get('/filter', (req, res) => {
  res.send('Filter products');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(parseInt(id));
  res.json(product);
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
