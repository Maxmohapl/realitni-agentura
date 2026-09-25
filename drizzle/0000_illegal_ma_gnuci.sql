CREATE TABLE `properties` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`external_id` text NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`status` text NOT NULL,
	`transaction_type` text NOT NULL,
	`property_type` text NOT NULL,
	`disposition` text,
	`price` integer,
	`currency` text DEFAULT 'CZK' NOT NULL,
	`city` text,
	`usable_area` integer,
	`land_area` integer,
	`cover_image` text,
	`data` text NOT NULL,
	`external_created_at` text,
	`external_updated_at` text,
	`published_at` text,
	`last_seen_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uq_properties_source_external_id` ON `properties` (`source`,`external_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `uq_properties_slug` ON `properties` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_properties_public_status` ON `properties` (`status`,`published_at`);--> statement-breakpoint
CREATE INDEX `idx_properties_filters` ON `properties` (`transaction_type`,`property_type`,`city`);--> statement-breakpoint
CREATE TABLE `urbium_sync_runs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`attempted_at` text NOT NULL,
	`successful_at` text,
	`received` integer DEFAULT 0 NOT NULL,
	`created` integer DEFAULT 0 NOT NULL,
	`updated` integer DEFAULT 0 NOT NULL,
	`unchanged` integer DEFAULT 0 NOT NULL,
	`archived` integer DEFAULT 0 NOT NULL,
	`failed` integer DEFAULT 0 NOT NULL,
	`duration_ms` integer NOT NULL,
	`error_code` text,
	`error_message` text
);
--> statement-breakpoint
CREATE INDEX `idx_urbium_sync_runs_attempted_at` ON `urbium_sync_runs` (`attempted_at`);