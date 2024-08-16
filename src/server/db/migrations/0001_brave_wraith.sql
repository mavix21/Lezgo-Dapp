ALTER TABLE "event" DROP CONSTRAINT "event_venue_id_venue_id_fk";
--> statement-breakpoint
ALTER TABLE "event_date" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event_showtime" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN IF EXISTS "venue_id";