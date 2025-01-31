const express = require('express');
const ProductsService = require('../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Filter products');
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(parseInt(id));
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const newProduct = await service.create(req.body);

  res.json({
    message: 'Product created',
    data: newProduct,
  });
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdated = await service.update(parseInt(id), req.body);
    res.json(productUpdated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const productDeleted = await service.delete(parseInt(id));
  res.json(productDeleted);
});

module.exports = router;
