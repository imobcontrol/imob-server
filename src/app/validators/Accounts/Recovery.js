const Joi = require("joi");

export default {
    params: {
        email: Joi.string()
            .email()
            .required()
    }
};
