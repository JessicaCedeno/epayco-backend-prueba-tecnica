const soapActions = require("../constants/SoapActions");
const { callSoapService } = require("../services/SoapClient");
const SoapError = require('../exceptions/SoapError');
const registerClientMapper = require("../mappers/RegisterClient");
const TopUpWalletMapper = require("../mappers/TopUpWallet");
const PayMapper = require("../mappers/Pay");
const ConfirmMapper = require("../mappers/Confirm");
const GetBalanceMapper = require("../mappers/GetBalance");

const dataMapped = {
    [soapActions.registerClient]: registerClientMapper,
    [soapActions.topUpWallet]: TopUpWalletMapper,
    [soapActions.pay]: PayMapper,
    [soapActions.confirm]: ConfirmMapper,
    [soapActions.balance]: GetBalanceMapper,
}

const soapActionConsumerFactory = async (action, body) => {
    try {
        const soapResponse = await callSoapService(action, dataMapped[action](body));
        if (!soapResponse.success) throw new SoapError(soapResponse.message, soapResponse.data);
        return soapResponse;
      } catch (error) {
        throw error;
      }
}

module.exports = soapActionConsumerFactory