module.exports = {
    success: (httpResponse, res) => (res.json({
      success: true,
      cod_error: httpResponse.cod_error,
      message: httpResponse.message,
      data: httpResponse.data
    })),
  };