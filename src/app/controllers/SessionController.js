const Persons = require("../models/Persons");

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await Persons.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!(await user.compareHash(password))) {
            return res.status(400).json({ error: "Invalid password" });
        }

        return res.json({ user, token: Persons.generateToken(user) });
    }
}

module.exports = new SessionController();
