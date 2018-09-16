const express = require('express');

const signUp = require('./signUp');
const confirm = require('./confirm');
const login = require('./login');
const app = express();

app.use(signUp);
app.use(confirm);
app.use(login);

module.exports = app;
