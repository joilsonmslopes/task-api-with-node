import { Prisma } from "@prisma/client";
import { UpdateTaskInput } from "./task.schema";

export interface ITaskRepository {
  create(title: string, description?: string): Promise<Prisma.TaskCreateInput>;
  findMany(): Promise<Prisma.TaskCreateInput[]>;
  findUnique(id: string): Promise<Prisma.TaskCreateInput | null>;
  update(
    id: string,
    task: UpdateTaskInput
  ): Promise<Prisma.TaskCreateInput | false>;
  delete(id: string): Promise<boolean>;
}
