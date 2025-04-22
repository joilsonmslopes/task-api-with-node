import express, { NextFunction, Request, Response } from "express";
import { taskRouter } from "./modules/task/task.route";
import { healthcheckRouter } from "./routes/health-check.route";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.handler.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";

export const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/api", taskRouter);
app.use("/health-check", healthcheckRouter);

app.use(notFoundMiddleware);

app.use(errorHandler);
