import 'server-only';
import { getUrbiumConfig, type UrbiumConfig } from './config';

export class UrbiumFeedError extends Error { constructor(message: string, public status?: number) { super(message); } }

export async function fetchUrbiumFeed(config: UrbiumConfig = getUrbiumConfig(), fetcher: typeof fetch = fetch) {
  if (!config.feedUrl) throw new UrbiumFeedError('URBIUM_FEED_URL is not configured.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
  const headers = new Headers({ Accept: 'application/xml, text/xml;q=0.9' });
  if (config.username && config.password) headers.set('Authorization', `Basic ${btoa(`${config.username}:${config.password}`)}`);
  if (config.apiKey) headers.set('X-API-Key', config.apiKey);
  try {
    const response = await fetcher(config.feedUrl, { headers, signal: controller.signal, cache: 'no-store' });
    if (!response.ok) throw new UrbiumFeedError(`Urbium feed returned HTTP ${response.status}.`, response.status);
    const xml = await response.text();
    if (!xml.trim()) throw new UrbiumFeedError('Urbium feed returned an empty response.');
    if (!/xml|text\/plain|octet-stream/i.test(response.headers.get('content-type') || '')) throw new UrbiumFeedError('Urbium feed returned an unexpected content type.');
    return xml;
  } catch (error) {
    if (error instanceof UrbiumFeedError) throw error;
    if (error instanceof Error && error.name === 'AbortError') throw new UrbiumFeedError(`Urbium feed timed out after ${config.timeoutMs} ms.`);
    throw new UrbiumFeedError(error instanceof Error ? error.message : 'Urbium feed request failed.');
  } finally { clearTimeout(timeout); }
}
