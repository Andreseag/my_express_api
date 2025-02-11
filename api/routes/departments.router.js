const express = require('express');
const DepartmentService = require('../services/department.service');

const router = express.Router();
const service = new DepartmentService();

// Get departments
router.get('/', (req, res, next) => {
  try {
    const departments = service.getDepartments();
    res.json(departments);
  } catch (error) {
    next(error);
  }
});

// Get a department
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const department = service.getDepartmentById(id);
    res.json(department);
  } catch (error) {
    next(error);
  }
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
