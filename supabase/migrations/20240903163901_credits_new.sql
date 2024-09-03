-- If the table already exists, ensure it has the correct structure
ALTER TABLE public.credits
    ALTER COLUMN credits SET DEFAULT 0,
    DROP COLUMN IF EXISTS created_at,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add a unique constraint on user_id if it doesn't exist
ALTER TABLE public.credits
    ADD CONSTRAINT unique_user_credits UNIQUE (user_id);

-- Create or replace the update_credits_updated_at function
CREATE OR REPLACE FUNCTION update_credits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS update_credits_updated_at_trigger ON public.credits;
CREATE TRIGGER update_credits_updated_at_trigger
BEFORE UPDATE ON public.credits
FOR EACH ROW
EXECUTE FUNCTION update_credits_updated_at();