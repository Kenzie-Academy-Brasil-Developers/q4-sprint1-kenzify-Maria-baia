"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.post("/register", middlewares_1.checkUsername, (0, middlewares_1.validateBody)(models_1.userSchema), controllers_1.usersRegister);
router.post("/login", (0, middlewares_1.validateBody)(models_1.userSchema), controllers_1.usersLogin);
router.get("", middlewares_1.authUser, controllers_1.getUsers);
router.put("/playlist", middlewares_1.authUser, controllers_1.putPlaylist);
router.delete("/playlist", middlewares_1.authUser, controllers_1.deleteSong);
exports.default = router;
