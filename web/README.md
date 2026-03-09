Atmosphere Atlas web app (Sprint 1 scaffold).

## Requirements

- Node.js 24 LTS (recommended)
- npm 11+

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.example .env.local
```

3. Fill all keys in `.env.local`.

4. Run development server:

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Runtime Config Check

- Homepage shows whether runtime config is ready.
- API health endpoint: [http://localhost:3000/api/v1/health](http://localhost:3000/api/v1/health)
- If config is incomplete, health returns `503` and lists invalid keys.

## Local Database (Postgres + PostGIS)

From `web/`:

```bash
npm run db:setup
```

This command will:

- start local PostGIS via Docker Compose (`../docker-compose.yml`)
- wait for database readiness
- apply root schema file `../db_schema_v1.sql`

Additional commands:

```bash
npm run db:up
npm run db:wait
npm run db:migrate
npm run db:down
```

## Current Scope

- One-city-first
- Map-first discovery
- Audio-first atmosphere capture
- Moderator-in-the-loop publishing
