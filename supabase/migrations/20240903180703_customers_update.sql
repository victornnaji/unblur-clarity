-- First, drop the existing primary key constraint
ALTER TABLE customers DROP CONSTRAINT IF EXISTS customers_pkey;

-- Then, alter the table structure
ALTER TABLE customers
  ALTER COLUMN id SET NOT NULL,
  ALTER COLUMN stripe_customer_id SET NOT NULL,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Finally, add the new composite primary key
ALTER TABLE customers
  ADD PRIMARY KEY (id, stripe_customer_id);

-- Ensure row level security is enabled
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- No policies as this is a private table that the user must not have access to.