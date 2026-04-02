const express = require('express');
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' });
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;