const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

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
    }
};

AccountsSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
};

module.exports = mongoose.model("Accounts", AccountsSchema);
