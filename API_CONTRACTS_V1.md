# API Contracts v1

Base path: `/api/v1`

## Public APIs

### GET /places
Purpose: map browsing list within viewport.

Query params:
- `citySlug` (required)
- `bbox` (required): `minLng,minLat,maxLng,maxLat`
- `moods` (optional): comma-separated
- `limit` (optional, default 200)

Response 200:
```json
{
  "items": [
    {
      "id": "uuid",
      "title": "string",
      "lat": 0,
      "lng": 0,
      "moodTags": ["quiet", "melancholic"],
      "neighborhood": "string",
      "coverPhotoUrl": "https://..."
    }
  ]
}
```

### GET /places/{id}
Response includes place details + media + summary fields.

### POST /submissions
Multipart form-data fields:
- `title` (optional)
- `notes` (optional)
- `citySlug` (required)
- `lat` (required)
- `lng` (required)
- `audio` (required, one file)
- `photos` (required, one or more)
- `metadata` (optional JSON string)

Response 202:
```json
{ "submissionId": "uuid", "status": "queued" }
```

## Moderator APIs (auth required)

### GET /moderation/queue
Returns pending places with AI draft previews.

### PATCH /moderation/places/{id}
Update editable fields:
- `title`
- `summaryEn`
- `summaryAlt`
- `moodTags`
- `neighborhood`

### POST /moderation/places/{id}/approve
Body:
```json
{ "reason": "optional" }
```

### POST /moderation/places/{id}/reject
Body:
```json
{ "reason": "required" }
```

## Worker/Internal APIs

### POST /internal/ingest/{submissionId}
- Transcodes audio
- Extracts audio features
- Runs AI summarization/tagging
- Writes `ai_drafts`
- Sets submission status to `ready`

### POST /internal/suggestions/generate
Generates neighborhood/mood exploration suggestions from archive gaps.

## Error Shape
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```
