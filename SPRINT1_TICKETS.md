# Sprint 1 Tickets (Priority Order)

## Setup and Foundations
- [ ] T01 - Create Next.js TypeScript app with strict mode and App Router
- [ ] T02 - Provision PostgreSQL + PostGIS dev database
- [ ] T03 - Add migration runner and apply `db_schema_v1.sql`
- [ ] T04 - Configure object storage bucket for media assets
- [ ] T05 - Add env management and runtime config checks

## Public Experience
- [ ] T06 - Build `/map` page with Mapbox and viewport query
- [ ] T07 - Build place card and pin cluster rendering
- [ ] T08 - Build `/places/[id]` page with audio player and gallery
- [ ] T09 - Add basic mood tag filters on map page

## Submission and Moderation
- [ ] T10 - Build `/submit` page with multipart upload form
- [ ] T11 - Validate audio length and accepted mime types
- [ ] T12 - Implement `POST /api/v1/submissions`
- [ ] T13 - Build moderator auth (single moderator account)
- [ ] T14 - Build moderation queue page
- [ ] T15 - Implement approve/reject/edit API flows

## AI and Pipeline
- [ ] T16 - Worker job skeleton for ingest pipeline
- [ ] T17 - Audio normalization/transcode to analysis format
- [ ] T18 - Generate multilingual summary draft (EN + ALT)
- [ ] T19 - Generate suggested mood tags
- [ ] T20 - Save AI draft and surface in moderation UI

## Quality and Launch
- [ ] T21 - Instrument API latency and error logging
- [ ] T22 - Seed first 10 places manually
- [ ] T23 - Create launch checklist and rollback checklist
- [ ] T24 - Publish v0.1 to staging and run smoke test

## Stretch (if time remains)
- [ ] T25 - Implement `near me now` button and API endpoint
- [ ] T26 - Generate first exploration suggestions report
