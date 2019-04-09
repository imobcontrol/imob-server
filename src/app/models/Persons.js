import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Persons = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Companies"
        },

        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accounts"
        },

        name: {
            type: String,
            required: true
        },

        cpf: {
            type: String
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
