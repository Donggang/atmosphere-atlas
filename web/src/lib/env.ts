import { z } from "zod";

const nonEmpty = z.string().trim().min(1);
const bboxPattern = /^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/;

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.string().trim().default("3000"),
  CITY_SLUG: nonEmpty,
  CITY_BBOX: z.string().regex(bboxPattern, "CITY_BBOX must be minLng,minLat,maxLng,maxLat"),
  DATABASE_URL: z.url(),
  NEXT_PUBLIC_MAPBOX_TOKEN: nonEmpty,
  S3_ENDPOINT: z.url(),
  S3_REGION: nonEmpty,
  S3_BUCKET: nonEmpty,
  S3_ACCESS_KEY_ID: nonEmpty,
  S3_SECRET_ACCESS_KEY: nonEmpty,
  MODERATOR_EMAIL: z.email(),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

type EnvValidationResult =
  | { ok: true; data: ServerEnv }
  | { ok: false; invalidKeys: string[] };

let cachedValidation: EnvValidationResult | undefined;

function readProcessEnv(): Record<string, string | undefined> {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CITY_SLUG: process.env.CITY_SLUG,
    CITY_BBOX: process.env.CITY_BBOX,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    MODERATOR_EMAIL: process.env.MODERATOR_EMAIL,
  };
}

export function getEnvValidation(): EnvValidationResult {
  if (cachedValidation) {
    return cachedValidation;
  }

  const parsed = serverEnvSchema.safeParse(readProcessEnv());
  if (parsed.success) {
    cachedValidation = { ok: true, data: parsed.data };
    return cachedValidation;
  }

  const invalidKeys = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0] ?? "unknown")))];
  cachedValidation = { ok: false, invalidKeys };
  return cachedValidation;
}

export function requireServerEnv(): ServerEnv {
  const result = getEnvValidation();
  if (result.ok) {
    return result.data;
  }

  throw new Error(
    `Invalid runtime configuration. Missing or invalid keys: ${result.invalidKeys.join(", ")}. Copy .env.example to .env.local and provide values.`,
  );
}
