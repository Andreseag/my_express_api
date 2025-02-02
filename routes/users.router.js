const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No limit or offset');
  }
});

// GET /users/:userId
router.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    name: `User ${userId}`,
  });
});

// POST /users
router.post('/users', (req, res) => {
  res.json({
    message: 'POST /users',
  });
});

// PUT /users/:userId
router.put('/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    message: 'PUT /users',
  });
});

// DELETE /users/:userId
router.delete('/users/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    message: 'DELETE /users',
  });
});

module.exports = router;
