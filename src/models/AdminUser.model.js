const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['super_admin', 'review_admin', 'support_admin'],
    default: 'support_admin'
  },
  fullName: { type: String, required: true }
}, { timestamps: true });

AdminUserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);
