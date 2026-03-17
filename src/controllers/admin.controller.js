const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser.model');
const SystemLog = require('../models/SystemLog.model');
const AuditTrail = require('../models/AuditTrail.model');

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminUser.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Log login
    await SystemLog.create({ action: 'ADMIN_LOGIN', adminId: user._id, details: { email } });

    res.json({ success: true, token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    // Fetch from other services
    const [smeRes, kycRes, txRes, trustRes] = await Promise.all([
      fetch('https://ks1-sme-onboarding-system.onrender.com/api/onboarding/stats'),
      fetch('https://ks1-verification-kyc-system-2.onrender.com/api/kyc/stats'),
      fetch('https://ks1-alkebulan-pay-secure-transaction.pages.dev/api/transactions/stats'),
      fetch('https://ks1-trust-score.onrender.com/api/trust/stats')
    ]);

    const stats = {
      totalSMEs: (await smeRes.json()).total || 0,
      verifiedSMEs: (await kycRes.json()).verified || 0,
      pendingKYC: (await kycRes.json()).pending || 0,
      totalTransactions: (await txRes.json()).total || 0,
      activeEscrow: (await txRes.json()).active || 0,
      openDisputes: (await txRes.json()).disputes || 0,
      avgTrustScore: (await trustRes.json()).average || 50
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

// Get all SMEs
const getAllSMEs = async (req, res) => {
  try {
    const smes = await fetch('https://ks1-sme-onboarding-system.onrender.com/api/onboarding/smes')
      .then(r => r.json());
    res.json(smes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch SMEs' });
  }
};

// Suspend SME
const suspendSME = async (req, res) => {
  try {
    const { smeId } = req.body;
    // Call KYC service to suspend
    await fetch('https://ks1-verification-kyc-system-2.onrender.com/api/kyc/suspend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ smeId, suspendedBy: req.admin.id })
    });

    await AuditTrail.create({
      action: 'SME_SUSPENDED',
      adminId: req.admin.id,
      targetId: smeId,
      details: { reason: req.body.reason }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to suspend SME' });
  }
};

// Approve KYC
const approveKYC = async (req, res) => {
  try {
    const { smeId, businessName } = req.body;
    await fetch('https://ks1-verification-kyc-system-2.onrender.com/api/kyc/admin/approve', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-key': process.env.KYC_ADMIN_KEY
      },
      body: JSON.stringify({ smeId, businessName })
    });

    await AuditTrail.create({
      action: 'KYC_APPROVED',
      adminId: req.admin.id,
      targetId: smeId
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve KYC' });
  }
};

module.exports = {
  login,
  getDashboardStats,
  getAllSMEs,
  suspendSME,
  approveKYC
  // Add other functions as needed
};
