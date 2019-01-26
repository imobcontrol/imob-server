const Persons = require("../models/Persons");

class PersonsController {
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

        const persons = await Persons.paginate(filters, {
            limit: 20,
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(persons);
    }

    async show(req, res) {
        const persons = await Persons.findById(req.params.id);
        return res.json(persons);
    }

    async store(req, res) {
        const person = await Persons.create({
            ...req.body
        });

        return res.json(person);
    }

    async update(req, res) {
        const person = await Persons.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        return res.json(person);
    }

    async destroy(req, res) {
        const person = await Persons.findByIdAndDelete(req.params.id);
        return res.send(person);
    }
}

module.exports = new PersonsController();
