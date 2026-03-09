import { Client } from "pg";

const databaseUrl = process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/atmosphere_atlas";
const timeoutMs = Number(process.env.DB_WAIT_TIMEOUT_MS ?? "60000");
const retryDelayMs = 2000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isReady() {
  const client = new Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    await client.query("SELECT 1");
    return true;
  } catch {
    return false;
  } finally {
    await client.end().catch(() => {});
  }
}

async function main() {
  const start = Date.now();

  process.stdout.write(`Waiting for database at ${databaseUrl}\n`);
  while (Date.now() - start < timeoutMs) {
    if (await isReady()) {
      process.stdout.write("Database is ready.\n");
      return;
    }

    process.stdout.write("Database not ready yet, retrying...\n");
    await sleep(retryDelayMs);
  }

  process.stderr.write(`Timed out after ${timeoutMs}ms waiting for database.\n`);
  process.exit(1);
}

main().catch((error) => {
  process.stderr.write(`Failed to wait for database: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
