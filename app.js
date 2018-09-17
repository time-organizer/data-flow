require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

require('./db/index');

const authRoutes = require('./app/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./app/routes/api');
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.send('Time organizer data-flow is fine');
});

module.exports = app;
