CREATE TABLE IF NOT EXISTS "currency" (
	"id" char(3) PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_tickets" (
	"event_ticket_id" integer NOT NULL,
	"event_id" uuid NOT NULL,
	"currency_id" char(3) NOT NULL,
	"name" varchar(200) NOT NULL,
	"number_of_tickets" integer NOT NULL,
	"ticket_price" numeric(7, 2) NOT NULL,
	CONSTRAINT "tickets_to_events" PRIMARY KEY("event_ticket_id","event_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_tickets" ADD CONSTRAINT "event_tickets_event_id_event_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_tickets" ADD CONSTRAINT "event_tickets_currency_id_currency_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currency"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
