require('dotenv').config();
const fs = require('fs');
const verifyToken = require('./app/middlewares/verifyToken');

const content = process.env.GCAUTH;

fs.writeFile('google.json', content, (err) => {
  if (err) throw err;

  console.log('Google auth creeated successfully!');
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/assets', express.static('assets'));

require('./db/index');

const authRoutes = require('./app/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./app/routes/api');
app.use('/api', verifyToken, apiRoutes);

app.get('/health', (req, res) => {
  res.send('Time organizer data-flow is fine');
});

module.exports = app;
