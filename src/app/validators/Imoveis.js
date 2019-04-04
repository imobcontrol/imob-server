const Joi = require("joi");

module.exports = {
    body: {
        fiscal: Joi.object(),
        address: Joi.object().required(),
        informations: Joi.object().required(),
        proprietario: Joi.string().required()
    }
};
