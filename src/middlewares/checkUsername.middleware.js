"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = require("../configs");
const checkUsername = (req, res, next) => {
    const { username } = req.body;
    const findUser = configs_1.USERS.find((user) => user.username === username);
    if (findUser) {
        return res.status(422).json({ message: "You can not use this username." });
    }
    else
        return next();
};
exports.default = checkUsername;
