import { AppError } from "../../shared/errors/AppError";
import { UpdateTaskInput } from "./task.schema";
import { Prisma } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "./task.repository.interface";

@injectable()
export class TaskService {
  constructor(
    @inject("ITaskRepository")
    private taskRepository: ITaskRepository
  ) {}

  async list(): Promise<Prisma.TaskCreateInput[]> {
    const tasks = await this.taskRepository.findMany();

    return tasks;
  }

  async createTask(
    title: string,
    description?: string
  ): Promise<Prisma.TaskCreateInput> {
    const task = await this.taskRepository.create(title, description);

    return task;
  }

  async getTaskById(id: string): Promise<Prisma.TaskCreateInput> {
    const task = await this.taskRepository.findUnique(id);

    if (!task) {
      throw new AppError("Tarefa não encontrada", 404);
    }

    return task;
  }

  async updateTask(
    id: string,
    { title, description, completed }: UpdateTaskInput
  ) {
    const updatedTask = await this.taskRepository.update(id, {
      title,
      description,
      completed,
    });

    if (!updatedTask) throw new AppError("Tarefa não encontrada", 404);

    return updatedTask;
  }

  async deleteTask(id: string) {
    const deleted = await this.taskRepository.delete(id);

    if (!deleted) {
      throw new AppError("Tarefa não encontrada", 404);
    }
  }
}
