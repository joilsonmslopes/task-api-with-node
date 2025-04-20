import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });

    return;
  }

  res.status(500).send("Desculpe, aconteceu um erro inesperado!");
}
