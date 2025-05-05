import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    const status = err.statusCode;
    const message = err.message;
    console.error(err);
    res.status(status).json({ error: message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
