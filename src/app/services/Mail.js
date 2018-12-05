const nodeMailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");
const mailConfig = require("../../config/mail");

const transport = nodeMailer.createTransport(mailConfig);

transport.use(
    "compile",
    hbs({
        viewEngine: exphbs(),
        viewPath: path.resolve(__dirname, "..", "views", "emails"),
        extName: ".hbs"
    })
);

module.exports = transport;
