const express = require('express');

const router = express.Router();

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: `Product ${productId} from category ${categoryId}`,
    price: 100 * productId,
  });
});

module.exports = router;
