/** @format */

import dotenv from "dotenv";

import * as types from "../types/createdTypes";

dotenv.config();

// const jwtSecret: Secret | GetPublicKeyOrSecret = process.env.JWT_SECRET;
export const jwtSecret: any = process.env.JWT_SECRET;

export const jwtTokenExpiration: string | undefined =
  process.env.JWT_TOKEN_EXPIRATION;

export const USERS: types.userType[] = [];
