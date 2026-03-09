import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..", "..");
const composeFile = path.join(workspaceRoot, "docker-compose.yml");

const dbUser = process.env.PGUSER ?? "postgres";
const dbName = process.env.PGDATABASE ?? "atmosphere_atlas";
const schemaInContainer = "/workspace/db_schema_v1.sql";

const args = [
  "compose",
  "-f",
  composeFile,
  "exec",
  "-T",
  "db",
  "psql",
  "-U",
  dbUser,
  "-d",
  dbName,
  "-v",
  "ON_ERROR_STOP=1",
  "-f",
  schemaInContainer,
];

process.stdout.write("Applying db_schema_v1.sql to local Postgres...\n");
const result = spawnSync("docker", args, { stdio: "inherit" });

if (result.error) {
  process.stderr.write(`Failed to run docker compose exec: ${result.error.message}\n`);
  process.exit(1);
}

if (typeof result.status === "number" && result.status !== 0) {
  process.stderr.write(`Schema apply failed with exit code ${result.status}.\n`);
  process.exit(result.status);
}

process.stdout.write("Schema applied successfully.\n");
