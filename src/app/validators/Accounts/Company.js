const Joi = require("joi");

export default {
    body: {
        name: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        state: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required()
    }
};
