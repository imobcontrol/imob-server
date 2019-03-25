import mongoose from "mongoose";

const CompaniesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        state: {
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
