const Joi = require("joi");

module.exports = {
    params: {
        code: Joi.string()
            .min(10)
            .required()
    }
};
