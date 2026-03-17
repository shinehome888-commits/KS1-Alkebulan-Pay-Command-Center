// Login (required for auth)
const login = (req, res) => {
  res.json({ message: 'Login placeholder' });
};

// Dashboard
const getDashboardStats = (req, res) => {
  res.json({ totalSMEs: 0, verifiedSMEs: 0, pendingKYC: 0, avgTrustScore: 50 });
};

// SMEs
const getAllSMEs = (req, res) => {
  res.json([]);
};
const getSMEProfile = (req, res) => {
  res.json({});
};
const suspendSME = (req, res) => {
  res.json({ success: true });
};
const reactivateSME = (req, res) => {
  res.json({ success: true });
};

// KYC
const getPendingKYC = (req, res) => {
  res.json([]);
};
const approveKYC = (req, res) => {
  res.json({ success: true });
};
const rejectKYC = (req, res) => {
  res.json({ success: true });
};

// Transactions
const getTransactions = (req, res) => {
  res.json([]);
};

// Trust Scores
const getTrustScores = (req, res) => {
  res.json([]);
};

// Disputes
const getDisputes = (req, res) => {
  res.json([]);
};
const resolveDispute = (req, res) => {
  res.json({ success: true });
};

// ✅ EXPORT ALL FUNCTIONS
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
