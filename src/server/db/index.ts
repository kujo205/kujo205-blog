import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@/env";

export const connection = postgres(env.DATABASE_URL, {
  prepare: false,
});

export const db = drizzle(connection, { schema });
