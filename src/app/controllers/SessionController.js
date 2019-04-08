import Accounts from "../models/Accounts";
import Persons from "../models/Persons";
import Companies from "../models/Companies";

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const account = await Accounts.findOne({ email });

        // not found
        if (!account) {
            return res
                .status(400)
                .json({ error: "Seu cadastro não foi encontrado." });
        }

        // password
        if (!(await account.compareHash(password))) {
            return res
                .status(400)
                .json({ error: "Usuário ou senha inválida." });
        }

        // status
        if (!account.checkStatus()) {
            return res.status(400).json({
                error: "Sua conta não foi verificada, visualize seu email."
            });
        }

        const companie = await Companies.findOne({ accounts: [account._id] });

        return res.json({
            account,
            token: Accounts.generateToken({ account, companie })
        });
    }

    async loggedUser(req, res) {
        const account = await Persons.findOne({
            account: req.accountId
        }).populate("account");
        return res.json(account);
    }
}

export default new SessionController();
