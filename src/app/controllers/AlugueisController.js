const moment = require("moment");
const Alugueis = require("../models/Alugueis");
const Pdf = require("../services/Pdf");

class AlugueisController {
    async index(req, res) {
        const filters = {};

        const { nome, price_min, price_max } = req.query;

        if (price_min || price_max) {
            filters.price = {};

            if (price_min) {
                filters.price.$gte = price_min;
            }

            if (price_max) {
                filters.price.$lte = price_max;
            }
        }

        if (nome) {
            filters.nome = new RegExp(nome, "i");
        }

        const aluguel = await Alugueis.paginate(filters, {
            limit: 20,
            page: req.query.page || 1,
            populate: ["imovel", "locatario", "locador"],
            sort: "-createdAt"
        });

        return res.json(aluguel);
    }

    async show(req, res) {
        const aluguel = await Alugueis.findById(req.params.id).populate([
            "locatario"
        ]);

        //TODO: Remover em produção
        setTimeout(() => {
            return res.json(aluguel);
        }, 2000);
    }

    async store(req, res) {
        const { startDate, endDate, qtdDias } = req.body;

        //pega a quantidade de parcelas de definido pelas datas.
        const qtdParcelas = moment(endDate).diff(startDate, "months", true);

        //cria array com a quantidade de parcelas definidas
        const parcelas = [];
        for (var i = 0; i < qtdParcelas; i++) {
            const dataInicial = moment(startDate)
                .add(i, "M")
                .format();

            const dataFinal = moment(startDate)
                .add(i + 1, "M")
                .format();

            const qtd = i === 0 ? qtdDias : 0;

            parcelas.push({
                dataInicial,
                dataFinal,
                qtdDias: qtd
            });
        }

        delete req.body.startDate;
        delete req.body.endDate;

        req.body.parcelas = parcelas;
        req.body.ativo = true;

        const aluguel = await Alugueis.create({ ...req.body });
        return res.json(aluguel);
    }

    async update(req, res) {
        const aluguel = await Alugueis.findByIdAndUpdate(
            req.params.id,
            { aluguel: req.body },
            { new: true }
        );

        return res.json(aluguel);
    }

    async pagamentoParcela(req, res) {
        const result = await Alugueis.findOneAndUpdate(
            {
                "parcelas._id": req.body._idParcela
            },
            {
                $set: {
                    "parcelas.$.pago": true,
                    "parcelas.$.valor": req.body.valor,
                    "parcelas.$.desconto": req.body.desconto,
                    "parcelas.$.observacao": req.body.observacao,
                    "parcelas.$.despesasTotal": req.body.despesasTotal,
                    "parcelas.$.despesas": req.body.despesas
                }
            },
            { new: true }
        );

        return res.send(result);
    }

    async recibo(req, res) {
        const aluguel = await Alugueis.findOne({
            _id: req.params.id_aluguel
        }).populate(["locatario", "imovel", "locador"]);

        const parcela = aluguel.parcelas.find(
            parcela => `${parcela._id}` === req.params.id_parcela
        );

        // UPDATE recibo to True
        if (parcela.pago) {
            // cria o pdf
            const context = {
                parcela,
                aluguel,
                total: parcela.valor - parcela.desconto
            };

            // atualiza status do recibo
            await Alugueis.updateOne(
                {
                    "parcelas._id": parcela._id
                },
                {
                    $set: {
                        "parcelas.$.recibo": true
                    }
                }
            );

            await Pdf.create(res, context, "aluguel/recibo.hbs");
        }
    }

    async destroy(req, res) {
        const aluguel = await Alugueis.findByIdAndDelete(req.params.id);
        return res.send(aluguel);
    }
}

module.exports = new AlugueisController();
