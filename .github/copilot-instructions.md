# Atmosphere Atlas - Copilot Workspace Instructions

## Project Intent
Atmosphere Atlas is a one-city-first web platform for discovering overlooked places through ambient audio and photos.
Primary value is atmosphere preservation and discovery, not scale-first growth.

## Current Product Shape (MVP)
- Public map-first browsing
- Place detail pages with audio + photos
- Manual submission flow with moderation queue
- Audio-first mood tagging
- Open submissions, no auto-publish
- Exact pins in MVP (privacy hardening deferred to v1.1)
- Multilingual output enabled from early versions

## Stack Decisions
- Next.js (TypeScript, App Router)
- PostgreSQL + PostGIS
- Mapbox
- S3-compatible media storage

## Source-of-Truth Files
Before proposing or coding changes, read and align with:
- `SPRINT1_BUILD_SHEET.md`
- `SPRINT1_TICKETS.md`
- `API_CONTRACTS_V1.md`
- `db_schema_v1.sql`
- `ARCHITECTURE_DECISIONS.md`
- `PROJECT_MEMORY.md`

## Working Rules For Future Sessions
- Preserve one-city-first scope unless user explicitly expands it.
- Prefer shipping vertical slices over broad scaffolding.
- Keep moderator-in-the-loop for quality control.
- Treat audio pipeline as core differentiator.
- Favor low recurring cost choices unless user asks otherwise.
- If a suggestion conflicts with ADRs, call out the conflict and propose an ADR update.

## Coding and Delivery Preferences
- Keep implementation practical and incremental.
- For each feature, provide:
  1. Data changes
  2. API changes
  3. UI changes
  4. Test or validation steps
- When uncertain, propose 2-3 options with tradeoffs and a recommended default.
- Use numbered choices for interactive decisions when possible.

## Definition of MVP Progress
A change counts as meaningful progress if it improves one of:
- Submission-to-publish speed
- Curation quality
- Discovery usefulness
- Archive depth in target city
- Reliability/latency of map and API responses
