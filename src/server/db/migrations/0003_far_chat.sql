DO $$ BEGIN
 CREATE TYPE "public"."event_modality" AS ENUM('online', 'in_person', 'hybrid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."event_platform" AS ENUM('zoom', 'teams', 'meet', 'discord', 'twitter', 'decentraland', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "promoter" RENAME COLUMN "last_name" TO "last_name1";--> statement-breakpoint
ALTER TABLE "event" DROP CONSTRAINT "event_promoter_id_promoter_id_fk";
--> statement-breakpoint
ALTER TABLE "event" ALTER COLUMN "address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "event_modality" "event_modality" DEFAULT 'in_person' NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "event_platform" "event_platform" DEFAULT 'other' NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "total_tickets" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "event" DROP COLUMN IF EXISTS "promoter_id";