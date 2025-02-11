const express = require('express');

const router = express.Router();

// Get departments
router.get('/', (req, res) => {
  res.send('Departments');
});

// Get a department
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Department ${id}`);
});

// Create a department
router.post('/', (req, res) => {
  res.send('Department created');
});

// Update a department
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Department ${id} updated`);
});

// Delete a department
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`Department ${id} deleted`);
});

module.exports = router;
