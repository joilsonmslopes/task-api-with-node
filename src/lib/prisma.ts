import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv();

export const prisma = new PrismaClient();
