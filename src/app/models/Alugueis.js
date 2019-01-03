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
        valorLocacao: {
            type: String,
            require: true
        },
        taxaAdministracao: {
            type: Number
        },
        taxaLocacao: {
            type: Number
        },
        diaVencimento: {
            type: Number
        }
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
