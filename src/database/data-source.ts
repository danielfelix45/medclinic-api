import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ["src/database/migrations/*.ts"],
});
