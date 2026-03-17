const jwt = require('jsonwebtoken');

// ✅ TEMPORARY LOGIN – WORKS IMMEDIATELY
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Accept any request with correct email (for now)
    if (email === 'shine@ks1egf.org') {
      const token = jwt.sign(
        { id: 'temp_admin_id', email: 'shine@ks1egf.org', role: 'super_admin' },
        process.env.JWT_SECRET || 'ks1_command_jwt_secret_2026_xyz',
        { expiresIn: '24h' }
      );
      return res.json({ success: true, token, role: 'super_admin', fullName: 'Shine Jones' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Placeholder functions to prevent "undefined" route errors
const getDashboardStats = (req, res) => res.json({ totalSMEs: 0, verifiedSMEs: 0, pendingKYC: 0, avgTrustScore: 50 });
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
