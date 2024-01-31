import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import { env } from "@/env";
import * as schema from "./schema";

export const connection = new Client({
  url: env.DATABASE_URL,
}).connection();
export const db = drizzle(connection, { schema });
