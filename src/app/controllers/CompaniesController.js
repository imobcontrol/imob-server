import Companies from "../models/Companies";

class CompaniesController {
    async store(req, res) {
        return Companies.create(req.body);
    }

    async addUser({ companyId, accountId }) {
        const response = await Companies.findOneAndUpdate(
            { _id: companyId },
            { $push: { accounts: accountId } },
            { new: true }
        );

        return response;
    }
}

export default new CompaniesController();
