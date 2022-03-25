"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS = exports.jwtTokenExpiration = exports.jwtSecret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET;
exports.jwtSecret = process.env.JWT_SECRET;
exports.jwtTokenExpiration = process.env.JWT_TOKEN_EXPIRATION;
exports.USERS = [];
