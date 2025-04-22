import { AppError } from "../../errors/AppError";
import { TaskStorage } from "./task.storage";
import { CreateTaskInput, getParamsSchema } from "./task.schema";
import { taskService } from "../../config/inject";
import { ZodError } from "zod";
import { Task } from "./task.types";

export class TaskService {
  constructor(private db: TaskStorage) {}

  async listAllTasks(): Promise<CreateTaskInput[]> {
    const tasks = await this.db.listAllTasks();

    return tasks;
  }

  async createTask(
    title: string,
    description?: string
  ): Promise<CreateTaskInput> {
    const task = await this.db.createTask(title, description);

    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.db.getTaskById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    return task;
  }

  async updateTask(id: string, title: string, description?: string) {
    const updatedTask = await this.db.updateTask(id, title, description);

    if (!updatedTask) throw new AppError("Tarefa não encontrada", 404);
  }

  async toggleCompleteTask(id: string, completed: boolean) {
    const updateCompleteTaskStatus = await this.db.toggleCompleteTask(
      id,
      completed
    );

    if (!updateCompleteTaskStatus) {
      throw new AppError("Tarefa não encontrada", 404);
    }
  }

  async deleteTask(id: string) {
    const deleted = await this.db.deleteTask(id);

    if (!deleted) {
      throw new AppError("Tarefa não encontrada", 404);
    }
  }
}
