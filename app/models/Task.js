const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  boardId: { type: String, required: true },
  columnId: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  history: { type: Array },
  labels: { type: Array },
  description: { type: String, default: '' },
});

mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');
