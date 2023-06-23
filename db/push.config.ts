import type { Config } from "drizzle-kit";
import "dotenv/config";
import { env } from "../utils/env";

const config: Config = {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  driver: "libsql",
};

export default config;
