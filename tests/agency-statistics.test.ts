import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ratingPercentage, yearsInBusiness } from '../lib/content/statistics';
test('experience advances each calendar year from the confirmed 2026 baseline', () => {
 assert.equal(yearsInBusiness(2026), 15);
 assert.equal(yearsInBusiness(2027), 16);
 assert.equal(yearsInBusiness(2028), 17);
});
test('rating percentage uses the aggregate rating and requires actual reviews', () => {
 assert.equal(ratingPercentage(4.6, 100), 92);
 assert.equal(ratingPercentage(4.9, 100), 98);
 for (const value of [undefined, NaN, Infinity, 0, 6, '4.9']) assert.equal(ratingPercentage(value, 100), null);
 assert.equal(ratingPercentage(5, 0), null);
});
