import { AppError } from "../../errors/AppError";
import { UpdateTaskInput } from "./task.schema";
import { TaskStorage } from "./task.storage";
import { Prisma } from "@prisma/client";

export class TaskService {
  constructor(private db: TaskStorage) {}

  async listAllTasks(): Promise<Prisma.TaskCreateInput[]> {
    const tasks = await this.db.listAllTasks();

    return tasks;
  }

  async createTask(
    title: string,
    description?: string
  ): Promise<Prisma.TaskCreateInput> {
    const task = await this.db.createTask(title, description);

    return task;
  }

  async getTaskById(id: string): Promise<Prisma.TaskCreateInput> {
    const task = await this.db.getTaskById(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    return task;
  }

  async updateTask(
    id: string,
    { title, description, completed }: UpdateTaskInput
  ) {
    const updatedTask = await this.db.updateTask(id, {
      title,
      description,
      completed,
    });

    if (!updatedTask) throw new AppError("Tarefa não encontrada", 404);
  }

  async deleteTask(id: string) {
    const deleted = await this.db.deleteTask(id);

    if (!deleted) {
      throw new AppError("Tarefa não encontrada", 404);
    }
  }
}
