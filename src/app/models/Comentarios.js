import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const Comentarios = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Accounts",
            required: true
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Persons",
            required: true
        },
        comentario: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

Comentarios.plugin(mongoosePaginate);

module.exports = mongoose.model("Comentarios", Comentarios);
