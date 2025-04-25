import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  database?: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 3333,
  nodeEnv: process.env.NODE_ENV || "development",
  database: process.env.DATABASE,
};
