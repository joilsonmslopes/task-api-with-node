import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  createTaskSchema,
  getParamsSchema,
  toggleCompleteTaskSchema,
  updateTaskSchema,
} from "./task.schema";
import { taskService } from "../../config/inject";

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, description } = createTaskSchema.parse(req.body);

    const task = await taskService.createTask(title, description);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function listAllTasks(req: Request, res: Response) {
  const tasks = await taskService.listAllTasks();

  res.status(200).json(tasks);
}

export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = getParamsSchema.parse(req.params);

    const task = await taskService.getTaskById(id);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = getParamsSchema.parse(req.params);
    const { title, description } = updateTaskSchema.parse(req.body);

    await taskService.updateTask(id, title, description);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function toggleCompleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = getParamsSchema.parse(req.params);
    const { completed } = toggleCompleteTaskSchema.parse(req.body);

    await taskService.toggleCompleteTask(id, completed);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = getParamsSchema.parse(req.params);

    await taskService.deleteTask(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
