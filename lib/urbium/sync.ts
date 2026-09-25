import 'server-only';
import mockUrbiumXml from '@/fixtures/urbium-mock.xml?raw';
import { fetchUrbiumFeed } from './client';
import { getUrbiumConfig } from './config';
import { mapUrbiumListingToProperty } from './mapper';
import { parseUrbiumFeed } from './parser';
import { saveSyncLog, seedLegacyProperties, upsertUrbiumProperties, type SyncLog } from './repository';

export async function syncUrbium(): Promise<SyncLog> {
  const started = Date.now(); const attemptedAt = new Date().toISOString(); const config = getUrbiumConfig();
  let received = 0, failed = 0;
  try {
    const xml = config.useMockData ? mockUrbiumXml : await fetchUrbiumFeed(config);
    const parsed = parseUrbiumFeed(xml); received = parsed.listings.length;
    const mapped = parsed.listings.flatMap((listing) => {
      try { return [mapUrbiumListingToProperty(listing)]; }
      catch (error) { failed++; console.error('Urbium listing validation failed', { externalId: listing.id || 'missing', error: error instanceof Error ? error.message : 'Unknown validation error' }); return []; }
    });
    await seedLegacyProperties();
    const result = await upsertUrbiumProperties(mapped, parsed.completeSnapshot);
    const log = { attemptedAt, successfulAt: new Date().toISOString(), received, ...result, failed, durationMs: Date.now() - started };
    await saveSyncLog(log); return log;
  } catch (error) {
    const log = { attemptedAt, received, created: 0, updated: 0, unchanged: 0, archived: 0, failed, durationMs: Date.now() - started, error: error instanceof Error ? error.message : 'Synchronization failed.' };
    try { await saveSyncLog(log); } catch { /* preserve the original sync failure */ }
    throw Object.assign(new Error(log.error), { syncLog: log });
  }
}
