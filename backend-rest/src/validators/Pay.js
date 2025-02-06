const Joi =  require("joi");
const ValidationError = require("../exceptions/ValidationError");

const paySchema = Joi.object({
    document: Joi.string().min(5).max(10).required(),
    cellphone: Joi.string().min(10).required(),
    amount: Joi.number().required(),
})

module.exports = {
    validatePay: (data) => {
        const { error, value } = paySchema.validate(data);
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