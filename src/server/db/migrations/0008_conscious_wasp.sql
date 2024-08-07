CREATE TABLE IF NOT EXISTS "event_date" (
	"id" integer,
	"event_id" uuid NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "event_date_id" PRIMARY KEY("event_id","id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_showtime" (
	"id" integer,
	"event_id" uuid NOT NULL,
	"event_date_id" integer NOT NULL,
	"showtime" time with time zone NOT NULL,
	"end_time" time with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "event_showtime_id" PRIMARY KEY("event_id","event_date_id","id")
);
--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_credentialID_pk";--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "auth_pk" PRIMARY KEY("userId","credentialID");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_date" ADD CONSTRAINT "event_date_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_showtime" ADD CONSTRAINT "event_showtime_event_id_event_date_id_event_date_event_id_id_fk" FOREIGN KEY ("event_id","event_date_id") REFERENCES "public"."event_date"("event_id","id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_id_idx" ON "event_date" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_date_id_idx" ON "event_showtime" USING btree ("event_id","event_date_id");