const Accounts = require("../models/Accounts");
const ActiveAccountMail = require("../jobs/ActiveAccountMail");
const Queue = require("../services/Queue");

const createQueue = ({ email, activeCode }) => {
    const account = {
        email,
        link: `${process.env.BASE_URL}:${
            process.env.PORT
        }/account/active/code/${activeCode}`
    };

    Queue.create(ActiveAccountMail.key, { account }).save();
};

class AccountsController {
    async store(req, res) {
        const { email } = req.body;

        if (await Accounts.findOne({ email })) {
            return res.status(400).json({ error: "Account already exists" });
        }

        let account = await Accounts.create(req.body);
        createQueue(account);

        account = await account.toObject();

        delete account.password;
        delete account.code;

        return res.json(account);
    }

    async active(req, res) {
        const { code } = req.params;

        const account = await Accounts.findOneAndUpdate(
            { code },
            { $set: { status: "actived" } },
            { new: true }
        );

        if (!account) {
            return res.status(400).json({ error: "Code not found" });
        }

        return res.status(200).json({ message: "Code actived" });
    }
}

module.exports = new AccountsController();
