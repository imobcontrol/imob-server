import express from "express";
import authMiddleware from "../middlewares/auth";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

routes.use(authMiddleware);

/**
 * Imoveis
 */
routes.get("/list/:id", handle(controllers.ImoveisController.index));
routes.get("/list", handle(controllers.ImoveisController.list));
routes.get("/:id", handle(controllers.ImoveisController.show));
routes.post(
    "/",
    validate(validators.Imoveis),
    handle(controllers.ImoveisController.store)
);
routes.put(
    "/:id",
    validate(validators.Imoveis),
    handle(controllers.ImoveisController.update)
);
routes.delete("/:id", handle(controllers.ImoveisController.destroy));

module.exports = routes;
