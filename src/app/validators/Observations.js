const Joi = require("joi");

module.exports = {
    body: {
        account: Joi.string(),
        cliente: Joi.string(),
        comentarios: Joi.string()
    }
};
