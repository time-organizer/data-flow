require('dotenv').config();
const mongoose = require('mongoose');

const DB_ADDRESS = process.env.DB_ADDRESS;
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true }, () => {
  mongoose.connection.db.dropDatabase().then(() => {
    console.log('\x1b[33m', 'Successfully dropped database');
    process.exit();
  });
});

