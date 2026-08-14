// Entry point of the application
// CHANGE: Added structured middleware (CORS, JSON parsing, error handler)
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const carRoutes = require('./routes/carRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Controlled CORS configuration
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cars API' });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/cars', carRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Central error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});