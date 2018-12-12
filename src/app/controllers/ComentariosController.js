const Comentarios = require("../models/Comentarios");

class ComentariosController {
    async index(req, res) {
        const comentarios = await Comentarios.find(
            {
                cliente: req.params.id
            },
            {},
            { sort: "-createdAt" }
        ).populate("user");
        return res.json(comentarios);
    }

    async show(req, res) {
        const comentarios = await Comentarios.findById(req.params.id);
        return res.json(comentarios);
    }

    async store(req, res) {
        const comentarios = await Comentarios.create({
            ...req.body
        });

        const result = await comentarios.populate("user").execPopulate();

        return res.json(result);
    }

    async update(req, res) {
        const comentarios = await Comentarios.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        ).populate("user");

        return res.json(comentarios);
    }

    async destroy(req, res) {
        const comentarios = await Comentarios.findByIdAndDelete(req.params.id);
        return res.send(comentarios);
    }
}

module.exports = new ComentariosController();
