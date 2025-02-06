const express = require('express');
const router = express.Router();
const {
  registerClient,
  topUpWallet,
  initiatePayment,
  confirmPayment,
  checkBalance
} = require('../controllers/WalletController');

// Definir rutas REST
router.post('/register', registerClient);
router.post('/recharge', topUpWallet);
// router.post('/pay', initiatePayment);
// router.post('/confirm-payment', confirmPayment);
// router.post('/balance', checkBalance);

module.exports = router;