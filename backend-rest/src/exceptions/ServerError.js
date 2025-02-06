const AppError = require('./AppError');
const TypeExceptions = require('../constants/TypeExceptions');

class ServerError extends AppError {
    constructor(message, status = 500,details = []) {
        super(message, status);
        this.name = TypeExceptions.ServerError;
        this.data = details; 
      }
}

module.exports = ServerError;