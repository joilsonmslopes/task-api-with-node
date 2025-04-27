import { Request, Response } from "express";

export function healthcheckController(req: Request, res: Response) {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = String(error);
    res.status(503).send();
  }
}
