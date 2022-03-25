/** @format */

import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { jwtSecret, USERS } from "../configs";

const authUser = (req: any, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: "missing header authorization." });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userAuthenticated = USERS.find(
      (user) => user.username === decoded.username
    );

    req.userAuthenticated = userAuthenticated;
  });
  return next();
};

export default authUser;
