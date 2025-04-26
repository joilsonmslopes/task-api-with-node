import { container } from "tsyringe";
import { TaskRepository } from "../modules/task/task.repository";
import { TaskService } from "../modules/task/task.service";
import { TaskControler } from "../modules/task/task.controller";
import { ITaskRepository } from "../modules/task/task.repository.interface";

container.registerSingleton<ITaskRepository>("ITaskRepository", TaskRepository);

container.registerSingleton("TaskService", TaskService);

container.registerSingleton("TaskControler", TaskControler);
