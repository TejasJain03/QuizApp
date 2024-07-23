const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
  identifier: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model('Role', roleSchema);
