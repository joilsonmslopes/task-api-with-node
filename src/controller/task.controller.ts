import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

const taskService = new TaskService();

export async function createTask(req: Request, res: Response) {
  const { title, description } = req.body;

  const task = await taskService.createTask(title, description);

  res.status(201).json(task);
}

export async function listAllTasks(req: Request, res: Response) {
  const tasks = await taskService.listAllTasks();

  res.status(200).json(tasks);
}

export async function getTaskById(req: Request, res: Response) {
  const { id } = req.params;

  const task = await taskService.getTaskById(id);

  res.status(200).json(task);
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description = "" } = req.body;

  await taskService.updateTask(id, title, description);

  res.status(204).send();
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;

  await taskService.deleteTask(id);

  res.status(204).send();
}
