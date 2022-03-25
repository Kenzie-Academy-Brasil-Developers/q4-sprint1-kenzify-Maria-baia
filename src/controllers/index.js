"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSong = exports.putPlaylist = exports.getUsers = exports.usersLogin = exports.usersRegister = void 0;
const playlist_controller_1 = require("./playlist.controller");
Object.defineProperty(exports, "deleteSong", { enumerable: true, get: function () { return playlist_controller_1.deleteSong; } });
Object.defineProperty(exports, "putPlaylist", { enumerable: true, get: function () { return playlist_controller_1.putPlaylist; } });
const users_controller_1 = require("./users.controller");
Object.defineProperty(exports, "getUsers", { enumerable: true, get: function () { return users_controller_1.getUsers; } });
Object.defineProperty(exports, "usersLogin", { enumerable: true, get: function () { return users_controller_1.usersLogin; } });
Object.defineProperty(exports, "usersRegister", { enumerable: true, get: function () { return users_controller_1.usersRegister; } });
