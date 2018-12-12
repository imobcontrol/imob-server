const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Comentarios = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clientes",
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
