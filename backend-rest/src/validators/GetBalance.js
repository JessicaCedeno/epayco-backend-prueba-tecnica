const Joi =  require("joi");
const ValidationError = require("../exceptions/ValidationError");

const getBalanceSchema = Joi.object({
    document: Joi.string().min(5).max(10).required(),
    cellphone: Joi.string().min(10).required()
})

module.exports = {
    validateGetBalance: (data) => {
        const { error, value } = getBalanceSchema.validate(data);
        if(error) {
            const details = error.details.map((err) => ({
                field: err.context.key,
                message: err.message,
              }));
            throw new ValidationError('Validation failed', details);
        }
        return value;
    }
}