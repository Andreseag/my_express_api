const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola desde la nueva ruta');
});

app.get('/products', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Product 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
    },
  ]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: `Product ${id}`,
    price: 100 * id,
  });
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
