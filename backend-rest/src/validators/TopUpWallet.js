const Joi =  require("joi");
const ValidationError = require("../exceptions/ValidationError");

const topUpWalletSchema = Joi.object({
    document: Joi.string().min(5).max(10).required(),
    balance: Joi.number().required(),
    cellphone: Joi.string().min(10).required()
})

module.exports = {
    validateTopUpWallet: (data) => {
        const { error, value } = topUpWalletSchema.validate(data);
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