import { randomUUID } from "node:crypto";
import { Task } from "./task.types";

export function createTaskObject({
  title,
  description,
}: Pick<Task, "title" | "description">): Task {
  const randomId = randomUUID();

  const task: Task = {
    id: randomId,
    title,
    description: description || "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return task;
}
