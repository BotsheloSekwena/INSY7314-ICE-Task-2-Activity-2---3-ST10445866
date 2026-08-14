// Input validation middleware using Joi
// NEW: This file was created to centralize error handling (Activity 1 had none)

const Joi = require('joi');

// Define the validation schema for a car
const carSchema = Joi.object({
  make: Joi.string().min(1).max(100).required()
    .messages({
      'string.empty': 'Make is required',
      'string.min': 'Make must be at least 1 character',
      'any.required': 'Make is required'
    }),
  model: Joi.string().min(1).max(100).required()
    .messages({
      'string.empty': 'Model is required',
      'string.min': 'Model must be at least 1 character',
      'any.required': 'Model is required'
    }),
  year: Joi.number().integer().min(1886).max(new Date().getFullYear() + 1).required()
    .messages({
      'number.base': 'Year must be a number',
      'number.min': 'Year must be 1886 or later (first car invented)',
      'number.max': `Year cannot be later than ${new Date().getFullYear() + 1}`,
      'any.required': 'Year is required'
    }),
  price: Joi.number().positive().required()
    .messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be greater than 0',
      'any.required': 'Price is required'
    }),
  color: Joi.string().min(1).max(50).required()
    .messages({
      'string.empty': 'Color is required',
      'any.required': 'Color is required'
    })
});

// Validation middleware
const validateCar = (req, res, next) => {
  // Debug message - you'll see this in your terminal when validation runs
  console.log('🔍 Validation middleware is running!');

  const { error, value } = carSchema.validate(req.body, {
    abortEarly: false,  // Return all validation errors
    stripUnknown: true  // Remove unknown fields
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors
    });
  }

  // Replace req.body with validated value
  req.body = value;
  next();
};

module.exports = validateCar;