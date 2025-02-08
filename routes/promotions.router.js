const express = require('express');
const PromotionService = require('../services/promotion.services');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPromotionSchema,
  updatePromotionSchema,
  getPromotionSchema,
} = require('../schemas/promotion.schema');

const router = express.Router();
const service = new PromotionService();

// Get all promotions
router.get('/', (req, res, next) => {
  try {
    const promotions = service.getPromotions();
    res.json(promotions);
  } catch (error) {
    next(error);
  }
});

// Get a promotion
router.get(
  '/:id',
  validatorHandler(getPromotionSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const promotion = service.getPromotion(id);
      res.json(promotion);
    } catch (error) {
      next(error);
    }
  }
);

// Create a promotion
router.post(
  '/',
  validatorHandler(createPromotionSchema, 'body'),
  (req, res, next) => {
    try {
      const data = req.body;
      const newPromotion = service.createPromotion(data);
      res.status(201).json(newPromotion);
    } catch (error) {
      next(error);
    }
  }
);

// Update a promotion
router.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const promotion = service.updatePromotion(id, data);
    res.json(promotion);
  } catch (error) {
    next(error);
  }
});

// delete a promotion
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const promotion = service.deletePromotion(id);
    res.json(promotion);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
