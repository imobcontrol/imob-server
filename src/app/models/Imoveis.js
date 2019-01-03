const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Imoveis = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        cpf: {
            type: String
        },
        celular: {
            type: String
        },
        celular2: {
            type: String
        },
        observacoes: {
            type: String
        },
        condominio: {
            valor: Number
        },
        observacoes: {
            type: String
        },
        valorVenda: {
            valor: Number
        },
        aluguel: {
            type: String,
            ref: "Alugueis"
        },
        proprietario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clientes",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

Imoveis.plugin(mongoosePaginate);

module.exports = mongoose.model("Imoveis", Imoveis);
