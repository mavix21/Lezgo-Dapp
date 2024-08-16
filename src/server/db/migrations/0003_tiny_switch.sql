ALTER TABLE "tickets" ADD COLUMN "currency_id" char(3) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_currency_id_currency_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currency"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
