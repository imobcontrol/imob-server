const Joi = require("joi");

export default {
    body: {
        nome: Joi.string().required(),
        telefone: Joi.string().required(),
        estado: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required()
    }
};
