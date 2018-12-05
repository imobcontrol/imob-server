const Ad = require("../models/Ad");

class AdController {
    async index(req, res) {
        const filters = {};

        if (req.query.price_min || req.query.price_max) {
            filters.price = {};

            if (req.query.price_min) {
                filters.price.$gte = req.query.price_min;
            }

            if (req.query.price_max) {
                filters.price.$lte = req.query.price_max;
            }
        }

        if (req.query.title) {
            filters.title = new RegExp(req.query.title, "i");
        }

        const ads = await Ad.paginate(filters, {
            populate: ["author"],
            limit: 20,
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(ads);
    }

    async show(req, res) {
        const ads = await Ad.findById(req.params.id);

        return res.json(ads);
    }

    async store(req, res) {
        const ad = await Ad.create({ ...req.body, author: req.userId });

        return res.json(ad);
    }

    async update(req, res) {
        const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        return res.json(ad);
    }

    async destroy(req, res) {
        const ad = await Ad.findByIdAndDelete(req.params.id);

        return res.send();
    }
}

module.exports = new AdController();
