const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const applicationRoutes = require('./routes/applications.routes');

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

db.query('SELECT 1')
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('DB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'JobTrackr API is running.',
  });
});

module.exports = app;