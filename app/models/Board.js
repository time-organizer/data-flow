const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, required: true },
  mainImage: { type: String, required: true },
  participants: { type: Array },
  columns: { type: Array },
  ownerId: { type: String, required: true },
});

mongoose.model('Board', UserSchema);

module.exports = mongoose.model('Board');
