import { prisma } from "../../shared/lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { UpdateTaskInput } from "./task.schema";
import { ITaskRepository } from "./task.repository.interface";
import { injectable } from "tsyringe";

@injectable()
export class TaskRepository implements ITaskRepository {
  async findMany(): Promise<Prisma.TaskCreateInput[]> {
    const tasks = await prisma.task.findMany();

    return tasks;
  }

  async create(
    title: string,
    description?: string
  ): Promise<Prisma.TaskCreateInput> {
    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return task;
  }

  async findUnique(id: string): Promise<Prisma.TaskCreateInput | null> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return task;
  }

  async update(
    id: string,
    { title, description, completed }: UpdateTaskInput
  ): Promise<Prisma.TaskCreateInput | false> {
    const taskData = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    const descriptionValue =
      typeof description === "string" ? description : taskData?.description;
    const completedValue =
      completed !== undefined ? completed : taskData?.completed;

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description: descriptionValue,
        completed: completedValue,
      },
    });

    if (!task) return false;

    return task;
  }

  async delete(id: string): Promise<boolean> {
    const taskExists = await prisma.task.delete({
      where: {
        id,
      },
    });

    if (!taskExists) return false;

    return true;
  }
}
