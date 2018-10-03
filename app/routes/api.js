const express = require('express');
const app = express();
const userRoutes = require('./user/index');

app.use(userRoutes);

module.exports = app;
