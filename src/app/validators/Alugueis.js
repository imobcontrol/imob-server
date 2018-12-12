const Joi = require("joi");

module.exports = {
    body: {
        locador: Joi.string(),
        imovel: Joi.string(),
        valor: Joi.number(),
        desconto: Joi.number(),
        vencimento: Joi.string(),
        comentario: Joi.string()
    }
};
