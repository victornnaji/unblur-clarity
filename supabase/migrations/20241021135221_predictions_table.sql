ALTER TABLE "public"."predictions" ADD COLUMN IF NOT EXISTS "model" "text";
ALTER TABLE "public"."products" ADD COLUMN IF NOT EXISTS "credit_amounts" bigint;

DROP POLICY IF EXISTS "Users can delete own predictions" ON "public"."predictions";

CREATE POLICY "Users can delete own predictions" 
ON "public"."predictions"
FOR DELETE TO "authenticated"
USING (("auth"."uid"() = "user_id"));