/** @format */

import { Request, Response } from "express";

import { USERS, jwtSecret, jwtTokenExpiration } from "../configs";
import * as types from "../types/createdTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const getUsers = (req: Request, res: Response) => {
  const listUsersWithoutPassword: types.userWithoutPassType[] = JSON.parse(
    JSON.stringify(USERS)
  );

  listUsersWithoutPassword.forEach((u) => delete u.password);

  return res.status(200).json(listUsersWithoutPassword);
};

export const usersLogin = async (req: Request, res: Response) => {
  const data = req.body;

  const user: types.userType | undefined = USERS.find(
    (u) => u.username === data.username
  );

  if (!user) {
    return res.status(401).json({ message: "Wrong credentials. Try again!" });
  }

  const match = await bcrypt.compare(data.password, user.password);

  if (!match) {
    return res.status(401).json({ message: "Wrong credentials. Try again!" });
  }

  const token = jwt.sign(
    {
      username: data.username,
      password: user.password,
    },
    jwtSecret,
    { expiresIn: jwtTokenExpiration }
  );

  return res.status(200).json({ accessToken: token });
};

export const usersRegister = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user: types.userType = {
    id: uuidv4(),
    ...req.body,
    password: hashedPassword,
    playlist: {},
  };

  const userWithoutPassword: types.userWithoutPassType = JSON.parse(
    JSON.stringify(user)
  );

  delete userWithoutPassword.password;

  USERS.push(user);

  return res.status(201).json(userWithoutPassword);
};
