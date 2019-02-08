import express from "express";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

/**
 * Sessiosn
 */
routes.post(
    "/",
    validate(validators.Session),
    handle(controllers.SessionController.store)
);

export default routes;
