const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Clientes = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

Clientes.plugin(mongoosePaginate);

module.exports = mongoose.model("Clientes", Clientes);
