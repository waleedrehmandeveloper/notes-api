const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/notes', noteRoutes);

// Catch 404 routes and forward to error handler
app.use((req, res, next) => {
  const error = new Error(`Route Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Centralized error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
