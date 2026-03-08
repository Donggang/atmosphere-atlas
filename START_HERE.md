# Start Here - Day 1 Runbook (Windows)

## 1) Create app shell
```powershell
cd d:\Development\atmosphere-atlas
npx create-next-app@latest web --ts --eslint --app --src-dir --import-alias "@/*"
```

## 2) Add core dependencies
```powershell
cd web
npm install pg mapbox-gl zod
npm install -D @types/node
```

## 3) Local Postgres + PostGIS (Docker)
```powershell
docker run --name aa-postgis -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=atmosphere_atlas -p 5432:5432 -d postgis/postgis:16-3.4
```

## 4) Apply schema
```powershell
# from d:\Development\atmosphere-atlas
$env:PGPASSWORD="postgres"
psql -h localhost -U postgres -d atmosphere_atlas -f .\db_schema_v1.sql
```

## 5) Add environment file
Create `web/.env.local`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/atmosphere_atlas
MAPBOX_ACCESS_TOKEN=replace_me
CITY_SLUG=your-city
```

## 6) Build in this order
1. `/map` page with static markers from DB
2. `/places/[id]` detail page
3. `/submit` multipart form
4. `POST /api/v1/submissions`
5. `/moderation/queue` and approve/reject routes

## 7) First smoke checks
- Can view approved places on map
- Can submit a new place with photo + audio
- Moderator can approve and see it appear on map

## Notes
- Keep ingest worker simple in Sprint 1: queue table + cron/manual trigger is enough.
- Defer privacy hardening and sensitive-location controls to v1.1, as planned.
