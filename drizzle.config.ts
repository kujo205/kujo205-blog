import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST,
    port: +env.DATABASE_PORT,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
  },
  tablesFilter: ["kujo205-blog_*"],
  out: "./src/server/db",
} satisfies Config;
