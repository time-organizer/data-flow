const express = require('express');

const register = require('./register');
const confirm = require('./confirm');
const login = require('./login');
const app = express();

app.use(register);
app.use(confirm);
app.use(login);

module.exports = app;
