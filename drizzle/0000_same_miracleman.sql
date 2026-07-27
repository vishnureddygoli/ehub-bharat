CREATE TABLE `enquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`organization` text NOT NULL,
	`contact_name` text NOT NULL,
	`designation` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`state` text NOT NULL,
	`city_district` text NOT NULL,
	`project_category` text NOT NULL,
	`procurement_stage` text NOT NULL,
	`locations` text,
	`assets` text,
	`fleet_size` text,
	`daily_demand` text,
	`power_availability` text,
	`project_model` text,
	`timeline` text,
	`description` text NOT NULL,
	`utm` text,
	`has_document` integer DEFAULT false NOT NULL,
	`client_hash` text,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `enquiries_reference_unique` ON `enquiries` (`reference`);