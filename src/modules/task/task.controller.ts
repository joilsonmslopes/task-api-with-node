import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  createTaskSchema,
  getParamsSchema,
  toggleCompleteTaskSchema,
  updateTaskSchema,
} from "./task.schema";
import { container, inject, injectable } from "tsyringe";
import { TaskService } from "./task.service";

@injectable()
export class TaskControler {
  constructor(
    @inject("TaskService")
    private taskService: TaskService
  ) {}

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.taskService.list();

      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = createTaskSchema.parse(req.body);

      const task = await this.taskService.createTask(title, description);

      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = getParamsSchema.parse(req.params);

      const task = await this.taskService.getTaskById(id);

      res.status(200).json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = getParamsSchema.parse(req.params);
      const { title, description, completed } = updateTaskSchema.parse(
        req.body
      );

      const updatedTask = await this.taskService.updateTask(id, {
        title,
        description,
        completed,
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = getParamsSchema.parse(req.params);

      await this.taskService.deleteTask(id);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
