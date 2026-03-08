-- Atmosphere Atlas v1 schema (PostgreSQL + PostGIS)

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('moderator','contributor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_slug TEXT NOT NULL,
  title TEXT NOT NULL,
  summary_en TEXT,
  summary_alt TEXT,
  neighborhood TEXT,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  mood_tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('pending','approved','rejected')) DEFAULT 'pending',
  submitted_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX places_city_status_idx ON places(city_slug, status);
CREATE INDEX places_location_idx ON places USING GIST(location);
CREATE INDEX places_mood_tags_gin_idx ON places USING GIN(mood_tags);

CREATE TABLE media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('photo','audio')),
  storage_key TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  duration_sec INTEGER,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX media_assets_place_idx ON media_assets(place_id);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  raw_title TEXT,
  raw_notes TEXT,
  raw_metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
  ingest_status TEXT NOT NULL CHECK (ingest_status IN ('queued','processing','ready','failed')) DEFAULT 'queued',
  ingest_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX submissions_status_idx ON submissions(ingest_status);

CREATE TABLE ai_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  summary_en TEXT,
  summary_alt TEXT,
  suggested_tags TEXT[] NOT NULL DEFAULT '{}',
  editorial_notes TEXT,
  confidence NUMERIC(4,3),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ai_drafts_place_idx ON ai_drafts(place_id);

CREATE TABLE moderation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id UUID NOT NULL REFERENCES places(id) ON DELETE CASCADE,
  moderator_id UUID NOT NULL REFERENCES users(id),
  action TEXT NOT NULL CHECK (action IN ('approve','reject','edit')),
  reason TEXT,
  before_state JSONB,
  after_state JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX moderation_events_place_idx ON moderation_events(place_id);

CREATE TABLE exploration_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_slug TEXT NOT NULL,
  neighborhood TEXT,
  rationale TEXT NOT NULL,
  target_mood_tags TEXT[] NOT NULL DEFAULT '{}',
  score NUMERIC(5,2) NOT NULL,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  dismissed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX exploration_suggestions_city_idx ON exploration_suggestions(city_slug, dismissed);
