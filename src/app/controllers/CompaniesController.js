import Companies from "../models/Companies";

class CompaniesController {
    async store(req, res) {
        return Companies.create(req.body);
    }
}

export default new CompaniesController();
