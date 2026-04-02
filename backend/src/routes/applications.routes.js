const express = require('express');
const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applications.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authMiddleware, getApplications);
router.get('/:id', authMiddleware, getApplicationById);
router.post('/', authMiddleware, createApplication);
router.put('/:id', authMiddleware, updateApplication);
router.delete('/:id', authMiddleware, deleteApplication);

module.exports = router;