import Accounts from "../models/Accounts";
import Persons from "../models/Persons";
import bcrypt from "bcryptjs";
import uuidv4 from "uuid/v4";
import Mail from "../services/Mail";

import * as controller from "./";

const createAccount = async ({ body }) => {
    const { email } = body;

    if (await Accounts.findOne({ email })) {
        throw new Error("Você já está registrado.");
    }

    let account = await Accounts.create(body);

    account = account.toObject();

    const link = `${process.env.CLIENT_URL}/account/active/${account.code}`;

    delete account.password;
    delete account.code;

    await Mail.sendMail({
        from: '"Imob" <imob@gmail.com>',
        to: email,
        subject: `Ativação da sua nova conta Imob`,
        template: "activeAccount",
        context: { account: { email, link } }
    });

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

        account.link = `${process.env.CLIENT_URL}/account/active/${
            account.code
        }`;

        await Mail.sendMail({
            from: '"Imob" <imob@gmail.com>',
            to: account.email,
            subject: `Ativação da sua nova conta Imob`,
            template: "activeAccount",
            context: { account }
        });

        return res.status(200).json({ message: "Email reenviado." });
    },

    recovery: async (req, res) => {
        const { email } = req.params;

        const code = uuidv4();

        const account = await Accounts.findOneAndUpdate(
            { email },
            { $set: { code } },
            { new: true }
        );

        if (!account) {
            return res.status(400).json({ error: "Cadastro não econtrado" });
        }

        const link = `${process.env.CLIENT_URL}/account/recovery/${code}`;

        await Mail.sendMail({
            from: '"Imob" <imob@gmail.com>',
            to: email,
            subject: `Recuperação de senha - Imob`,
            template: "recoveryAccount",
            context: { account: { email, link } }
        });

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

    user: async (req, res) => {
        const { name, phoneNumber } = req.body;

        try {
            // create account
            const account = await createAccount({ body: req.body });

            // add user in company
            const company = await controller.CompaniesController.addUser({
                companyId: req.companyId,
                accountId: account._id
            });

            // create person
            const person = await Persons.create({
                name,
                phoneNumber,
                company: req.companyId,
                account: account._id
            });

            //create company
            return res.status(200).json({ person, account, company });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    company: async (req, res) => {
        try {
            // create account
            const account = await createAccount({ body: req.body });

            // admin of company
            req.body.admin = account._id;
            req.body.accounts = account._id;

            //create company
            const company = await controller.CompaniesController.store(req);

            // create person
            await Persons.create({
                name: "Administrador",
                phoneNumber: "6199999999",
                company: req.companyId,
                account: account._id
            });

            return res.status(200).json(company);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
};

export default AccountController;
