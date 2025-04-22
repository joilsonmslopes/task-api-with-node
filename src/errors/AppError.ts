export class AppError extends Error {
  statusCode: number;
  payload?: unknown;

  constructor(message: string | object, statusCode: number) {
    const normalizedMessage =
      typeof message === "string" ? message : "Erro de validação";
    super(normalizedMessage);

    console.log(normalizedMessage);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "AppError";
    this.statusCode = statusCode;

    if (typeof message !== "string") {
      this.payload = message;
    }
  }
}
