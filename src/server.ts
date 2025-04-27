import "reflect-metadata";
import "./shared/config/inject";
import express from "express";
import { taskRouter } from "./modules/task/task.route";
import { healthcheckRouter } from "./shared/routes/health-check.route";
import { loggerMiddleware } from "./shared/middlewares/logger.middleware";
import { errorHandler } from "./shared/middlewares/error.handler.middleware";
import { notFoundMiddleware } from "./shared/middlewares/not-found.middleware";

export const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/api", taskRouter);
app.use("/health-check", healthcheckRouter);

app.use(notFoundMiddleware);

app.use(errorHandler);
