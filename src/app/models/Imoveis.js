import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Imoveis = new mongoose.Schema(
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
        description: {
            observations: { type: String, default: "" },
            type: { type: Number, default: "" },
            category: { type: Number, default: "" },
            goal: { type: Number, default: "" },
            status: { type: Number, default: "" },
            currentState: { type: Number, default: "" },
            target: { type: Number, default: "" }
        },
        fiscal: {
            iptu: {
                number: { type: String, default: "" }
            },
            agua: {
                number: { type: String, default: "" }
            },
            energia: {
                number: { type: String, default: "" }
            }
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
            country: { type: String, default: "" }
        },
        images: [
            {
                name: { type: String, default: "" },
                size: { type: String, default: "" },
                key: { type: String, default: "" },
                selected: { type: Boolean, default: false },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
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
