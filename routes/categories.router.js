const express = require('express');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/category.schema');

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
router.get(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = service.getCategoryById(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

// POST /categories
router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = service.addCategory(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

// patch /categories/:categoryId
router.patch(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const body = req.body;
      const category = service.updateCategory(categoryId, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /categories/:categoryId
router.delete(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = service.deleteCategory(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
