const Joi = require("joi");

module.exports = {
    body: {
        user: Joi.string(),
        cliente: Joi.string(),
        comentarios: Joi.string()
    }
};
