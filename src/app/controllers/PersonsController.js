import Persons from "../models/Persons";

const PersonsController = {
    index: async (req, res) => {
        const filters = {};

        const { nome, cpf, price_min, price_max } = req.query;

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
            filters.name = new RegExp(nome, "i");
        }

        if (cpf) {
            filters.cpf = cpf;
        }

        const persons = await Persons.paginate(filters, {
            limit: 20,
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(persons);
    },

    show: async (req, res) => {
        const persons = await Persons.findById(req.params.id);
        return res.json(persons);
    },

    store: async (req, res) => {
        req.body.company = req.companyId;
        req.body.account = req.accountId;

        // verify exist
        const exist = await Persons.findOne({ cpf: req.body.cpf });
        if (exist) {
            return res
                .status(400)
                .json({ error: "Cliente ou cpf já cadastrado." });
        }

        const person = await Persons.create(req.body);
        return res.json(person);
    },

    update: async (req, res) => {
        const person = await Persons.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        return res.json(person);
    },

    destroy: async (req, res) => {
        const person = await Persons.findByIdAndDelete(req.params.id);
        return res.send(person);
    }
};

export default PersonsController;
