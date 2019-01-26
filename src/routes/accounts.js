const express = require("express");
const routes = express.Router();
const validators = require("../app/validators");
const controllers = require("../app/controllers");
const validate = require("express-validation");
const handle = require("express-async-handler");
/**
 * Accounts
 */

routes.post(
    "/",
    validate(validators.Accounts.Store),
    handle(controllers.AccountsController.store)
);

routes.get(
    "/active/code/:code",
    validate(validators.Accounts.Active),
    handle(controllers.AccountsController.active)
);

module.exports = routes;
