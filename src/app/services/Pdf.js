import path from "path";
import moment from "moment";
import repeat from "handlebars-helper-repeat";
import expHandlebars from "express-handlebars";
import pdf from "html-pdf";
import AWS from "aws-sdk";
import uuidv1 from "uuid/v1";

const s3 = new AWS.S3();

class Pdf {
    async create(res, companyId, context, template) {
        try {
            const exphdb = expHandlebars.create({
                partialsDir: path.resolve(__dirname, "..", "views", "partials"),
                helpers: {
                    repeat,
                    formatDate: function(date, format) {
                        return moment(date).format(format);
                    }
                }
            });

            console.log(path.resolve(__dirname, "..", "views", template));
            const html = await exphdb.render(
                path.resolve(__dirname, "..", "views", template),
                context
            );

            let options = {
                format: "A4",
                width: "400px",
                border: {
                    top: "15px", // default is 0, units: mm, cm, in, px
                    bottom: "15px",
                    right: "15px",
                    left: "15px"
                },
                timeout: 10000,
                renderDelay: 1000,
                phantomArgs: "--ignore-ssl-errors=yes"
            };

            // if (process.env.NODE_ENV === "production") {
            //     options.phantomPath = "./phantomjs_linux-x86_64";
            // }

            res.setHeader("Content-type", "application/pdf");

            pdf.create(html, options).toStream(function(err, stream) {
                if (!err) {
                    stream.pipe(res).on("finish", function() {
                        // finished
                        res.status(200);
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    }
}

export default new Pdf();
