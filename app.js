require('dotenv').config();
const express = require('express');
const app = express();

require('./db/index');

app.get('/health', (req, res) => {
  res.send('Time organizer data-flow is fine');
});

module.exports = app;
