const mongoose = require('mongoose');
const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  participants: { type: Array },
  columnsOrder: { type: Array, required: true },
  ownerId: { type: String, required: true },
  theme: { type: Number },
});

mongoose.model('Board', BoardSchema);

module.exports = mongoose.model('Board');
