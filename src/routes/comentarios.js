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
routes.get("/:id", handle(controllers.ComentariosController.index));
routes.get("/:id", handle(controllers.ComentariosController.show));
routes.post(
    "/",
    validate(validators.Comentarios),
    handle(controllers.ComentariosController.store)
);
routes.put(
    "/:id",
    validate(validators.Comentarios),
    handle(controllers.ComentariosController.update)
);
routes.delete("/:id", handle(controllers.ComentariosController.destroy));

module.exports = routes;
