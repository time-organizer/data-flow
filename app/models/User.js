const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  confirmed: Boolean,
  createdAt: { type: Date, required: true },
  avatar: Object,
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
