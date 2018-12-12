const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Alugueis = new mongoose.Schema(
    {
        locador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clientes",
            required: true
        },
        imovel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Imoveis",
            required: true
        },
        valor: {
            type: String,
            require: true
        },
        desconto: {
            type: String,
            require: true
        },
        vencimento: {
            type: Date,
            default: Date.now,
            require: true
        },
        comentarios: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

Alugueis.plugin(mongoosePaginate);

module.exports = mongoose.model("Alugueis", Alugueis);
