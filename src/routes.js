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
 * Clientes
 */
routes.get("/clientes", handle(controllers.ClientesController.index));
routes.get("/clientes/:id", handle(controllers.ClientesController.show));
routes.post(
    "/clientes",
    validate(validators.Clientes),
    handle(controllers.ClientesController.store)
);
routes.put(
    "/clientes/:id",
    validate(validators.Clientes),
    handle(controllers.ClientesController.update)
);
routes.delete("/clientes/:id", handle(controllers.ClientesController.destroy));

/**
 * Imoveis
 */
routes.get("/imoveis/list/:id", handle(controllers.ImoveisController.index));
routes.get("/imoveis/:id", handle(controllers.ImoveisController.show));
routes.post(
    "/imoveis",
    validate(validators.Imoveis),
    handle(controllers.ImoveisController.store)
);
routes.put(
    "/imoveis/:id",
    validate(validators.Imoveis),
    handle(controllers.ImoveisController.update)
);
routes.delete("/imoveis/:id", handle(controllers.ImoveisController.destroy));

/**
 * Comentarios
 */
routes.get("/comentarios/:id", handle(controllers.ComentariosController.index));
routes.get("/comentarios/:id", handle(controllers.ComentariosController.show));
routes.post(
    "/comentario",
    validate(validators.Comentarios),
    handle(controllers.ComentariosController.store)
);
routes.put(
    "/comentario/:id",
    validate(validators.Comentarios),
    handle(controllers.ComentariosController.update)
);
routes.delete(
    "/comentario/:id",
    handle(controllers.ComentariosController.destroy)
);

/**
 * Alugueis
 */
routes.get("/alugueis", handle(controllers.AlugueisController.index));
routes.get("/alugueis/:id", handle(controllers.AlugueisController.show));
routes.post(
    "/aluguel",
    validate(validators.Alugueis),
    handle(controllers.AlugueisController.store)
);
routes.put(
    "/aluguel/:id",
    validate(validators.Alugueis),
    handle(controllers.AlugueisController.update)
);
routes.delete("/aluguel/:id", handle(controllers.AlugueisController.destroy));
module.exports = routes;
