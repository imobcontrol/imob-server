const Cliente = require("../models/Cliente");

class ClienteController {
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

        const clientes = await Cliente.paginate(filters, {
            limit: 20,
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(clientes);
    }

    async show(req, res) {
        const clientes = await Cliente.findById(req.params.id);

        return res.json(clientes);
    }

    async store(req, res) {
        const cliente = await Cliente.create({
            ...req.body
        });

        return res.json(cliente);
    }

    async update(req, res) {
        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        return res.json(cliente);
    }

    async destroy(req, res) {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        return res.send(cliente);
    }
}

module.exports = new ClienteController();
