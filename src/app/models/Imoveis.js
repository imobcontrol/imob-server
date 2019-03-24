import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Imoveis = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Companies",
            required: true
        },

        informations: {
            observations: { type: Number, default: "" },
            type: { type: Number, default: "" },
            category: { type: Number, default: "" },
            goal: { type: Number, default: "" },
            status: { type: Number, default: "" },
            currentState: { type: Number, default: "" },
            target: { type: Number, default: "" }
        },

        address: {
            lat: { type: Number, default: "" },
            lng: { type: Number, default: "" },
            postalCode: { type: String, default: "" },
            street: { type: String, default: "" },
            number: { type: String, default: "" },
            complement: { type: String, default: "" },
            city: { type: String, default: "" },
            neighborhood: { type: String, default: "" },
            state: { type: String, default: "" },
            country: { type: String, default: "" },
            cities: { type: String, default: "" },
            states: { type: String, default: "" }
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
