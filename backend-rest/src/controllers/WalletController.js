const validationMiddleware = require('../middlewares/ValidationMiddleware');
const { validateRegisterClient } = require('../validators/registerClient');
const responseFormatter = require("../responses/DefaultResponseFormatter");
const soapActions = require("../constants/SoapActions");
const soapActionConsumerFactory = require('../factories/SoapActionConsumerFactory');
const { validateTopUpWallet } = require('../validators/TopUpWallet');
const { validatePay } = require('../validators/Pay');
const { validateConfirm } = require('../validators/Confirm');
const { validateGetBalance } = require('../validators/GetBalance');

const registerClient = [validationMiddleware(validateRegisterClient), async (req, res, next) => {
    try {
      return await responseFormatter.success(
        await soapActionConsumerFactory(soapActions.registerClient, req.body), 
        res
      )
    } catch (error) {
      next(error);
    }
}];

const topUpWallet = [validationMiddleware(validateTopUpWallet), async (req, res, next) => {
  try {
    return await responseFormatter.success(
      await soapActionConsumerFactory(soapActions.topUpWallet, req.body), 
      res
    )
  } catch (error) {
    next(error);
  }
}];

const pay = [validationMiddleware(validatePay), async (req, res, next) => {
  try {
    return await responseFormatter.success(
      await soapActionConsumerFactory(soapActions.pay, req.body), 
      res
    )
  } catch (error) {
    next(error);
  }
}];

const confirm = [validationMiddleware(validateConfirm ), async (req, res, next) => {
  try {
    return await responseFormatter.success(
      await soapActionConsumerFactory(soapActions.confirm, req.body), 
      res
    )
  } catch (error) {
    next(error);
  }
}];

const getBalance = [validationMiddleware(validateGetBalance ), async (req, res, next) => {
  try {
    return await responseFormatter.success(
      await soapActionConsumerFactory(soapActions.balance , req.body), 
      res
    )
  } catch (error) {
    next(error);
  }
}];





module.exports = {
    registerClient,
    topUpWallet,
    pay,
    confirm,
    getBalance
  };