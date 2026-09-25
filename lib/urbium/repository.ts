import 'server-only';
import { getDatabase } from '@/db/client';
import { legacyProperties } from '@/lib/properties/legacy';
import { PROPERTY_SOURCE, PROPERTY_STATUS, isPublicProperty, propertySchema, type Property } from '@/lib/properties/model';
import { planUrbiumSync } from './reconcile';

export type SyncLog = { attemptedAt: string; successfulAt?: string; received: number; created: number; updated: number; unchanged: number; archived: number; failed: number; durationMs: number; error?: string };
type PropertyRow = { data: string };
const parseRows = (rows: PropertyRow[]) => rows.flatMap(({ data }) => { try { return [propertySchema.parse(JSON.parse(data))]; } catch { return []; } });

export async function allProperties() {
  try { const result = await getDatabase().prepare('SELECT data FROM properties ORDER BY published_at DESC').all<PropertyRow>(); return result.results.length ? parseRows(result.results) : legacyProperties; }
  catch { return legacyProperties; }
}
export async function publicProperties() { return (await allProperties()).filter(isPublicProperty); }
export async function propertyBySlug(slug: string) {
  try { const row = await getDatabase().prepare("SELECT data FROM properties WHERE slug = ? AND status IN ('ACTIVE', 'RESERVED') LIMIT 1").bind(slug).first<PropertyRow>(); return row ? propertySchema.parse(JSON.parse(row.data)) : legacyProperties.find((p) => p.slug === slug && isPublicProperty(p)); }
  catch { return legacyProperties.find((p) => p.slug === slug && isPublicProperty(p)); }
}
export async function saveSyncLog(log: SyncLog) {
  await getDatabase().prepare('INSERT INTO urbium_sync_runs (attempted_at, successful_at, received, created, updated, unchanged, archived, failed, duration_ms, error_code, error_message) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(log.attemptedAt, log.successfulAt ?? null, log.received, log.created, log.updated, log.unchanged, log.archived, log.failed, log.durationMs, log.error ? 'SYNC_FAILED' : null, log.error?.slice(0, 500) ?? null).run();
}

export async function upsertUrbiumProperties(properties: Property[], reconcileMissing: boolean) {
  const db = getDatabase();
  const existingRows = await db.prepare("SELECT external_id, data FROM properties WHERE source = 'urbium'").all<{ external_id: string; data: string }>();
  const existing = parseRows(existingRows.results);
  const plan = planUrbiumSync(existing, properties, reconcileMissing);
  const statements: D1PreparedStatement[] = [];
  for (const property of properties) {
    const serialized = JSON.stringify(property);
    const now = new Date().toISOString();
    statements.push(db.prepare(`INSERT INTO properties (id, source, external_id, slug, title, status, transaction_type, property_type, disposition, price, currency, city, usable_area, land_area, cover_image, data, external_created_at, external_updated_at, published_at, last_seen_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(source, external_id) DO UPDATE SET slug=excluded.slug, title=excluded.title, status=excluded.status, transaction_type=excluded.transaction_type, property_type=excluded.property_type, disposition=excluded.disposition, price=excluded.price, currency=excluded.currency, city=excluded.city, usable_area=excluded.usable_area, land_area=excluded.land_area, cover_image=excluded.cover_image, data=excluded.data, external_updated_at=excluded.external_updated_at, published_at=excluded.published_at, last_seen_at=excluded.last_seen_at, updated_at=excluded.updated_at`)
      .bind(property.id, property.source, property.externalId, property.slug, property.title, property.status, property.transactionType, property.propertyType, property.disposition ?? null, property.price ?? null, property.currency, property.location.city ?? null, property.areas.usableArea ?? null, property.areas.landArea ?? null, property.images.find((image) => image.cover)?.url ?? property.images[0]?.url ?? null, serialized, property.createdAt ?? null, property.updatedAt ?? null, property.publishedAt ?? null, property.lastSeenAt ?? now, now, now));
  }
  for (const property of plan.toUnpublish) {
    const updatedProperty = { ...property, status: PROPERTY_STATUS.UNPUBLISHED, updatedAt: new Date().toISOString() };
    statements.push(db.prepare("UPDATE properties SET status = 'UNPUBLISHED', data = ?, updated_at = ? WHERE source = ? AND external_id = ?").bind(JSON.stringify(updatedProperty), updatedProperty.updatedAt, PROPERTY_SOURCE.URBIUM, property.externalId));
  }
  if (statements.length) await db.batch(statements);
  return { created: plan.created, updated: plan.updated, unchanged: plan.unchanged, archived: plan.archived };
}

export async function seedLegacyProperties() {
  const db = getDatabase(); const now = new Date().toISOString();
  const statements = legacyProperties.map((property) => db.prepare('INSERT OR IGNORE INTO properties (id, source, external_id, slug, title, status, transaction_type, property_type, disposition, price, currency, city, usable_area, land_area, cover_image, data, external_created_at, external_updated_at, published_at, last_seen_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').bind(property.id, property.source, property.externalId, property.slug, property.title, property.status, property.transactionType, property.propertyType, property.disposition ?? null, property.price ?? null, property.currency, property.location.city ?? null, property.areas.usableArea ?? null, property.areas.landArea ?? null, property.images[0]?.url ?? null, JSON.stringify(property), null, null, null, now, now, now));
  if (statements.length) await db.batch(statements);
}
