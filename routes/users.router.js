const express = require('express');
const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res, next) => {
  try {
    const users = service.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /users/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    name: `User ${userId}`,
  });
});

// POST /users
router.post('/', (req, res) => {
  res.json({
    message: 'POST /users',
  });
});

// PUT /users/:userId
router.put('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    message: 'PUT /users',
  });
});

// DELETE /users/:userId
router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    message: 'DELETE /users',
  });
});

module.exports = router;
