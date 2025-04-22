import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    const errors = err.errors.reduce((acc, error) => {
      acc[error.path.join("")] = error.message;

      return acc;
    }, {} as Record<string, string>);

    res.status(400).json(errors);

    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      ...(err.payload ? { errors: err.payload } : {}),
    });

    return;
  }

  res.status(500).send("Desculpe, aconteceu um erro inesperado!");
}
