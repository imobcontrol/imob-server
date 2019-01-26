const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middlewares/auth");
const validators = require("../app/validators");
const controllers = require("../app/controllers");
const validate = require("express-validation");
const handle = require("express-async-handler");

routes.use(authMiddleware);

/**
 * Alugueis
 */
routes.get("/", handle(controllers.AlugueisController.index));

routes.get(
    "/recibo/:id_aluguel/:id_parcela",
    handle(controllers.AlugueisController.recibo)
);

routes.post(
    "/",
    validate(validators.Alugueis),
    handle(controllers.AlugueisController.store)
);

routes.put(
    "/parcela/:id",
    handle(controllers.AlugueisController.pagamentoParcela)
);

routes.put(
    "/:id",
    validate(validators.Alugueis),
    handle(controllers.AlugueisController.update)
);

routes.get("/:id", handle(controllers.AlugueisController.show));

routes.delete("/:id", handle(controllers.AlugueisController.destroy));

module.exports = routes;
