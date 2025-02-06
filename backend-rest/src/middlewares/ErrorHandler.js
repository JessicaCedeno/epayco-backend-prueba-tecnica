const AppError = require("../exceptions/AppError");


module.exports = (err, req, res, next) => {
    let error = err;
  if (!(error instanceof AppError)) error = new AppError(error.message || 'Something went wrong!', 500);
  //TODO: Implementar Logger seguro para trazabilidad de errores
  res.status(error.statusCode).json({
    success: error.success,
    cod_error: error.statusCode,
    message: error.message,
    data: error.data
  });
}