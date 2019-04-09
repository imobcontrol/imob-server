import express from "express";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import authMiddleware from "../middlewares/auth";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

/**
 * Accounts
 */
routes.post(
    "/company",
    validate(validators.Accounts.Company),
    handle(controllers.AccountsController.company)
);

routes.post(
    "/recovery/password",
    validate(validators.Accounts.Password),
    handle(controllers.AccountsController.changePassword)
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

routes.get(
    "/recovery/email/:email",
    validate(validators.Accounts.Recovery),
    handle(controllers.AccountsController.recovery)
);

routes.use(authMiddleware);

routes.post(
    "/user",
    validate(validators.Accounts.User),
    handle(controllers.AccountsController.user)
);

module.exports = routes;
