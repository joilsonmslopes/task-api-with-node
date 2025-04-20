export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}
