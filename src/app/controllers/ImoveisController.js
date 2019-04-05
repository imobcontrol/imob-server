import mongoose from "mongoose";
import Imoveis from "../models/Imoveis";
import path from "path";
import fs from "fs";
import AWS from "aws-sdk";

class ImoveisController {
    async index(req, res) {
        const filters = {};

        const { nome, aluguel, price_min, price_max } = req.query;

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
            filters.name = new RegExp(nome, "i");
        }

        if (aluguel) {
            filters.aluguel = { $exists: aluguel };
        }

        // Filter clientId
        filters.proprietario = mongoose.Types.ObjectId(req.params.id);
        const imoveis = await Imoveis.paginate(filters, {
            limit: 20,
            populate: "proprietario",
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(imoveis);
    }

    async list(req, res) {
        const filters = {};

        const { nome, aluguel, price_min, price_max } = req.query;

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
            filters.name = new RegExp(nome, "i");
        }

        if (aluguel) {
            filters.aluguel = { $exists: aluguel };
        }

        const imoveis = await Imoveis.paginate(filters, {
            limit: 20,
            populate: "proprietario",
            page: req.query.page || 1,
            sort: "-createdAt"
        });

        return res.json(imoveis);
    }

    async show(req, res) {
        const imoveis = await Imoveis.findById(req.params.id).populate([
            {
                path: "proprietario"
            },
            {
                path: "aluguel",
                populate: { path: "locatario" }
            }
        ]);

        return res.json(imoveis);
    }

    async store(req, res) {
        req.body.company = req.companyId;
        req.body.account = req.accountId;
        const imoveis = await Imoveis.create(req.body);
        return res.json(imoveis);
    }

    async saveImage(req, res) {
        const { originalname: name, size, key, location: url = "" } = req.file;

        const lambda = new AWS.Lambda();
        const result = await lambda
            .invoke({
                FunctionName: "resize-images-imovel-dev-hello", // the lambda function we are going to invoke
                InvocationType: "RequestResponse",
                Payload: JSON.stringify({ key })
            })
            .promise();

        const imoveis = await Imoveis.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    images: {
                        name,
                        size,
                        key
                    }
                }
            },
            {
                new: true
            }
        );

        return res.json(imoveis);
    }

    async selectedImage(req, res) {
        const { image } = req.body;
        const imovel = await Imoveis.findById(req.params.id).lean();

        const images = imovel.images.map(img => {
            if (img._id.toString() === image) {
                img.selected = true;
            } else {
                img.selected = false;
            }
            return img;
        });

        const result = await Imoveis.update(
            { _id: req.params.id },
            { images },
            { new: true, upsert: true }
        );

        return res.json(result);
    }

    async deleteImage(req, res) {
        const imovel = await Imoveis.findOne({
            "images._id": req.params.id
        }).lean();

        const image =
            imovel &&
            imovel.images.filter(
                imovel => imovel._id.toString() === req.params.id
            )[0];

        if (!image) {
            return res.status(400).json({ error: "Imagem não encontrada" });
        }

        if (process.env.STORAGE_TYPE === "s3") {
            const s3 = new AWS.S3({ httpOptions: { timeout: 2000 } });
            await s3
                .deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: "original/" + image.key
                })
                .promise();

            await s3
                .deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: "large/" + image.key
                })
                .promise();

            await s3
                .deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: "medium/" + image.key
                })
                .promise();

            await s3
                .deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: "thumbnail/" + image.key
                })
                .promise();

            const images = imovel.images.filter(
                image => image._id.toString() !== req.params.id
            );

            const result = await Imoveis.update(
                { _id: imovel._id },
                { images },
                { new: true, upsert: true }
            );

            return res.status(200).json(result);
        } else {
            fs.unlink(
                path.resolve(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    "tmp",
                    "uploads",
                    image.key
                ),
                async err => {
                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }

                    const images = imovel.images.filter(
                        image => image._id.toString() !== req.params.id
                    );

                    const result = await Imoveis.update(
                        { _id: imovel._id },
                        { images },
                        { new: true, upsert: true }
                    );

                    return res.status(200).json(result);
                }
            );
        }
    }

    async update(req, res) {
        const imoveis = await Imoveis.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        return res.json(imoveis);
    }

    async destroy(req, res) {
        const imoveis = await Imoveis.findByIdAndDelete(req.params.id);
        return res.send(imoveis);
    }
}

export default new ImoveisController();
