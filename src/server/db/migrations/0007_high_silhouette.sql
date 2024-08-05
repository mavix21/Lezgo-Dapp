CREATE TABLE IF NOT EXISTS "venue" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"latitude" numeric(10, 6),
	"longitude" numeric(10, 6),
	"formatted_address" varchar(255),
	"place_id" text
);
--> statement-breakpoint
ALTER TABLE "event" RENAME COLUMN "event_modality" TO "modality";--> statement-breakpoint
ALTER TABLE "event" DROP CONSTRAINT "event_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "event_category_id" SET DATA TYPE smallint;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "name" SET DATA TYPE varchar(200);--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "start_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "end_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "venue_id" bigint NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_venue_id_venue_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venue"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN IF EXISTS "event_platform";--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN IF EXISTS "address";