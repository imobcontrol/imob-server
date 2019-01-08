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
        const { startDate, endDate } = req.body;

        //pega a quantidade de parcelas de definido pelas datas.
        const qtdParcelas = moment(endDate).diff(startDate, "months", true);

        //cria array com a quantidade de parcelas definidas
        const parcelas = [];
        for (var i = 0; i < qtdParcelas; i++) {
            parcelas.push({
                dataInicial: moment(startDate)
                    .add(i, "M")
                    .format(),
                dataFinal: moment(startDate)
                    .add(i + 1, "M")
                    .format()
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

    async recibo(req, res) {
        const aluguel = await Alugueis.findOne({
            _id: req.params.id_aluguel
        }).populate(["locatario", "imovel", "locador"]);

        const parcela = aluguel.parcelas.find(
            parcela => `${parcela._id}` === req.params.id_parcela
        );

        // UPDATE recibo to True
        if (parcela.pago) {
            const context = {
                parcela,
                aluguel,
                total: parcela.valor - parcela.desconto
            };
            Pdf.create(res, context, "aluguel/recibo.hbs");
        }
    }

    async destroy(req, res) {
        const aluguel = await Alugueis.findByIdAndDelete(req.params.id);
        return res.send(aluguel);
    }
}

module.exports = new AlugueisController();
