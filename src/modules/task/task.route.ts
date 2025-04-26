import { Router } from "express";
import { TaskControler } from "./task.controller";
import { container } from "tsyringe";

export const taskRouter = Router();
const taskController = container.resolve(TaskControler);

taskRouter.post("/tasks", taskController.create.bind(taskController));
taskRouter.get("/tasks", taskController.list.bind(taskController));
taskRouter.get("/tasks/:id", taskController.getTaskById.bind(taskController));
taskRouter.put("/tasks/:id", taskController.updateTask.bind(taskController));
taskRouter.delete("/tasks/:id", taskController.deleteTask.bind(taskController));
