const Alugueis = require("../models/Alugueis");

class AlugueisController {
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

        const alugueis = await Alugueis.paginate(filters, {
            limit: 20,
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(alugueis);
    }

    async show(req, res) {
        const alugueis = await Alugueis.findById(req.params.id);
        return res.json(alugueis);
    }

    async store(req, res) {
        const aluguel = await Alugueis.create({
            ...req.body
        });

        return res.json(aluguel);
    }

    async update(req, res) {
        const aluguel = await Alugueis.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        return res.json(aluguel);
    }

    async destroy(req, res) {
        const aluguel = await Alugueis.findByIdAndDelete(req.params.id);
        return res.send(aluguel);
    }
}

module.exports = new AlugueisController();
