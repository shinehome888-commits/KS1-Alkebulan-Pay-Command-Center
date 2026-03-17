const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser.model');

// ✅ REAL LOGIN FUNCTION
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }
    const user = await AdminUser.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ success: true, token, role: user.role });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Placeholder functions for routes
const getDashboardStats = (req, res) => res.json({});
const getAllSMEs = (req, res) => res.json([]);
const getSMEProfile = (req, res) => res.json({});
const suspendSME = (req, res) => res.json({ success: true });
const reactivateSME = (req, res) => res.json({ success: true });
const getPendingKYC = (req, res) => res.json([]);
const approveKYC = (req, res) => res.json({ success: true });
const rejectKYC = (req, res) => res.json({ success: true });
const getTransactions = (req, res) => res.json([]);
const getTrustScores = (req, res) => res.json([]);
const getDisputes = (req, res) => res.json([]);
const resolveDispute = (req, res) => res.json({ success: true });

// ✅ EXPORT ALL FUNCTIONS — INCLUDING login
module.exports = {
  login,
  getDashboardStats,
  getAllSMEs,
  getSMEProfile,
  suspendSME,
  reactivateSME,
  getPendingKYC,
  approveKYC,
  rejectKYC,
  getTransactions,
  getTrustScores,
  getDisputes,
  resolveDispute
};
