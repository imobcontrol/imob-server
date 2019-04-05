import nodeMailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import exphbs from "express-handlebars";
import sgTransport from "nodemailer-sendgrid-transport";

const options = {
    auth: {
        api_key: process.env.SENDGRID_API_KEY
    }
};

const transport = nodeMailer.createTransport(sgTransport(options));

transport.use(
    "compile",
    hbs({
        viewEngine: exphbs(),
        partialsDir: path.resolve(__dirname, "..", "views", "emails"),
        viewPath: path.resolve(__dirname, "..", "views", "emails"),
        extName: ".hbs"
    })
);

export default transport;
