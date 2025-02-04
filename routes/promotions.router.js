const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Promotions');
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
