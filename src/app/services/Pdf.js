import path from "path";
import moment from "moment";
import repeat from "handlebars-helper-repeat";
import expHandlebars from "express-handlebars";
import pdf from "html-pdf";
import AWS from "aws-sdk";
import uuidv1 from "uuid/v1";
import Puppeteer from "puppeteer";

const s3 = new AWS.S3();

const exphdb = expHandlebars.create({
    helpers: {
        repeat,
        formatDate: function(date, format) {
            return moment(date).format(format);
        }
    }
});

class Pdf {
    async create(res, companyId, context, template) {
        try {
            const html = await exphdb.render(
                path.resolve(__dirname, "..", "views", template),
                context
            );

            // if (process.env.NODE_ENV === "production") {
            //     options.phantomPath = "./phantomjs_linux-x86_64";
            // }
            res.setHeader("Content-Type", "application/pdf");

            const browser = await Puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html);

            return page.pdf();
        } catch (e) {
            console.log(e);
            res.status(500).send();
        }
    }
}

export default new Pdf();
