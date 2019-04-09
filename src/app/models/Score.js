import mongoose from "mongoose";

const Score = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        cpf: {
            type: String,
            required: true
        },

        birthDate: {
            type: Date,
            required: true
        },

        phoneNumber: Number,

        address: {
            city: String,
            state: String,
            country: String
        },

        comments: {
            type: String
        },

        score: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Score", Score);
