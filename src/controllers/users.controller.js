"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRegister = exports.usersLogin = exports.getUsers = void 0;
const configs_1 = require("../configs");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const getUsers = (req, res) => {
    const listUsersWithoutPassword = JSON.parse(JSON.stringify(configs_1.USERS));
    listUsersWithoutPassword.forEach((u) => delete u.password);
    return res.status(200).json(listUsersWithoutPassword);
};
exports.getUsers = getUsers;
const usersLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = configs_1.USERS.find((u) => u.username === data.username);
    if (!user) {
        return res.status(401).json({ message: "Wrong credentials. Try again!" });
    }
    const match = yield bcryptjs_1.default.compare(data.password, user.password);
    if (!match) {
        return res.status(401).json({ message: "Wrong credentials. Try again!" });
    }
    const token = jsonwebtoken_1.default.sign({
        username: data.username,
        password: user.password,
    }, configs_1.jwtSecret, { expiresIn: configs_1.jwtTokenExpiration });
    return res.status(200).json({ accessToken: token });
});
exports.usersLogin = usersLogin;
const usersRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
    const user = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, req.body), { password: hashedPassword, playlist: {} });
    const userWithoutPassword = JSON.parse(JSON.stringify(user));
    delete userWithoutPassword.password;
    configs_1.USERS.push(user);
    return res.status(201).json(userWithoutPassword);
});
exports.usersRegister = usersRegister;
