const express = require('express');

const signUp = require('./signUp');
const confirm = require('./confirm');
const login = require('./login');
const me = require('./me');
const app = express();

app.use(signUp);
app.use(confirm);
app.use(login);
app.use(me);

module.exports = app;
