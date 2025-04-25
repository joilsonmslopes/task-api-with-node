import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025":
        res
          .status(404)
          .json({ message: "Registro não encontrado ", statusCode: 404 });
        break;
      case "P2002":
        res
          .status(409)
          .json({ message: "Registro não encontrado ", statusCode: 409 });
        break;
      case "P2003":
        res
          .status(400)
          .json({ message: "Chave estrangeira inválida", statusCode: 400 });
        break;
      default:
        res
          .status(400)
          .json({ message: "Erro no banco de dados", statusCode: 400 });
    }
  }

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
