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
  const newProduct = service.create(req.body);

  res.json({
    message: 'Product created',
    data: newProduct,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;

  const productUpdated = service.update(parseInt(id), req.body);
  res.json(productUpdated);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productDeleted = service.delete(parseInt(id));
  res.json(productDeleted);
});

module.exports = router;
