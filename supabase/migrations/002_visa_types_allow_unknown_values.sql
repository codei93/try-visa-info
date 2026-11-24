-- Unknown values must be stored as NULL, never invented.
-- 001 made these columns NOT NULL, but the seed (02_visa_types.sql) correctly uses
-- NULL where the value depends on the traveller's nationality or is not verified yet
-- (e.g. China's fee, US/UK/Canada processing time). Without this migration those
-- inserts fail. Safe to run more than once.
ALTER TABLE public.visa_types
  ALTER COLUMN stay_days_max DROP NOT NULL,
  ALTER COLUMN processing_days_min DROP NOT NULL,
  ALTER COLUMN processing_days_max DROP NOT NULL,
  ALTER COLUMN fee_amount DROP NOT NULL,
  ALTER COLUMN apply_url DROP NOT NULL,
  ALTER COLUMN embassy_url DROP NOT NULL;
