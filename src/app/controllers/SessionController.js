const Accounts = require("../models/Accounts");

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const account = await Accounts.findOne({ email });

        if (!account) {
            return res.status(400).json({ error: "Account not found" });
        }

        if (!(await account.compareHash(password))) {
            return res.status(400).json({ error: "Invalid password" });
        }

        return res.json({
            account,
            token: Accounts.generateToken(account)
        });
    }
}

module.exports = new SessionController();
