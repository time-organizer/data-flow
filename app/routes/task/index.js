const express = require('express');

const create = require('./create');
// const get = require('./get');
// const remove = require('./remove');
const update = require('./update');
const app = express();

app.use(create);
app.use(update);
// app.use(get);
// app.use(remove);

module.exports = app;
