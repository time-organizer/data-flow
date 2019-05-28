const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
  boardId: { type: String, required: true },
  name: { type: String, required: true },
  dueDate: { type: Date },
});

mongoose.model('Label', LabelSchema);

module.exports = mongoose.model('Label');
