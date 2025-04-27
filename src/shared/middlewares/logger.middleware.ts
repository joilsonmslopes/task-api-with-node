import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const loggerData = {
    method: req.method,
    route: req.path,
  };

  logger.info(`${loggerData.method} ${loggerData.route}`);
  next();
}
