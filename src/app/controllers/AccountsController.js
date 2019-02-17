import Accounts from "../models/Accounts";
import AccountActiveMail from "../jobs/AccountActiveMail";
import AccountRecoveryMail from "../jobs/AccountRecoveryMail";
import bcrypt from "bcryptjs";
const uuidv4 = require("uuid/v4");

import * as controller from "./";
import Queue from "../services/Queue";

const createQueue = ({ email, code }) => {
    const account = {
        email,
        link: `${process.env.CLIENT_URL}/account/active/${code}`
    };

    Queue.create(AccountActiveMail.key, { account }).save();
};

const recoveryQueue = ({ email, code }) => {
    const account = {
        email,
        link: `${process.env.CLIENT_URL}/account/recovery/${code}`
    };

    Queue.create(AccountRecoveryMail.key, { account }).save();
};

const createAccount = async ({ email, password }) => {
    if (await Accounts.findOne({ email })) {
        throw new Error("Você já está registrado.");
    }

    let account = await Accounts.create({ email, password });
    createQueue(account);

    account = account.toObject();

    delete account.password;
    delete account.code;

    return account;
};

const AccountController = {
    active: async (req, res) => {
        const { code } = req.params;

        const account = await Accounts.findOneAndUpdate(
            { code },
            { $set: { status: "actived" } },
            { new: true }
        );

        if (!account) {
            return res
                .status(400)
                .json({ error: "Código não econtrado ou inválido!" });
        }

        return res.status(200).json({ message: "Código ativado" });
    },

    resend: async (req, res) => {
        const { email } = req.params;

        const account = await Accounts.findOne({ email, status: "pending" });

        if (!account) {
            return res.status(400).json({ error: "Cadastro não econtrado" });
        }

        createQueue(account);

        return res.status(200).json({ message: "Email reenviado." });
    },

    recovery: async (req, res) => {
        const { email } = req.params;

        const account = await Accounts.findOneAndUpdate(
            { email },
            { $set: { code: uuidv4() } },
            { new: true }
        );

        if (!account) {
            return res.status(400).json({ error: "Cadastro não econtrado" });
        }

        recoveryQueue(account);

        return res
            .status(200)
            .json({ message: "Email de recuperação de senha enviado." });
    },

    changePassword: async (req, res) => {
        const { code, password } = req.body;

        const account = await Accounts.findOneAndUpdate(
            { code },
            { $set: { password: await bcrypt.hash(password, 8) } },
            { new: true }
        );

        if (!account) {
            return res.status(400).json({ error: "Cadastro não econtrado" });
        }

        return res.status(200).json({ message: "Senha alterada com sucesso." });
    },

    company: async (req, res) => {
        try {
            const { email, password } = req.body;

            // create account
            const account = await createAccount({ email, password });

            // admin of company
            req.body.admin = account._id;
            req.body.accounts = account._id;

            //create company
            const company = await controller.CompaniesController.store(req);

            return res.status(200).json(company);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
};

export default AccountController;
