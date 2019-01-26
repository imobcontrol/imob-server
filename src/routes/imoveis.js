const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middlewares/auth");
const validators = require("../app/validators");
const controllers = require("../app/controllers");
const validate = require("express-validation");
const handle = require("express-async-handler");

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
