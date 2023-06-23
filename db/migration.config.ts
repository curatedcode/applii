import type { Config } from "drizzle-kit";

const config: Config = {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  breakpoints: true,
};

export default config;
