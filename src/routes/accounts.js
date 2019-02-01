import AccountsController from "../app/controllers/AccountsController";

const express = require("express");
const routes = express.Router();
const validators = require("../app/validators");
const validate = require("express-validation");
const handle = require("express-async-handler");

/**
 * Accounts
 */
routes.post(
    "/",
    validate(validators.Accounts.Company),
    handle(AccountsController.company)
);

routes.post(
    "/company",
    validate(validators.Accounts.Company),
    handle(AccountsController.company)
);

routes.get(
    "/active/code/:code",
    validate(validators.Accounts.Active),
    handle(AccountsController.active)
);

module.exports = routes;
