# PROJECT_MEMORY

Last updated: 2026-03-09
Project: Atmosphere Atlas

## One-Sentence Mission
Create a public, curated atmosphere map of overlooked places, using short ambient audio plus photos to help people discover places with soul.

## Why This Project Exists
- Preserve atmosphere before places change or disappear.
- Build a small, high-quality contributor community.
- Create a long-term legacy hobby project with purpose and fun.

## Locked Decisions
- Scope: one city first
- Discovery: map-first + near-me-now utility
- Submission: open funnel with moderation queue
- Signal: audio-first tagging from fixed short clips
- Pins: exact in MVP, privacy policy later
- Build cadence: mixed weekly loop (field, studio, editorial, community)

## Current Phase
Phase 1 - Foundation in progress (app scaffold + runtime config checks completed)

## Recent Progress
- Completed T01: Next.js app shell created under `web/` (TypeScript + strict mode + App Router).
- Completed T05 (first pass): environment sample file and typed runtime config validation added.
- Added readiness endpoint `GET /api/v1/health` with non-secret config status output.
- Replaced starter homepage with Sprint-oriented status shell and config readiness panel.
- Validation run: `npm run lint` and `npm run build` both pass.
- Completed T02/T03 setup wiring: added Docker Compose PostGIS service and repeatable db setup/migration scripts.
- Added npm DB workflow commands (`db:up`, `db:wait`, `db:migrate`, `db:setup`, `db:down`) and docs.

## Immediate Next 10 Tasks
1. Run `npm run db:setup` once to verify local Docker/PostGIS execution on this machine
2. Build `GET /api/v1/places` viewport query
3. Build `/map` page with pins
4. Build `/places/[id]` detail page
5. Build `/submit` form with audio + photo upload
6. Build `POST /api/v1/submissions`
7. Build moderation queue page
8. Implement approve/reject actions
9. Add DB connection module and query utilities in `web/`
10. Seed first 10 places manually for read-path smoke tests

## MVP Success Markers
- At least 25 approved places in first city
- End-to-end submission to publish in under 10 minutes
- AI draft suggestions useful enough to keep most of them after edits

## Risks Being Accepted
- Slow growth due to quality bar
- Early technical rewrites in AI pipeline
- Quiet periods while engine quality improves

## Update Protocol
When a major decision changes, update:
1. `ARCHITECTURE_DECISIONS.md` (decision record)
2. `PROJECT_MEMORY.md` (current truth)
3. `SPRINT1_TICKETS.md` (execution impact)
