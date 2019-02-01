const mongoose = require("mongoose");

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
            unique: true
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

module.exports = mongoose.model("Companies", CompaniesSchema);
