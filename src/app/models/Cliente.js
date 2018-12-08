const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Cliente = new mongoose.Schema({
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

Cliente.plugin(mongoosePaginate);

module.exports = mongoose.model("Cliente", Cliente);
