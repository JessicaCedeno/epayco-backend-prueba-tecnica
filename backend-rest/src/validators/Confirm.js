const Joi =  require("joi");
const ValidationError = require("../exceptions/ValidationError");

const confirmSchema = Joi.object({
    sessionId: Joi.string().required(),
    token: Joi.string().max(6).required(),
})

module.exports = {
    validateConfirm: (data) => {
        const { error, value } = confirmSchema.validate(data);
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