import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const properties = sqliteTable('properties', {
  id: text('id').primaryKey(), source: text('source').notNull(), externalId: text('external_id').notNull(),
  slug: text('slug').notNull(), title: text('title').notNull(), status: text('status').notNull(),
  transactionType: text('transaction_type').notNull(), propertyType: text('property_type').notNull(),
  disposition: text('disposition'), price: integer('price'), currency: text('currency').notNull().default('CZK'),
  city: text('city'), usableArea: integer('usable_area'), landArea: integer('land_area'),
  coverImage: text('cover_image'), data: text('data').notNull(), externalCreatedAt: text('external_created_at'),
  externalUpdatedAt: text('external_updated_at'), publishedAt: text('published_at'), lastSeenAt: text('last_seen_at').notNull(),
  createdAt: text('created_at').notNull(), updatedAt: text('updated_at').notNull(),
}, (table) => [uniqueIndex('uq_properties_source_external_id').on(table.source, table.externalId), uniqueIndex('uq_properties_slug').on(table.slug), index('idx_properties_public_status').on(table.status, table.publishedAt), index('idx_properties_filters').on(table.transactionType, table.propertyType, table.city)]);

export const urbiumSyncRuns = sqliteTable('urbium_sync_runs', {
  id: integer('id').primaryKey({ autoIncrement: true }), attemptedAt: text('attempted_at').notNull(), successfulAt: text('successful_at'),
  received: integer('received').notNull().default(0), created: integer('created').notNull().default(0), updated: integer('updated').notNull().default(0), unchanged: integer('unchanged').notNull().default(0), archived: integer('archived').notNull().default(0), failed: integer('failed').notNull().default(0), durationMs: integer('duration_ms').notNull(), errorCode: text('error_code'), errorMessage: text('error_message'),
}, (table) => [index('idx_urbium_sync_runs_attempted_at').on(table.attemptedAt)]);
