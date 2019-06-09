const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
  boardId: { type: String, required: true },
  title: { type: String, required: true },
  dueDate: { type: Date },
  startingDate: { type: Date },
  color: { type: String },
  createdAt: { type: Date },
});

mongoose.model('Label', LabelSchema);

module.exports = mongoose.model('Label');
