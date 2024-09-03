-- Create the one_time_credits table
CREATE TABLE public.one_time_credits (
  credits INTEGER NOT NULL DEFAULT 0,
  user_id UUID NOT NULL,
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  CONSTRAINT one_time_credits_pkey PRIMARY KEY (id),
  CONSTRAINT unique_user_one_time_credits UNIQUE (user_id),
  CONSTRAINT one_time_credits_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id)
) TABLESPACE pg_default;

-- Create the update_one_time_credits_updated_at function
CREATE OR REPLACE FUNCTION update_one_time_credits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER update_one_time_credits_updated_at_trigger
BEFORE UPDATE ON one_time_credits
FOR EACH ROW
EXECUTE FUNCTION update_one_time_credits_updated_at();

-- Enable Row Level Security
ALTER TABLE public.one_time_credits ENABLE ROW LEVEL SECURITY;

-- No policies added as this should be a private table