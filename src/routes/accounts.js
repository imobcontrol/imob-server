import express from "express";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

/**
 * Accounts
 */
routes.post(
    "/",
    validate(validators.Accounts.Company),
    handle(controllers.AccountsController.company)
);

routes.post(
    "/company",
    validate(validators.Accounts.Company),
    handle(controllers.AccountsController.company)
);

routes.get(
    "/active/code/:code",
    validate(validators.Accounts.Active),
    handle(controllers.AccountsController.active)
);

routes.get(
    "/resend/email/:email",
    validate(validators.Accounts.Resend),
    handle(controllers.AccountsController.resend)
);

module.exports = routes;
