const express = require('express');

const remove = require('./delete');
const app = express();

app.use(remove);

module.exports = app;
