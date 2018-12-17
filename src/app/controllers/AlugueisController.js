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

        const aluguel = await Alugueis.paginate(filters, {
            limit: 20,
            page: req.query.page || 1,
            populate: ["imovel", "locatario", "locador"],
            sort: "-createdAt"
        });

        return res.json(aluguel);
    }

    async show(req, res) {
        const aluguel = await Alugueis.findById(req.params.id);
        return res.json(aluguel);
    }

    async store(req, res) {
        const aluguel = await Alugueis.create({ ...req.body });
        return res.json(aluguel);
    }

    async update(req, res) {
        const aluguel = await Alugueis.findByIdAndUpdate(
            req.params.id,
            { aluguel: req.body },
            { new: true }
        );

        return res.json(aluguel);
    }

    async destroy(req, res) {
        const aluguel = await Alugueis.findByIdAndDelete(req.params.id);
        return res.send(aluguel);
    }
}

module.exports = new AlugueisController();
