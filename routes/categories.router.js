const express = require('express');
const CategoryService = require('../services/category.service');

const router = express.Router();
const service = new CategoryService();

// GET /categories
router.get('/', (req, res, next) => {
  try {
    const categories = service.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// GET /categories/:categoryId
router.get('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    name: `Category ${categoryId}`,
  });
});

// POST /categories
router.post('/categories', (req, res) => {
  res.json({
    message: 'POST /categories',
  });
});

// PUT /categories/:categoryId
router.put('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    message: 'PUT /categories',
  });
});

// DELETE /categories/:categoryId
router.delete('/categories/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    message: 'DELETE /categories',
  });
});

// Get products from a category
router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: `Product ${productId} from category ${categoryId}`,
    price: 100 * productId,
  });
});

module.exports = router;
