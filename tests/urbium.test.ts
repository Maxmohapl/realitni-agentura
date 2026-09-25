import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { mapUrbiumListingToProperty, conversions } from '@/lib/urbium/mapper';
import { parseUrbiumFeed } from '@/lib/urbium/parser';
import { planUrbiumSync } from '@/lib/urbium/reconcile';

const fixture = new URL('../fixtures/urbium-mock.xml', import.meta.url);

test('parses the mock feed and maps representative values', async () => {
  const parsed = parseUrbiumFeed(await readFile(fixture, 'utf8'));
  assert.equal(parsed.completeSnapshot, true);
  assert.equal(parsed.listings.length, 6);
  const property = mapUrbiumListingToProperty(parsed.listings[0], new Date('2026-01-01T00:00:00Z'));
  assert.ok(property.externalId);
  assert.ok(property.slug.endsWith(property.externalId.toLowerCase()));
  assert.equal(property.source, 'urbium');
  assert.ok(property.images.length > 0);
});

test('rejects malformed and potentially unsafe XML', () => {
  assert.throws(() => parseUrbiumFeed('<broken>'), /Invalid XML/);
  assert.throws(() => parseUrbiumFeed('<!DOCTYPE feed><urbiumMockFeed/>'), /not allowed/);
});

test('normalizes numbers, booleans and dates', () => {
  assert.equal(conversions.number('4 950 000'), 4_950_000);
  assert.equal(conversions.boolean('ano'), true);
  assert.equal(conversions.boolean('ne'), false);
  assert.equal(conversions.date('not-a-date'), null);
});

test('fails a listing without a stable external ID', () => {
  assert.throws(() => mapUrbiumListingToProperty({ id: '', title: 'Bez ID', transaction: 'sale', type: 'house' }), /Too small/);
});

test('sync planning is idempotent and detects duplicates', async () => {
  const parsed = parseUrbiumFeed(await readFile(fixture, 'utf8'));
  const now = new Date('2026-01-01T00:00:00Z');
  const property = mapUrbiumListingToProperty(parsed.listings[0], now);
  assert.deepEqual(planUrbiumSync([property], [{ ...property, lastSeenAt: '2026-01-02T00:00:00.000Z' }], true), {
    created: 0, updated: 0, unchanged: 1, archived: 0, toUnpublish: [],
  });
  assert.throws(() => planUrbiumSync([], [property, property], true), /Duplicate external property ID/);
});

test('missing listings are unpublished only for a complete successful snapshot', async () => {
  const parsed = parseUrbiumFeed(await readFile(fixture, 'utf8'));
  const property = mapUrbiumListingToProperty(parsed.listings[0]);
  assert.equal(planUrbiumSync([property], [], true).archived, 1);
  assert.equal(planUrbiumSync([property], [], false).archived, 0);
});
