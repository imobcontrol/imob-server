const Joi = require("joi");

export default {
    body: {
        code: Joi.string().required(),
        password: Joi.string().required()
    }
};
