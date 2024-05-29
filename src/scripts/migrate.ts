import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "@/server/db";
import * as process from "node:process";

async function dbMigrate() {
  try {
    console.log("Migrating database...");
    await migrate(db, { migrationsFolder: "src/server/db" });
    console.log("Database migrated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error migrating database:", error);
  }
}

dbMigrate();
