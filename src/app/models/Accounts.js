import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";

const AccountsSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        code: {
            type: String,
            unique: true
        },
        status: {
            type: String,
            required: true,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

AccountsSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.code = await mongoose.Types.ObjectId();
    this.password = await bcrypt.hash(this.password, 8);
});

AccountsSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password);
    },
    checkStatus() {
        return this.status === "pending" ? false : true;
    }
};

AccountsSchema.statics = {
    generateToken({ account, companie }) {
        return jwt.sign(
            { id: account._id, companie: companie._id },
            authConfig.secret,
            {
                expiresIn: authConfig.ttl
            }
        );
    }
};

export default mongoose.model("Accounts", AccountsSchema);
