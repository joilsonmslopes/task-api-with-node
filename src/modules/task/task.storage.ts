import { randomUUID } from "node:crypto";
import { Task } from "./task.types";
import { createTaskObject } from "./task.model";

export class TaskStorage {
  #tasks = new Map<string, Task>();

  async listAllTasks(): Promise<Task[]> {
    return Array.from(this.#tasks.entries()).map((task) => {
      const id = task[0];
      const taskData = task[1];

      return {
        id,
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
        createdAt: taskData.createdAt,
        updatedAt: taskData.updatedAt,
      };
    });
  }

  async createTask(title: string, description?: string): Promise<Task> {
    const task = createTaskObject({
      title,
      description,
    });

    this.#tasks.set(task.id, task);

    return task;
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    return this.#tasks.get(id);
  }

  async deleteTask(id: string): Promise<boolean> {
    const taskExists = this.#tasks.get(id);

    if (!taskExists) return false;

    this.#tasks.delete(id);
    return true;
  }

  async updateTask(
    id: string,
    title: string,
    description?: string
  ): Promise<boolean> {
    const task = this.#tasks.get(id);

    if (!task) return false;

    const descriptionValue = description || task.description || "";

    const updatedTask: Task = {
      ...task,
      title,
      description: descriptionValue,
      updatedAt: new Date(),
    };

    this.#tasks.set(id, updatedTask);

    return true;
  }

  async toggleCompleteTask(id: string, completed: boolean): Promise<boolean> {
    const task = this.#tasks.get(id);

    if (!task) {
      return false;
    }

    task.completed = completed;
    this.#tasks.set(id, task);
    return true;
  }
}
