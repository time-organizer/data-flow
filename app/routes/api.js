const express = require('express');
const app = express();
const userRoutes = require('./user/index');
const boardRoutes = require('./board/index');
const columnRoutes = require('./column/index');

app.use(userRoutes);
app.use(boardRoutes);
app.use(columnRoutes);

module.exports = app;
