const TypeExceptions = require("../constants/TypeExceptions");
class AppError extends Error {
    constructor(message, statusCode, data = {}) {
        super(message);
        this.statusCode = statusCode;
        this.name = TypeExceptions.AppError;
        this.success = false;
        this.data = data;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;