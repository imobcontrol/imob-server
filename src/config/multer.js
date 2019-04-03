import multer from "multer";
import path from "path";
import crypto from "crypto";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                file.key = `${hash.toString("hex")}-${file.originalname}`;
                console.log();
                cb(null, file.key);
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3({ ACL: "public-read" }),
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            const companyId = req.companyId;
            const imovelId = req.params.id;

            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                const ext = file.originalname.split(".").pop();
                const fileName = `${companyId}/${imovelId}/original/${hash.toString(
                    "hex"
                )}.${ext}`;
                cb(null, fileName);
            });
        }
    })
};

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
};
