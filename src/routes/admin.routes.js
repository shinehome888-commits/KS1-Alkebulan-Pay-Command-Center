const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/admin.controller');

// Dashboard
router.get('/dashboard', getDashboardStats);

// SME Management
router.get('/smes', getAllSMEs);
router.get('/sme/:sme_id', getSMEProfile);
router.post('/sme/suspend', suspendSME);
router.post('/sme/reactivate', reactivateSME);

// KYC
router.get('/kyc/pending', getPendingKYC);
router.post('/kyc/approve', approveKYC);
router.post('/kyc/reject', rejectKYC);

// Transactions
router.get('/transactions', getTransactions);

// Trust Scores
router.get('/trust-scores', getTrustScores);

// Disputes
router.get('/disputes', getDisputes);
router.post('/disputes/resolve', resolveDispute);

module.exports = router;
