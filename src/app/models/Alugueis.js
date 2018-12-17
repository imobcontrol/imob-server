const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Imoveis = require("../models/Imoveis");

const Alugueis = new mongoose.Schema(
    {
        locatario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clientes",
            required: true
        },
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

Alugueis.post("validate", async function(doc) {
    const imovel = await Imoveis.findById(doc.imovel);
    if (imovel.aluguel) {
        throw new Error("Imovel já alugado.");
    }
});

Alugueis.post("save", async doc => {
    await Imoveis.findByIdAndUpdate(doc.imovel, {
        aluguel: mongoose.Types.ObjectId(doc._id)
    });
});

Alugueis.plugin(mongoosePaginate);

module.exports = mongoose.model("Alugueis", Alugueis);
