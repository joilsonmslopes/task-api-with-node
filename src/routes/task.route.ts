import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  listAllTasks,
  updateTask,
} from "../controller/task.controller";

export const taskRouter = Router();

taskRouter.post("/tasks", createTask);
taskRouter.get("/tasks", listAllTasks);
taskRouter.get("/tasks/:id", getTaskById);
taskRouter.put("/tasks/:id", updateTask);
taskRouter.delete("/tasks/:id", deleteTask);
