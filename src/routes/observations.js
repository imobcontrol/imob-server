import express from "express";
import authMiddleware from "../middlewares/auth";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

routes.use(authMiddleware);

/**
 * Comentarios
 */
routes.get("/:id", handle(controllers.ObservationsController.index));
routes.get("/:id", handle(controllers.ObservationsController.show));
routes.post(
    "/",
    validate(validators.Observations),
    handle(controllers.ObservationsController.store)
);
routes.put(
    "/:id",
    validate(validators.Observations),
    handle(controllers.ObservationsController.update)
);
routes.delete("/:id", handle(controllers.ObservationsController.destroy));

module.exports = routes;
