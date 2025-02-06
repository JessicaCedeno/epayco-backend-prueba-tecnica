const soap = require('soap');
const SOAP_WSDL = 'http://localhost:8000/wsdl';


const createSoapClient = async () => {
  const client = await soap.createClientAsync(SOAP_WSDL);
  return client;
};

const callSoapService = async (method, params) => {
  try {
    const client = await createSoapClient();
    const response = await client[`${method}Async`](params);
    return response[0];
  } catch (error) {
    throw new Error(`SOAP Error: ${error.message}`);
  }
};

module.exports = { callSoapService };