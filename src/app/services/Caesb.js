import cheerio from "cheerio";
import request from "request-promise";

export default async function get(inscricao) {
    const result = await request.post({
        url:
            "https://www.caesb.df.gov.br/segunda-via-de-conta-agencia-virtual.html",
        form: {
            idCliente: inscricao || 1148583
        }
    });

    let $ = await cheerio.load(result);

    const parcelas = await $(".form-horizontal")
        .children()
        .html();

    return { parcelas, result };
}
