// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');

const app = express(); // ⚡ Ye line missing thi (app banani hoti hai)

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

// Routes
app.use('/api/users', userRoutes);

// Start server after DB connect
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('DB connect error:', err.message);
    process.exit(1);
  });
