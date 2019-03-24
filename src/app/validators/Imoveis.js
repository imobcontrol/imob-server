const Joi = require("joi");

module.exports = {
    body: {
        address: Joi.object().required(),
        informations: Joi.object().required(),
        proprietario: Joi.string().required()
    }
};
