import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Persons = new mongoose.Schema(
    {
        company: [
            {
                type: String,
                ref: "Companies",
                required: true
            }
        ],

        nome: {
            type: String,
            required: true
        },

        cpf: {
            type: Number,
            required: true
        },

        birthDate: Date,

        phoneNumber: String,

        phoneNumber2: String,

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

        address: {
            city: String,
            state: String,
            country: String
        },

        observacoes: String
    },
    {
        timestamps: true
    }
);

Persons.plugin(mongoosePaginate);

export default mongoose.model("Persons", Persons);
