import express from "express";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import authMiddleware from "../middlewares/auth";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

/**
 * Sessiosn
 */
routes.post(
    "/",
    validate(validators.Session),
    handle(controllers.SessionController.login)
);

routes.use(authMiddleware);

routes.get("/", handle(controllers.SessionController.loggedUser));

export default routes;
