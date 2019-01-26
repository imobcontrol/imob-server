const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middlewares/auth");
const validators = require("../app/validators");
const controllers = require("../app/controllers");
const validate = require("express-validation");
const handle = require("express-async-handler");

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
