const AppError = require('./AppError');
const TypeExceptions = require('../constants/TypeExceptions');

class SoapError extends AppError {
    constructor(message, details = []) {
        super(message, 400);
        this.name = TypeExceptions.SoapError;
        this.data = details; 
      }
}

module.exports = SoapError;