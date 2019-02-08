import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

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
            ref: "Persons",
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

export default mongoose.model("Imoveis", Imoveis);
