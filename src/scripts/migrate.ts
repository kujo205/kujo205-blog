import "dotenv/config";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import { db, connection } from "../server/db";
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" });
// Don't forget to close the connection, otherwise the script will hang
await connection.refresh();
