const mongoose = require('mongoose');
const ColumnSchema = new mongoose.Schema({
  boardId: { type: String, required: true},
  title: { type: String, required: true },
  createdAt: { type: Date, required: true },
  tasksOrder: { type: Array },
});

mongoose.model('Column', ColumnSchema);

module.exports = mongoose.model('Column');
