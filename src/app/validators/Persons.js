const Joi = require("joi");

module.exports = {
    body: {
        name: Joi.string(),
        phoneNumber: Joi.number(),
        phoneNumber2: Joi.number(),
        cpf: Joi.string(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        observations: Joi.string()
    }
};
