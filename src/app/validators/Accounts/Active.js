const Joi = require("joi");

export default {
    params: {
        code: Joi.string()
            .min(10)
            .required()
            .error(errors => {
                return {
                    message: "Código Inválido"
                };
            })
    }
};
