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
                partialsDir: path.resolve(__dirname, "..", "views", template),
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

            if (process.env.NODE_ENV === "production") {
                options.phantomPath = "./phantomjs_linux-x86_64";
            }

            console.log(html);

            pdf.create(html, options).toStream(async (err, stream) => {
                if (err) return console.log(err);
                const uuid = uuidv1();
                await s3
                    .putObject({
                        Body: stream,
                        ACL: "public-read",
                        ContentType: "application/pdf",
                        Bucket: `imob-pdf/${companyId}`,
                        Key: uuid + ".pdf"
                    })
                    .promise();
                return res.status(200).json({
                    url: `${
                        process.env.S3_URl
                    }/imob-pdf/${companyId}/${uuid}.pdf`
                });
            });
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    }
}

export default new Pdf();
