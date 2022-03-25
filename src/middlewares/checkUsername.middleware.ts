/** @format */

import { NextFunction, Request, Response } from "express";

import { USERS } from "../configs";

const checkUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  const findUser = USERS.find((user) => user.username === username);

  if (findUser) {
    return res.status(422).json({ message: "You can not use this username." });
  } else return next();
};

export default checkUsername;
