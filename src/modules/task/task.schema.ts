import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "Título é obrigatório.",
    })
    .min(3, "O Título deve conter pelo menos 3 caracteres."),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: "Título é obrigatório",
    })
    .min(3, "O Título deve conter pelo menos 3 caracteres."),
  description: z.string().optional(),
});

export const getParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

export const toggleCompleteTaskSchema = z.object({
  completed: z.boolean(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
