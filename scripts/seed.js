require('dotenv').config();
const mongoose = require('mongoose');

const data = require('./data');

const DB_ADDRESS = process.env.DB_ADDRESS;
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true }, async () => {
  mongoose.connection.db.dropDatabase().then(() => {
    console.log('\x1b[33m', 'Successfully dropped database');
  });

  await mongoose.connection.db.collection('users').insertOne(data.user);
  console.log('\x1b[32m%s\x1b[0m', 'User created');

  await mongoose.connection.db.collection('boards').insertOne(data.board);
  console.log('\x1b[32m%s\x1b[0m', 'Board created');

  await mongoose.connection.db.collection('columns').insertMany(data.columns);
  console.log('\x1b[32m%s\x1b[0m', 'Columns created');

  await mongoose.connection.db.collection('labels').insertMany(data.labels);
  console.log('\x1b[32m%s\x1b[0m', 'Labels created');

  await mongoose.connection.db.collection('tasks').insertMany(data.tasks);
  console.log('\x1b[32m%s\x1b[0m', 'Tasks created');

  process.exit();
});

