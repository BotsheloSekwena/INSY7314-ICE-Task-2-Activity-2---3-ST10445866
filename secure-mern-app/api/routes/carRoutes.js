// routes/carRoutes.js - Route definitions for car resources
// NEW: This file separates route definitions from the main app

const express = require('express');
const router = express.Router();
const {
  getAllCars,
  getCarById,
  addCar
} = require('../controllers/carController');
const validateCar = require('../middleware/validateCarInput');

// GET /api/cars - Fetch all cars
router.get('/', getAllCars);

// GET /api/cars/:id - Fetch a car by ID
router.get('/:id', getCarById);

// POST /api/cars - Add a new car (with validation)
router.post('/', validateCar, addCar);

module.exports = router;