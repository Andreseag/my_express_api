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

router.get('/:id', (req, res) => {
  res.send('Get promotion by id');
});

router.post('/', (req, res) => {
  res.send('Create promotion');
});

router.patch('/:id', (req, res) => {
  res.send('Update promotion');
});

router.delete('/:id', (req, res) => {
  res.send('Delete promotion');
});

module.exports = router;
