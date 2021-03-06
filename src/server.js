"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = (_a = process.env.RUN_PORT) !== null && _a !== void 0 ? _a : 3000;
app_1.default.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
