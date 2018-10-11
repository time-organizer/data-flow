const express = require('express');

const create = require('./create');
const get = require('./get');
const app = express();

app.use(create);
app.use(get);

module.exports = app;
