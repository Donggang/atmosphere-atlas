# PROJECT_MEMORY

Last updated: 2026-03-08
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
Phase 0 - Planning complete, implementation scaffold pending

## Immediate Next 10 Tasks
1. Create Next.js app shell (`web/`)
2. Set up local Postgres + PostGIS
3. Apply `db_schema_v1.sql`
4. Build `GET /api/v1/places` viewport query
5. Build `/map` page with pins
6. Build `/places/[id]` detail page
7. Build `/submit` form with audio + photo upload
8. Build `POST /api/v1/submissions`
9. Build moderation queue page
10. Implement approve/reject actions

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
