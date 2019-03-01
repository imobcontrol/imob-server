import Score from "../models/Score";

const ScoreController = {
    index: async (req, res) => {
        const score = await Score.findOne({ cpf: req.query.cpf });
        return res.json(score);
    },

    store: async (req, res) => {
        let score = await Score.findOne({ cpf: req.body.cpf });
        if (!score) {
            score = await Score.create(req.body);
        }
        return res.json(score);
    },

    update: async (req, res) => {
        const person = await Score.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        return res.json(person);
    }
};

export default ScoreController;
