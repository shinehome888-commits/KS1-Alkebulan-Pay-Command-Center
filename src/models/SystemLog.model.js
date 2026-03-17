const mongoose = require('mongoose');

const SystemLogSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., 'ADMIN_LOGIN'
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  details: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SystemLog', SystemLogSchema);
