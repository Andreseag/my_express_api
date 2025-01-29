const express = require('express');
const app = express();
const port = 3000;
const { faker } = require('@faker-js/faker');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola desde la nueva ruta');
});

app.get('/products', (req, res) => {
  const { limit = 10 } = req.query;

  const products = Array.from({ length: limit }, (_, index) => ({
    id: index,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    image: faker.image.url(),
  }));

  res.json(products);
});

app.get('products/filter', (req, res) => {
  res.send('Filter products');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Product ${id}`,
    price: 100 * id,
  });
});

app.get('/users', (req, res) => {
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

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
    name: `Product ${productId} from category ${categoryId}`,
    price: 100 * productId,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
