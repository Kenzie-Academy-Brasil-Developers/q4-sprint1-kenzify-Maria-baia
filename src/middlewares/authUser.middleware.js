"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const authUser = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).json({ message: "missing header authorization." });
    }
    const token = req.headers.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, configs_1.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const userAuthenticated = configs_1.USERS.find((user) => user.username === decoded.username);
        req.userAuthenticated = userAuthenticated;
    });
    return next();
};
exports.default = authUser;
