require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const Youch = require("youch");
const forTerminal = require("youch-terminal");
const validate = require("express-validation");
const sentryConfig = require("./config/sentry");
const dbConfig = require("./config/database");
const routes = require("./routes");
// const Sentry = require('@sentry/node');

class App {
    constructor() {
        this.express = express();
        this.isDev = process.env.NODE_ENV !== "production";

        // this.sentry();
        this.middlewares();
        this.database();
        this.routes();
        this.exception();
    }

    sentry() {
        Sentry.init(sentryConfig);
    }

    middlewares() {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(express.json());
        // this.express.use(Sentry.Handlers.errorHandler());
    }

    database() {
        mongoose.connect(
            dbConfig.uri,
            {
                useCreateIndex: true,
                useNewUrlParser: true
            }
        );
    }

    routes() {
        this.express.use("/sessions", routes.sessions);
        this.express.use("/accounts", routes.accounts);

        // required jwt
        this.express.use("/imoveis", routes.imoveis);
        this.express.use("/aluguel", routes.aluguel);
        this.express.use("/clientes", routes.persons);
        this.express.use("/comentarios", routes.comentarios);
    }

    exception() {
        if (process.env.NODE_ENV === "production") {
            //  this.express.use(Sentry.Handlers.errorHandler());
        }

        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err);
            }

            if (process.env.NODE_ENV !== "production") {
                const youch = await new Youch(err, req).toJSON(); // Não precisa do req se for JSON, só HTML
                console.log(forTerminal(youch));
                return res.json(youch);
            }

            return res
                .status(err.status || 500)
                .json({ error: "Internal server error" });
        });
    }
}

module.exports = new App().express;
