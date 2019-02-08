import express from "express";
import authMiddleware from "../middlewares/auth";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

routes.use(authMiddleware);

/**
 * Clientes
 */
routes.get("/", handle(controllers.PersonsController.index));
routes.get("/:id", handle(controllers.PersonsController.show));
routes.post(
    "",
    validate(validators.Clientes),
    handle(controllers.PersonsController.store)
);
routes.put(
    "/:id",
    validate(validators.Clientes),
    handle(controllers.PersonsController.update)
);
routes.delete("/:id", handle(controllers.PersonsController.destroy));

module.exports = routes;
