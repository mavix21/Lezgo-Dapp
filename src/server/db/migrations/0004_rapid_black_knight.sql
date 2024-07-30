ALTER TABLE "event" ALTER COLUMN "event_platform" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "event_platform" DROP NOT NULL;