const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middlewares/auth");
const validators = require("../app/validators");
const controllers = require("../app/controllers");
const validate = require("express-validation");
const handle = require("express-async-handler");

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
