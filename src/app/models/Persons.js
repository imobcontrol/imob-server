import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Persons = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Companies",
            required: true
        },

        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accounts",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        cpf: {
            type: Number,
            required: true
        },

        birthDate: Date,

        email: String,

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

        observations: String
    },
    {
        timestamps: true
    }
);

Persons.plugin(mongoosePaginate);

export default mongoose.model("Persons", Persons);
