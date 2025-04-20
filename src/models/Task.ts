import { randomUUID } from "node:crypto";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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
    const id = randomUUID();

    const task: Task = {
      id,
      title,
      description: description || "",
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.#tasks.set(id, task);

    return task;
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    return this.#tasks.get(id);
  }

  async deleteTask(id: string): Promise<void> {
    this.#tasks.delete(id);
  }

  async updateTask(
    id: string,
    title: string,
    description: string
  ): Promise<Task | undefined> {
    const task = this.#tasks.get(id);

    if (!task) {
      return undefined;
    }

    task.title = title;
    task.description = description;
    task.updatedAt = new Date();
    this.#tasks.set(id, task);

    return task;
  }

  async toggleCompleteTask(id: string, completed: boolean) {
    const task = this.#tasks.get(id);

    if (!task) {
      return undefined;
    }

    task.completed = completed;

    this.#tasks.set(id, task);
  }
}
