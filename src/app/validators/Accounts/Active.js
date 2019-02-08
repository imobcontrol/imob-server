const Joi = require("joi");

export default {
    params: {
        code: Joi.string()
            .min(10)
            .required()
    }
};
