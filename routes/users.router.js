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
router.get('/:userId', (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = service.getUserById(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// POST /users
router.post('/', (req, res, next) => {
  try {
    const body = req.body;
    const newUser = service.addUser(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
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
