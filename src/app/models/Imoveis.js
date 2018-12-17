const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Imoveis = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clientes",
        required: true
    },
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
    aluguel: {
        type: String,
        ref: "Alugueis"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

Imoveis.plugin(mongoosePaginate);

module.exports = mongoose.model("Imoveis", Imoveis);
