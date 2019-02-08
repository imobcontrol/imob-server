import path from "path";
import moment from "moment";
import repeat from "handlebars-helper-repeat";
import expHandlebars from "express-handlebars";
import pdf from "html-pdf";

const exphdb = expHandlebars.create({
    helpers: {
        repeat,
        formatDate: function(date, format) {
            return moment(date).format(format);
        }
    }
});

class Pdf {
    async create(res, context, template) {
        try {
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
            res.status(500);
        }
    }
}

export default new Pdf();
