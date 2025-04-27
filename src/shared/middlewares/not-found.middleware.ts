import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(new AppError(`Rota ${req.originalUrl} não encontrada`, 404));
}
