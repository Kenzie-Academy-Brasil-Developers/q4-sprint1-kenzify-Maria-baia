/** @format */

import { Router } from "express";

import {
  deleteSong,
  getUsers,
  putPlaylist,
  usersLogin,
  usersRegister,
} from "../controllers";
import { authUser, checkUsername, validateBody } from "../middlewares";
import { userSchema } from "../models";

const router = Router();

router.post(
  "/register",
  checkUsername,
  validateBody(userSchema),
  usersRegister
);

router.post("/login", validateBody(userSchema), usersLogin);

router.get("", authUser, getUsers);

router.put("/playlist", authUser, putPlaylist);

router.delete("/playlist", authUser, deleteSong);

export default router;
