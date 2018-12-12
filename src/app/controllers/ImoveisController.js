const mongoose = require("mongoose");

const Imoveis = require("../models/Imoveis");

class ImoveisController {
    async index(req, res) {
        const filters = {};

        const { nome, price_min, price_max } = req.query;

        if (price_min || price_max) {
            filters.price = {};

            if (price_min) {
                filters.price.$gte = price_min;
            }

            if (price_max) {
                filters.price.$lte = price_max;
            }
        }

        if (nome) {
            filters.nome = new RegExp(nome, "i");
        }

        // Filter clientId
        filters.cliente = mongoose.Types.ObjectId(req.params.id);
        const imoveis = await Imoveis.paginate(filters, {
            limit: 20,
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(imoveis);
    }

    async show(req, res) {
        const imoveis = await Imoveis.findById(req.params.id);
        return res.json(imoveis);
    }

    async store(req, res) {
        const imoveis = await Imoveis.create({
            ...req.body
        });

        return res.json(imoveis);
    }

    async update(req, res) {
        const imoveis = await Imoveis.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        return res.json(imoveis);
    }

    async destroy(req, res) {
        const imoveis = await Imoveis.findByIdAndDelete(req.params.id);
        return res.send(imoveis);
    }
}

module.exports = new ImoveisController();
