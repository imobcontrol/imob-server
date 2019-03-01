import express from "express";
import authMiddleware from "../middlewares/auth";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

routes.use(authMiddleware);

/**
 * Score
 */
routes.get(
    "/",
    validate(validators.Score.params),
    handle(controllers.ScoreController.index)
);

module.exports = routes;
