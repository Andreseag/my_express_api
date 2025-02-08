const express = require('express');
const PromotionService = require('../services/promotion.services');

const router = express.Router();
const service = new PromotionService();

router.get('/', (req, res, next) => {
  try {
    const promotions = service.getPromotions();
    res.json(promotions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const promotion = service.getPromotion(id);
    res.json(promotion);
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    const data = req.body;
    const newPromotion = service.createPromotion(data);
    res.status(201).json(newPromotion);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req, res) => {
  res.send('Update promotion');
});

router.delete('/:id', (req, res) => {
  res.send('Delete promotion');
});

module.exports = router;
