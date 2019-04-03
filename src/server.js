import "dotenv/config";
import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import Youch from "youch";
import forTerminal from "youch-terminal";
import validate from "express-validation";
import sentryConfig from "./config/sentry";
import dbConfig from "./config/database";
import rateLimit from "express-rate-limit";
import * as routes from "./routes/index";

const Sentry = require("@sentry/node");
class App {
    constructor() {
        this.express = express();
        this.isDev = process.env.NODE_ENV = !"production";

        this.sentry();
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
        this.express.use(Sentry.Handlers.errorHandler());
        this.express.use(
            "/images",
            express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
        );

        this.express.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Methods",
                "POST, GET, DELETE, OPTIONS"
            );
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
        });
    }

    database() {
        mongoose.connect(dbConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        });
    }

    rateLimiter() {
        return rateLimit({
            windowMs: 5 * 60 * 1000, // 1 hour window
            max: 10, // start blocking after 5 requests
            message: {
                error:
                    "Limite de tentativas excedido, tente novamente em alguns minutos."
            }
        });
    }

    routes() {
        this.express.use("/sessions", this.rateLimiter(), routes.sessions);
        this.express.use("/accounts", this.rateLimiter(), routes.accounts);

        // required jwt
        this.express.use("/imoveis", routes.imoveis);
        this.express.use("/aluguel", routes.aluguel);
        this.express.use("/score", routes.score);

        this.express.use("/clientes", routes.persons);
        this.express.use("/persons", routes.persons);

        this.express.use("/comentarios", routes.observations);
        this.express.use("/observations", routes.observations);

        this.express.options("*", cors());
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
