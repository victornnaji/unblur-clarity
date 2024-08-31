-- Change id column to TEXT
ALTER TABLE public.prediction ALTER COLUMN id TYPE TEXT;

-- Drop the default uuid generation
ALTER TABLE public.prediction ALTER COLUMN id DROP DEFAULT;
