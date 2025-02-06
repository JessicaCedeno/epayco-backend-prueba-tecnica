const Joi =  require("joi");
const ValidationError = require("../exceptions/ValidationError");

const registerClientSchema = Joi.object({
    document: Joi.string().min(5).max(10).required(),
    name: Joi.string().min(10).max(100).required(),
    email: Joi.string().min(20).max(100).required(),
    cellphone: Joi.string().min(10).required()
})

module.exports = {
    validateRegisterClient: (data) => {
        const { error, value } = registerClientSchema.validate(data);
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