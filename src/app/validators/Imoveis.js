const Joi = require("joi");

module.exports = {
    body: {
        cliente: Joi.string(),
        nome: Joi.string(),
        phoneNumber: Joi.number(),
        phoneNumber2: Joi.number(),
        cpf: Joi.number(),
        observations: Joi.string()
    }
};
