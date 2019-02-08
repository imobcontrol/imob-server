import nodeMailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import exphbs from "express-handlebars";
import mailConfig from "../../config/mail";

const transport = nodeMailer.createTransport(mailConfig);

transport.use(
    "compile",
    hbs({
        viewEngine: exphbs(),
        viewPath: path.resolve(__dirname, "..", "views", "emails"),
        extName: ".hbs"
    })
);

export default transport;
