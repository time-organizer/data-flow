const mongoose = require('mongoose');

const DB_ADDRESS = process.env.DB_ADDRESS;

const connect = () => {
  mongoose.connect(DB_ADDRESS, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to db');
    })
    .catch(() => {
      setTimeout(connect, 5000);
      console.log('Trying to reconnect to db in 5s');
    });
};

connect();
