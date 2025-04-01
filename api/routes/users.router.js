const express = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');

// Services
const router = express.Router();
const service = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /users/:userId
router.get(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await service.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// POST /users
router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  (req, res, next) => {
    try {
      const body = req.body;
      const newUser = service.addUser(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

// PATCH /users/:userId
router.patch(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      const user = service.updateUser(userId, body);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /users/:userId
router.delete(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = service.deleteUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
