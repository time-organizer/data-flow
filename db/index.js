const mongoose = require('mongoose');

const DB_ADDRESS = process.env.DB_ADDRESS;
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });
