const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");
const validators = require("./app/validators");
const controllers = require("./app/controllers");
const validate = require("express-validation");
const handle = require("express-async-handler");

routes.post(
    "/users",
    validate(validators.User),
    handle(controllers.UserController.store)
);
routes.post(
    "/sessions",
    validate(validators.Session),
    handle(controllers.SessionController.store)
);

routes.use(authMiddleware);
/**
 * Ad
 */
routes.get("/clientes", handle(controllers.ClienteController.index));
routes.get("/clientes/:id", handle(controllers.ClienteController.show));
routes.post(
    "/clientes",
    validate(validators.Cliente),
    handle(controllers.ClienteController.store)
);
routes.put(
    "/clientes/:id",
    validate(validators.Cliente),
    handle(controllers.ClienteController.update)
);
routes.delete("/clientes/:id", handle(controllers.ClienteController.destroy));

/**
 * Purchase
 */
routes.post(
    "/purchase",
    validate(validators.Purchase),
    handle(controllers.PurchaseController.store)
);

module.exports = routes;
