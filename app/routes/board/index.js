const express = require('express');

const create = require('./create');
const app = express();

app.use(create);

module.exports = app;
