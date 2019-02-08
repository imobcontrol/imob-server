import mongoose from "mongoose";

const CompaniesSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            lowercase: true
        },
        telefone: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accounts"
        },
        accounts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Accounts"
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Companies", CompaniesSchema);
