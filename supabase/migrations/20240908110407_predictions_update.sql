-- Rename the table from prediction to predictions
ALTER TABLE prediction RENAME TO predictions;

-- Add new columns to the predictions table
ALTER TABLE predictions
ADD COLUMN image_name TEXT,
ADD COLUMN original_image_url TEXT;