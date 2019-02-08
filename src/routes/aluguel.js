import express from "express";
import authMiddleware from "../middlewares/auth";
import * as validators from "../app/validators";
import * as controllers from "../app/controllers";
import validate from "express-validation";
import handle from "express-async-handler";

const routes = express.Router();

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

export default routes;
