require('dotenv').config();
const express = require('express');
const app = express();

require('./db/index');

module.exports = app;
