const soapActions = require("../constants/SoapActions");
const { callSoapService } = require("../services/SoapClient");
const SoapError = require('../exceptions/SoapError');
const registerClientMapper = require("../mappers/RegisterClient");
const topUpWalletMapper = require("../mappers/TopUpWallet");

const dataMapped = {
    [soapActions.registerClient]: registerClientMapper,
    [soapActions.topUpWallet]: topUpWalletMapper
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