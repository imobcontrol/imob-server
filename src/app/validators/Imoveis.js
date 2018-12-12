const Joi = require("joi");

module.exports = {
    body: {
        cliente: Joi.string(),
        nome: Joi.string(),
        celular: Joi.number(),
        celular2: Joi.number(),
        cpf: Joi.number(),
        observacoes: Joi.string()
    }
};
