import { z } from "zod";
import "dotenv/config";

/**
 * Put server / client variables types
 * Server will only be available on server, client is public
 * Example - DATABASE_URL: z.string().min(1)
 */

const serverEnv = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().nullish(),
});

const clientEnv = z.object({});

type EnvVariables = Record<
  keyof z.infer<typeof serverEnv> | keyof z.infer<typeof clientEnv>,
  string | undefined
>;

const envVariables: EnvVariables = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
};

/**
 *
 * Don't touch please
 *
 */

const mergedVariables = serverEnv.merge(clientEnv);

type MergedOutput = z.infer<typeof mergedVariables>;

//@ts-ignore
let env: MergedOutput = process.env;

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ isServer
    ? mergedVariables.safeParse(envVariables) // on server we can validate all env vars
    : clientEnv.safeParse(envVariables); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  //@ts-ignore
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      //@ts-ignore
      return target[/** @type {keyof typeof target} */ prop];
    },
  });
}

export { env };
