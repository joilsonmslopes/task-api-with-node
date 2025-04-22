import { TaskStorage } from "../modules/task/task.storage";
import { TaskService } from "../modules/task/task.service";

const taskStorage = new TaskStorage();

export const taskService = new TaskService(taskStorage);
