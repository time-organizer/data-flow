const express = require('express');
const app = express();
const userRoutes = require('./user/index');
const boardRoutes = require('./board/index');

app.use(userRoutes);
app.use(boardRoutes);

module.exports = app;
