/** @format */

import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

const validateBody =
  (usersSchema: yup.AnySchema) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const data = req.body;

    try {
      await usersSchema.validate(data);
      return next();
    } catch (err: any) {
      return res.status(400).json({ message: err.errors.join(", ") });
    }
  };

export default validateBody;
