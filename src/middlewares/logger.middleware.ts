import { NextFunction, Request, Response } from "express";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const logger = {
    date: new Date(),
    method: req.method,
    route: req.path,
  };

  console.log(logger);
  next();
}
