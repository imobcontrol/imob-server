import cheerio from "cheerio";
import request from "request-promise";

export async function get() {
    const result = await request.post({
        url: "http://www.fazenda.df.gov.br/aplicacoes/iptu/consulta_iptu.cfm",
        form: {
            rdSeleciona: "normal",
            exercicio: 2019,
            TipoTributo: 3,
            inscricao: 52391450
        }
    });

    let $ = cheerio.load(result);
    var output = {};

    // DETALHES
    $(".conteudoarea tbody")
        .first()
        .children()
        .map(function(i, el) {
            // this === el

            let linha = $(this)
                .text()
                .trim()
                .split(":");

            linha[0] = linha[0].replace(/ /g, "");
            if (linha[1]) {
                linha[1] = linha[1].trim();
                output[linha[0]] = linha[1];
            }
        });

    // DETALHES
    const arros = $(".conteudoarea")
        .eq(1)
        .find("tbody")
        .map(() => {
            console.log($(this).html());
        })
        .html();

    console.log(arros);
    // console.log(resultado);
    // console.log(dados.replace(/ /g, ""));
    // let var1 = dados.replace(/ /g, "");
    // // console.log(var1.replace(/[\n\r]/g, ""));
    // var1 = var1.replace(/[\n\r]/g, "");
    // var1 = var1.replace(/,\s+/, ",");
    // var1 = var1.replace(/(\r\n|\n|\r)/gm, "");
    // var1 = var1.replace(/[\n\r]/g, "");
    // console.log(var1);
    // var1 = var1.split(/(\s+)/);
    // console.log(var1);
    // let newVar = [];
    // const result2 = var1.forEach(teste =>
    //     console.log(teste);
    //     newVar.push(teste.replace(/,\s+/, ","))
    // );
    // console.log(result2);
    // const var3 = var2.split(" ");
}
