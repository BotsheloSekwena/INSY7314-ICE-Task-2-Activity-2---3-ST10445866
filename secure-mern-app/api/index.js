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

// CHANGE: Controlled CORS configuration (was basic cors() in Activity 1)
app.use(cors());

// CHANGE: Added express.json() middleware to parse request bodies (was missing)
app.use(express.json());

// Root route (unchanged)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cars API' });
});

// Health check route (unchanged)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// CHANGE: Moved API routes to separate route file
app.use('/api/cars', carRoutes);

// CHANGE: Added 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// CHANGE: Added central error handler (was not present in Activity 1)
app.use(errorHandler);

// Start server (unchanged)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});