require('dotenv').config();
const express = require('express');
const app = express();

require('./db/index');

const apiRoutes = require('./app/routes/api');
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.send('Time organizer data-flow is fine');
});

module.exports = app;
