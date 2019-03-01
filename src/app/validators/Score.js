const Joi = require("joi");

module.exports = {
    params: {
        cpf: Joi.string()
            .min(10)
            .required()
            .error(errors => {
                return {
                    message: "Cpf Inválido"
                };
            })
    },
    body: {
        name: Joi.string().required(),
        cpf: Joi.number().required(),
        birthDate: Joi.string().required()
    }
};
