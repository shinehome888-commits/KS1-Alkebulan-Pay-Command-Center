const mongoose = require('mongoose');

const AuditTrailSchema = new mongoose.Schema({
  action: { type: String, required: true }, // e.g., 'KYC_APPROVED', 'SME_SUSPENDED'
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', required: true },
  targetId: { type: String, required: true }, // e.g., SME ID, Trade ID
  details: { type: mongoose.Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditTrail', AuditTrailSchema);
