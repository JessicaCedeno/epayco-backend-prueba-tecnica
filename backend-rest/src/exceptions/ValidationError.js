const AppError = require('./AppError');
const TypeExceptions = require("../constants/TypeExceptions");

class ValidationError extends AppError {
    constructor(message, details = []) {
        console.log("details", details)
        super(message, 400);
        this.name = TypeExceptions.ValidationError;
        this.data = details; 
      }
}

module.exports = ValidationError;