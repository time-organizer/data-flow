const express = require('express');

const register = require('./register');
const confirm = require('./confirm');
const app = express();

app.use(register);
app.use(confirm);

module.exports = app;
