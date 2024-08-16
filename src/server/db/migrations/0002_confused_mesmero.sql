CREATE TABLE IF NOT EXISTS "in_person_event_info" (
	"event_id" uuid PRIMARY KEY NOT NULL,
	"id" bigserial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ticket_types" (
	"id" integer NOT NULL,
	"event_id" uuid,
	"name" varchar(200) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	CONSTRAINT "ticket_types_id_event_id_pk" PRIMARY KEY("id","event_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"event_date_id" integer NOT NULL,
	"event_showtime_id" integer NOT NULL,
	"ticket_type_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"quantity_acquired" integer DEFAULT 0 NOT NULL,
	"price" numeric(7, 2),
	"sale_starts_on" timestamp,
	"sale_ends_on" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "virtual_event_info" (
	"event_id" uuid PRIMARY KEY NOT NULL,
	"meeting_link" text NOT NULL,
	"platform" "event_platform" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "in_person_event_info" ADD CONSTRAINT "in_person_event_info_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "in_person_event_info" ADD CONSTRAINT "in_person_event_info_id_venue_id_fk" FOREIGN KEY ("id") REFERENCES "public"."venue"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_event_date_id_event_showtime_id_event_showtime_event_id_event_date_id_id_fk" FOREIGN KEY ("event_id","event_date_id","event_showtime_id") REFERENCES "public"."event_showtime"("event_id","event_date_id","id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_ticket_type_id_ticket_types_event_id_id_fk" FOREIGN KEY ("event_id","ticket_type_id") REFERENCES "public"."ticket_types"("event_id","id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "virtual_event_info" ADD CONSTRAINT "virtual_event_info_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "ticket_types_event_id_index" ON "ticket_types" USING btree ("event_id");