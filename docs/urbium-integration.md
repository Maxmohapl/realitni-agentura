# Urbium XML integration

## Architecture

The website runs as a Cloudflare Worker and stores normalized listings in Cloudflare D1. GitHub remains the source of truth for application code and reviewed migrations. The browser never receives Urbium credentials and never calls the feed directly.

Flow: `Urbium XML -> server client -> parser -> mapper -> validation -> D1 -> catalogue/detail/API`.

- `lib/urbium/client.ts` downloads XML with a timeout and optional Basic/API-key authentication.
- `lib/urbium/parser.ts` rejects entity declarations and parses a temporary mock schema.
- `lib/urbium/mapper.ts` is the main replacement point for official field names.
- `lib/urbium/repository.ts` performs idempotent D1 upserts and writes audit records.
- `POST /api/internal/urbium/sync` is protected by `Authorization: Bearer <URBIUM_SYNC_SECRET>`.
- Failed or partial downloads never remove listings. Missing records are unpublished only after a valid feed explicitly marked as a complete snapshot.

## Database

The D1 binding is `DB` in `.openai/hosting.json`. Schema source is `db/schema.ts`; generated SQL lives in `drizzle/`. Apply migrations during the Cloudflare deployment workflow before switching traffic. Do not create or alter these tables at runtime.

Useful commands:

```bash
npm run db:generate
npm test
npm run build
```

The existing hand-written offers are seeded into D1 as `source=legacy` on the first successful sync, so the current catalogue remains available during rollout.

## Configuration

Copy `.env.example` for local development. Store production values as encrypted Cloudflare secrets/environment variables, never in GitHub or browser code.

- `URBIUM_FEED_URL`
- `URBIUM_USERNAME` / `URBIUM_PASSWORD`, if Basic Auth is required
- `URBIUM_API_KEY`, if an API key is required
- `URBIUM_SYNC_SECRET`, long random secret for the sync endpoint
- `URBIUM_USE_MOCK_DATA=true` only for local integration work
- `URBIUM_TIMEOUT_MS`, defaults to 15 seconds
- `SITE_URL`, canonical public origin

Configure a Cloudflare scheduled trigger to invoke the protected endpoint every 10 minutes. Use one scheduler only; do not duplicate this in GitHub Actions. GitHub Actions can run `npm test` and `npm run build` for pull requests without production credentials.

## Operations and monitoring

Every run writes counts, duration and a bounded error message to `urbium_sync_runs`. Alert when several consecutive runs fail, when the last successful run is older than the agreed freshness window, or when a complete feed unexpectedly drops a large share of records. The sync never logs credentials or raw authenticated URLs.

Rollback is safe: deploy the previous Git commit. D1 keeps listings and audit history. If an upstream feed is bad, disable the scheduled trigger; current public rows stay online. A complete valid snapshot can later reconcile missing records by marking them `UNPUBLISHED`, never deleting them.

## What is still needed from Urbium

The fixture at `fixtures/urbium-mock.xml` is deliberately marked as a temporary schema. Before production sync is enabled, obtain and verify:

1. Official XML documentation/XSD and a real sample containing every property type.
2. Production and test feed URLs.
3. Authentication method, credentials, IP allow-list or client-certificate requirements.
4. Update frequency, rate limits, encoding and maximum expected payload size.
5. The stable external ID, complete-vs-delta semantics and exact deletion/unpublish signal.
6. Status, transaction, type and subtype code lists.
7. Price/VAT/commission rules, currency rules and units for all areas.
8. Image ordering, cover-image flag, media URL lifetime and video/virtual-tour formats.
9. Agent and branch identifiers and which contact fields may be published.
10. GDPR, retention and redistribution requirements.

When these arrive, replace the temporary types and extraction in `lib/urbium/types.ts`, `parser.ts` and `mapper.ts`; keep the normalized property model and presentation layer unchanged.
