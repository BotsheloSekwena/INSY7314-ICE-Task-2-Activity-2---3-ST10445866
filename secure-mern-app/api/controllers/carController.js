// Controller functions for car resources
// NEW: This file was created to separate business logic from routing

// CHANGE: Resource changed from Gadgets to Cars with 5 attributes
// Initial seed data - 3 cars with attributes: make, model, year, price, color
let cars = [
  { id: 'c1', make: 'Toyota', model: 'Camry', year: 2022, price: 28500, color: 'Silver' },
  { id: 'c2', make: 'Honda', model: 'Civic', year: 2023, price: 24500, color: 'White' },
  { id: 'c3', make: 'BMW', model: 'X5', year: 2024, price: 65000, color: 'Black' }
];

// Helper to generate a new ID (c4, c5, c6, etc.)
const generateId = () => {
  const lastId = cars.length > 0
    ? parseInt(cars[cars.length - 1].id.substring(1))
    : 0;
  return `c${lastId + 1}`;
};

// GET all cars
const getAllCars = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: cars.length,
    data: cars
  });
};

// GET a single car by ID
const getCarById = (req, res) => {
  const { id } = req.params;
  const car = cars.find(c => c.id === id);

  if (!car) {
    return res.status(404).json({
      status: 'error',
      message: `Car with ID ${id} not found`
    });
  }

  res.status(200).json({
    status: 'success',
    data: car
  });
};

// POST - Add a new car
const addCar = (req, res) => {
  const { make, model, year, price, color } = req.body;

  const newCar = {
    id: generateId(),
    make,
    model,
    year,
    price,
    color
  };

  cars.push(newCar);

  res.status(201).json({
    status: 'success',
    message: 'Car added successfully',
    data: newCar
  });
};

module.exports = {
  getAllCars,
  getCarById,
  addCar
};