import { Router } from "express";
import { healthcheckController } from "../controller/health-check.controller";

export const healthcheckRouter = Router();

healthcheckRouter.get("/", healthcheckController);
