const Accounts = require("../models/Accounts");
const Companies = require("../models/Companies");
const AccountsController = require("../controllers/AccountsController");

class CompaniesController {
    async store(req, res) {
        await AccountsController.store(req, res);

        const company = await Companies.create(req.body);

        return res.json(company);
    }
}

module.exports = new CompaniesController();
