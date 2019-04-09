import cheerio from "cheerio";
import request from "request-promise";

export default async function get(inscricao) {
    const result = await request.post({
        url: "http://www.fazenda.df.gov.br/aplicacoes/iptu/consulta_iptu.cfm",
        form: {
            rdSeleciona: "normal",
            exercicio: 2019,
            TipoTributo: 3,
            inscricao
        }
    });

    let $ = cheerio.load(result);

    // Detalhes
    const detalhes = $(".conteudoarea tbody")
        .first()
        .html();

    // Parcelas
    const parcelas = $(".conteudoarea")
        .eq(1)
        .find("tbody")
        .html();

    return { detalhes, parcelas };
}
