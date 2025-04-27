import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, errors } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});
