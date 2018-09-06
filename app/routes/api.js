const express = require('express');
const router = express.Router();

const userRoutes = require('./UserController');
router.use('/users', userRoutes);

module.exports = router;