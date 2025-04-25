import { randomUUID } from "node:crypto";
import { Task } from "./task.types";
import { createTaskObject } from "./task.model";
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { UpdateTaskInput } from "./task.schema";

export class TaskStorage {
  #tasks = new Map<string, Task>();

  async listAllTasks(): Promise<Prisma.TaskCreateInput[]> {
    const tasks = await prisma.task.findMany();

    return tasks;
  }

  async createTask(
    title: string,
    description?: string
  ): Promise<Prisma.TaskCreateInput> {
    const task = prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return task;
  }

  async getTaskById(id: string): Promise<Prisma.TaskCreateInput | null> {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    return task;
  }

  async deleteTask(id: string): Promise<boolean> {
    const taskExists = await prisma.task.delete({
      where: {
        id,
      },
    });

    if (!taskExists) return false;

    return true;
  }

  async updateTask(
    id: string,
    { title, description, completed }: UpdateTaskInput
  ): Promise<boolean> {
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

    return true;
  }
}
