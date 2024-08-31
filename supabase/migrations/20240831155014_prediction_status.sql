-- Drop the existing constraint
ALTER TABLE public.prediction DROP CONSTRAINT IF EXISTS prediction_status_check;

-- Add the new constraint with 'starting' as an allowed value
ALTER TABLE public.prediction ADD CONSTRAINT prediction_status_check 
  CHECK (status IN ('starting', 'processing', 'succeeded', 'failed', 'canceled'));
