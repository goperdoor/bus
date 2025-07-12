const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const busRoutes = require('./routes/busRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/perdoorbus';

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/buses', busRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });