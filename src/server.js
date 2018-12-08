require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Youch = require("youch");
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
        this.express.use(routes);
    }

    exception() {
        if (process.env.NODE_ENV === "production") {
            this.express.use(Sentry.Handlers.errorHandler());
        }

        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err);
            }

            if (process.env.NODE_ENV !== "production") {
                const youch = new Youch(err, req); // Não precisa do req se for JSON, só HTML

                return res.json(await youch.toJSON());
            }

            return res
                .status(err.status || 500)
                .json({ error: "Internal server error" });
        });
    }
}

module.exports = new App().express;
