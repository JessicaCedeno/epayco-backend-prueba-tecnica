module.exports = (validator) => {
    return (req, res, next) => {
      try {
        const validatedData = validator(req.body);
        req.validatedData = validatedData;
        next();
      } catch (error) {
        next(error);
      }
    };
  };