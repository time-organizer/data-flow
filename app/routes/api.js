const express = require('express');
const app = express();
const userRoutes = require('./user/index');
const boardRoutes = require('./board/index');
const columnRoutes = require('./column/index');
const taskRoutes = require('./task/index');

app.use(userRoutes);
app.use(boardRoutes);
app.use(columnRoutes);
app.use(taskRoutes);

module.exports = app;
