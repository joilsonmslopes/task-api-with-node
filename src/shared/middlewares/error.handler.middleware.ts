import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { logger } from "../utils/logger";
import {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "../constants/http.status.code";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isProduction = process.env.NODE_ENV === "production";

  if (err instanceof ZodError) {
    logger.error(
      JSON.stringify({
        name: err.name,
        issues: err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
          code: e.code,
        })),
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
      })
    );

    const errors = err.errors.reduce((acc, error) => {
      acc[error.path.join(".")] = error.message;

      return acc;
    }, {} as Record<string, string>);

    res.status(ClientErrorStatusCode.BAD_REQUEST).json({
      message: "Erro de validação",
      errors,
      statusCode: ClientErrorStatusCode.BAD_REQUEST,
    });
    return;
  }

  logger.error(
    JSON.stringify({
      message: err.message,
      name: err.name,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      body: req.body,
    })
  );

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let statusCode;
    let message;

    switch (err.code) {
      case "P2025":
        statusCode = ClientErrorStatusCode.NOT_FOUND;
        message = "Registro não encontrado";
        break;
      case "P2002":
        statusCode = ClientErrorStatusCode.CONFLICT;
        message = "Registro já existe";
        break;
      case "P2003":
        statusCode = ClientErrorStatusCode.BAD_REQUEST;
        message = "Chave estrangeira inválida";
        break;
      default:
        statusCode = ClientErrorStatusCode.BAD_REQUEST;
        message = "Erro no banco de dados";
    }

    res.status(statusCode).json({ message, statusCode });
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

  res.status(ServerErrorStatusCode.INTERNAL_SERVER_ERROR).json({
    message: isProduction
      ? "Desculpe, aconteceu um erro inesperado!"
      : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
    statusCode: ServerErrorStatusCode.INTERNAL_SERVER_ERROR,
  });
}
