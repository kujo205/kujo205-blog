import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

import { env } from "@/env";

export const connection = mysql.createConnection({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  database: env.DATABASE_NAME,
  port: +env.DATABASE_PORT,
  password: env.DATABASE_PASSWORD,
});

export const db = drizzle(connection);
