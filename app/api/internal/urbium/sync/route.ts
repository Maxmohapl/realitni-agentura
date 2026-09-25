import { timingSafeEqual } from 'node:crypto';
import { getUrbiumConfig } from '@/lib/urbium/config';
import { syncUrbium } from '@/lib/urbium/sync';

export const dynamic = 'force-dynamic';

function authorized(request: Request) {
  const configured = getUrbiumConfig().syncSecret;
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!configured || !supplied) return false;
  const left = Buffer.from(configured); const right = Buffer.from(supplied);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const result = await syncUrbium();
    return Response.json({ success: true, received: result.received, created: result.created, updated: result.updated, unchanged: result.unchanged, archived: result.archived, failed: result.failed, durationMs: result.durationMs });
  } catch (error) {
    const log = (error as Error & { syncLog?: Record<string, unknown> }).syncLog;
    return Response.json({ success: false, error: 'Urbium synchronization failed.', received: log?.received ?? 0, failed: log?.failed ?? 0 }, { status: 502 });
  }
}
