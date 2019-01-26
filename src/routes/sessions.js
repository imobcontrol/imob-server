const express = require("express");
const routes = express.Router();
const validators = require("../app/validators");
const controllers = require("../app/controllers");
const validate = require("express-validation");
const handle = require("express-async-handler");
/**
 * Sessiosn
 */
routes.post(
    "/",
    validate(validators.Session),
    handle(controllers.SessionController.store)
);
module.exports = routes;
