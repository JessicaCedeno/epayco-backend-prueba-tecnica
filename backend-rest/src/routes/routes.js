const express = require('express');
const router = express.Router();
const {
  registerClient,
  topUpWallet,
  pay,
  confirm,
  getBalance
} = require('../controllers/WalletController');

router.post('/register', registerClient);
router.post('/recharge', topUpWallet);
router.post('/pay', pay);
router.post('/confirm', confirm);
router.post('/balance', getBalance);

module.exports = router;