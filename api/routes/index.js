const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const promotionsRouter = require('./promotions.router');
const departmentsRouter = require('./departments.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/promotions', promotionsRouter);
  router.use('/departments', departmentsRouter);
}

module.exports = routerApi;
