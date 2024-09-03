-- Create a new UUID column
ALTER TABLE public.credits ADD COLUMN new_id UUID DEFAULT gen_random_uuid();

-- Update the new column with unique values
UPDATE public.credits SET new_id = gen_random_uuid();

-- Drop the old primary key constraint
ALTER TABLE public.credits DROP CONSTRAINT IF EXISTS credits_pkey;

-- Drop the old id column
ALTER TABLE public.credits DROP COLUMN id;

-- Rename the new_id column to id
ALTER TABLE public.credits RENAME COLUMN new_id TO id;

-- Make the new id column the primary key
ALTER TABLE public.credits ADD PRIMARY KEY (id);

-- Re-enable RLS
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;

