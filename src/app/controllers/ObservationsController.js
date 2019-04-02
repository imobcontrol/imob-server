import Observations from "../models/Observations";

class ObservationsController {
    async index(req, res) {
        const observations = await Observations.find(
            {
                cliente: req.params.id
            },
            {},
            { sort: "-createdAt" }
        ).populate("account");

        return res.json(observations);
    }

    async show(req, res) {
        const observations = await Observations.findById(
            req.params.id
        ).populate("account");
        return res.json(observations);
    }

    async store(req, res) {
        const observations = await Observations.create(req.body);

        const result = await observations.populate("user").execPopulate();

        return res.json(result);
    }

    async update(req, res) {
        const observations = await Observations.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        ).populate("account");

        return res.json(observations);
    }

    async destroy(req, res) {
        const observations = await Observations.findByIdAndDelete(
            req.params.id
        );
        return res.send(observations);
    }
}

export default new ObservationsController();
