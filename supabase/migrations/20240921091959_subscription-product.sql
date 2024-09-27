ALTER TABLE "public"."subscriptions"
ADD COLUMN "product_id" text;

-- Add foreign key constraint
ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");

-- Create index for product_id
CREATE INDEX "idx_subscriptions_product_id" ON "public"."subscriptions" ("product_id");