import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Persons = new mongoose.Schema(
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
        pagamento: {
            forma: String,
            banco: String,
            agencia: String,
            conta: String,
            tipoConta: String,
            operacao: String,
            nome: String,
            cpfCnpj: String
        },
        observacoes: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

Persons.plugin(mongoosePaginate);

export default mongoose.model("Persons", Persons);
