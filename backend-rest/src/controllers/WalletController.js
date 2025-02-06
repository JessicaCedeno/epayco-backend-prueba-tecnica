const validationMiddleware = require('../middlewares/ValidationMiddleware');
const { validateRegisterClient } = require('../validators/registerClient');
const responseFormatter = require("../responses/DefaultResponseFormatter");
const soapActions = require("../constants/SoapActions");
const soapActionConsumerFactory = require('../factories/SoapActionConsumerFactory');
const { validateTopUpWallet } = require('../validators/TopUpWallet');

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

const topUpWallet = [validationMiddleware(validateTopUpWallet), async (req, res) => {
  try {
    return await responseFormatter.success(
      await soapActionConsumerFactory(soapActions.topUpWallet, req.body), 
      res
    )
  } catch (error) {
    next(error);
  }
}];

module.exports = {
    registerClient,
    topUpWallet
  };