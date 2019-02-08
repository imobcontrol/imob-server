import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import Imoveis from "../models/Imoveis";

const Despesas = new mongoose.Schema(
    {
        valor: {
            type: Number,
            default: 0
        },
        tipo: {
            type: Number,
            default: 0
        },
        motivo: {
            type: String,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Parcelas = new mongoose.Schema(
    {
        valor: {
            type: Number,
            default: 0
        },
        desconto: {
            type: Number,
            default: 0
        },
        recibo: {
            type: Boolean,
            default: false
        },
        pago: {
            type: Boolean,
            default: false
        },
        dataInicial: {
            type: Date,
            default: Date.now
        },
        dataFinal: {
            type: Date,
            default: Date.now
        },
        qtdDias: {
            type: Number,
            default: 0
        },
        despesasTotal: {
            type: Number,
            default: 0
        },
        despesas: [Despesas],
        observacao: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Alugueis = new mongoose.Schema(
    {
        locatario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Persons",
            required: true
        },
        locador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Persons",
            required: true
        },
        imovel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Imoveis",
            required: true
        },
        valorLocacao: {
            type: Number,
            require: true
        },
        taxaAdministracao: {
            type: Number
        },
        taxaLocacao: {
            type: Number
        },
        diaVencimento: {
            type: Date
        },
        parcelas: [Parcelas],
        ativo: {
            type: Boolean,
            default: false
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

export default mongoose.model("Alugueis", Alugueis);
