const express = require('express');
const router = express.Router();

// 🔒 Safety check: ensure all controller functions exist
const ctrl = require('../controllers/admin.controller');
if (!ctrl.getDashboardStats) throw new Error('❌ getDashboardStats missing!');
if (!ctrl.getAllSMEs) throw new Error('❌ getAllSMEs missing!');
if (!ctrl.getSMEProfile) throw new Error('❌ getSMEProfile missing!');
if (!ctrl.suspendSME) throw new Error('❌ suspendSME missing!');
if (!ctrl.reactivateSME) throw new Error('❌ reactivateSME missing!');
if (!ctrl.getPendingKYC) throw new Error('❌ getPendingKYC missing!');
if (!ctrl.approveKYC) throw new Error('❌ approveKYC missing!');
if (!ctrl.rejectKYC) throw new Error('❌ rejectKYC missing!');
if (!ctrl.getTransactions) throw new Error('❌ getTransactions missing!');
if (!ctrl.getTrustScores) throw new Error('❌ getTrustScores missing!');
if (!ctrl.getDisputes) throw new Error('❌ getDisputes missing!');
if (!ctrl.resolveDispute) throw new Error('❌ resolveDispute missing!');

// Use the controller functions
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
} = ctrl;

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
