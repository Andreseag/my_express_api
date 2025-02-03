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
router.get('/:categoryId', (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = service.getCategoryById(categoryId);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// POST /categories
router.post('/', (req, res, next) => {
  try {
    const body = req.body;
    const newCategory = service.addCategory(body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// patch /categories/:categoryId
router.patch('/:categoryId', (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const body = req.body;
    const category = service.updateCategory(categoryId, body);
    res.json(category);
  } catch (error) {
    next(error);
  }
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
