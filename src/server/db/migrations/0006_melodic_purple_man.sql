ALTER TABLE "currency" ADD COLUMN "symbol" varchar(5) NOT NULL;--> statement-breakpoint
ALTER TABLE "currency" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;