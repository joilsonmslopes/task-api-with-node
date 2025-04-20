import { AppError } from "../errors/AppError";
import { Task, TaskStorage } from "../models/Task";

const db = new TaskStorage();

export class TaskService {
  async listAllTasks(): Promise<Task[]> {
    const tasks = await db.listAllTasks();

    return tasks;
  }

  async createTask(title: string, description?: string): Promise<Task> {
    if (!title) {
      throw new AppError("Título é obrigatório", 400);
    }

    const task = await db.createTask(title, description);

    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await db.getTaskById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    return task;
  }

  async updateTask(id: string, title: string, description?: string) {
    if (!id) {
      throw new AppError("ID é obrigatório", 400);
    }

    const task = await db.getTaskById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    if (!title) {
      throw new AppError("Título é obrigatório", 400);
    }

    const descriptionValue = description || task.description;

    await db.updateTask(task.id, title, descriptionValue);
  }

  async deleteTask(id: string) {
    const task = await db.getTaskById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    await db.deleteTask(task.id);
  }
}
