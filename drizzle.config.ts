import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  driver: "pg",
  tablesFilter: ["kujo205-blog_*"],
  out: "./src/server/db",
} satisfies Config;

/*
* import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  connectionString: process.env.DATABASE_URL,
} satisfies Config;
*
* */
