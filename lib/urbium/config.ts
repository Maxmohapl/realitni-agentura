export type UrbiumConfig = {
  feedUrl?: string; username?: string; password?: string; apiKey?: string;
  syncSecret?: string; useMockData: boolean; timeoutMs: number;
};

export function getUrbiumConfig(env: NodeJS.ProcessEnv = process.env): UrbiumConfig {
  const configuredTimeout = Number(env.URBIUM_TIMEOUT_MS || 12_000);
  return {
    feedUrl: env.URBIUM_FEED_URL?.trim(), username: env.URBIUM_USERNAME?.trim(),
    password: env.URBIUM_PASSWORD, apiKey: env.URBIUM_API_KEY,
    syncSecret: env.URBIUM_SYNC_SECRET,
    useMockData: env.URBIUM_USE_MOCK_DATA === 'true',
    timeoutMs: Number.isFinite(configuredTimeout) && configuredTimeout > 0 ? configuredTimeout : 12_000,
  };
}
