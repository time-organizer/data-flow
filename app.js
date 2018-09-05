const express = require('express');
const app = express();

require('dotenv').config();
require('./db/index');

module.exports = app;
