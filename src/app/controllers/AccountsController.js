const Accounts = require("../models/Accounts");
const Companies = require("../models/Companies");
const CompaniesController = require("../controllers/CompaniesController");
const ActiveAccountMail = require("../jobs/ActiveAccountMail");
const Queue = require("../services/Queue");

const createQueue = ({ email, code }) => {
    const account = {
        email,
        link: `${process.env.BASE_URL}:${
            process.env.PORT
        }/account/active/code/${code}`
    };

    Queue.create(ActiveAccountMail.key, { account }).save();
};

const AccountController = {
    store: async (req, res) => {
        const { email, password } = req.body;

        if (await Accounts.findOne({ email })) {
            return res.status(400).json({ error: "Account already exists" });
        }

        let account = await Accounts.create({ email, password });
        createQueue(account);

        account = account.toObject();

        delete account.password;
        delete account.code;

        return account;
    },

    active: async (req, res) => {
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
    },

    company: async (req, res) => {
        await AccountController.store();
        const company = await Companies.create(req.body);

        return res.json(company);
    }
};
