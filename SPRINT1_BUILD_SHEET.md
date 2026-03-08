# Atmosphere Atlas - Sprint 1 Build Sheet

## Objective (Weeks 1-2)
Ship a public, one-city MVP with:
- Map-first browsing
- Place detail pages
- Manual submission with photo + fixed-length audio clip
- Moderation queue
- Exact pins (temporary policy)
- English + one additional language output scaffolding

## Scope Boundaries
In scope:
- Web app only (desktop/mobile responsive)
- One city bounding box
- Open submissions, moderator approval required
- Audio-first mood tags (basic taxonomy)

Out of scope (Sprint 1):
- Advanced recommender system
- Contributor reputation scoring
- Sensitive-location fuzzing policy engine
- Native mobile app

## Stack
- Frontend: Next.js (App Router), TypeScript
- DB: PostgreSQL + PostGIS
- Map: Mapbox GL JS
- Object storage: S3-compatible bucket
- Auth: simple email magic-link for moderator only (public read is anonymous)

## Deliverables
1. Public map page with pin clustering and filters
2. Place page with gallery, audio player, mood tags, metadata
3. Submission page with upload and validation
4. Moderation dashboard (approve/reject/edit)
5. Background ingest job: create AI draft summary + mood tags

## Audio Rules (MVP)
- Clip length fixed at 20 seconds (accept 15-30 sec and trim/pad to 20)
- File types: wav, mp3, m4a
- Sample-rate normalized to 16 kHz mono for analysis pipeline
- No strict quality gating in MVP beyond basic decode checks

## Initial Mood Taxonomy
- Quiet
- Lively
- Chaotic
- Melancholic
- Industrial
- Natural
- Intimate
- Expansive
- Eerie
- Warm

## Acceptance Criteria
- User can browse city map and open any approved place page
- User can submit a place with at least one photo and one audio clip
- Moderator can approve/reject and edit title/summary/tags
- Approved places appear on map within 60 seconds
- API p95 for map query < 500 ms for up to 2k places

## Risks and Mitigations
- AI tag quality weak early: keep moderator as final curator
- Slow content growth: seed first 30 places yourself
- Infra cost drift: cap upload size and AI calls per submission

## Day-1 Start Command Set
1. Initialize app and infra configs
2. Provision Postgres + PostGIS locally
3. Run schema migrations
4. Implement read path first (map + place)
5. Add submission and moderation paths
