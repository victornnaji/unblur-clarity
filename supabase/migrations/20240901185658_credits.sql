CREATE TABLE IF NOT EXISTS "public"."credits" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "credits" integer DEFAULT 0 NOT NULL,
    "user_id" "uuid" NOT NULL
);

ALTER TABLE ONLY "public"."credits"
    ADD CONSTRAINT "credits_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."credits"
    ADD CONSTRAINT "credits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");

ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage own credits" ON public.credits 
    FOR ALL TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage all credits" ON public.credits 
    FOR ALL TO service_role 
    USING (true);

-- Grant permissions
GRANT ALL ON TABLE public.credits TO authenticated;
GRANT ALL ON TABLE public.credits TO service_role;
