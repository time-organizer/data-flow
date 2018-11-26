const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, required: true },
  participants: { type: Array },
  columns: { type: Array },
  ownerId: { type: String, required: true },
  theme: { type: Number },
});

mongoose.model('Board', UserSchema);

module.exports = mongoose.model('Board');
