-- ============================================================================
-- try-visa-info — Supabase initial schema (re-runnable)
-- Template + override model: visa_types = default per destination,
-- visa_requirements = nullable overrides per origin/destination/type.
-- Four core tables + blog_post_translations for i18n.
-- No auth tables, no write policies, public read-only RLS.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- COUNTRIES — unified origins + destinations
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name jsonb NOT NULL,
  iso_code char(2) UNIQUE NOT NULL,
  region text,
  is_origin boolean NOT NULL DEFAULT true,
  is_destination boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT countries_name_has_en CHECK (name ? 'en')
);

-- ----------------------------------------------------------------------------
-- VISA TYPES — default template per destination + visa type
-- Override source for visa_requirements when columns are NULL.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visa_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  code text NOT NULL,
  name jsonb NOT NULL,
  description jsonb NOT NULL,
  icon text NOT NULL,
  stay_days_max int NOT NULL,
  processing_days_min int NOT NULL,
  processing_days_max int NOT NULL,
  default_mandatory_docs jsonb NOT NULL DEFAULT '[]'::jsonb,
  default_supporting_docs jsonb NOT NULL DEFAULT '[]'::jsonb,
  default_steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  fee_amount numeric(10,2) NOT NULL,
  fee_currency char(3) NOT NULL DEFAULT 'USD',
  apply_url text NOT NULL,
  embassy_url text NOT NULL,
  source_url text,
  last_verified date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT visa_types_dest_code_unique UNIQUE (destination_id, code),
  CONSTRAINT visa_types_name_has_en CHECK (name ? 'en'),
  CONSTRAINT visa_types_description_has_en CHECK (description ? 'en'),
  CONSTRAINT visa_types_default_mandatory_has_en CHECK (default_mandatory_docs ? 'en'),
  CONSTRAINT visa_types_default_supporting_has_en CHECK (default_supporting_docs ? 'en'),
  CONSTRAINT visa_types_default_steps_has_en CHECK (default_steps ? 'en'),
  CONSTRAINT visa_types_processing_order CHECK (processing_days_min <= processing_days_max),
  CONSTRAINT visa_types_fee_nonneg CHECK (fee_amount >= 0)
);

-- ----------------------------------------------------------------------------
-- VISA REQUIREMENTS — one row per origin/destination pair (+ optional type_code)
-- All detail columns are NULLABLE overrides; NULL means "use visa_types default".
-- Baseline rows have type_code = NULL for the general origin→destination rule.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.visa_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  destination_id uuid NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  type_code text,
  status text NOT NULL CHECK (status IN ('visa-free','visa-required','e-visa','eta','on-arrival','not-admitted')),
  visa_free_days int,
  visa_type jsonb,
  entry_type text CHECK (entry_type IN ('single','multiple','n/a')),
  validity_days int,
  max_stay_days int,
  processing_days_min int,
  processing_days_max int,
  fee_amount numeric(10,2),
  fee_currency char(3),
  mandatory_docs jsonb,
  supporting_docs jsonb,
  steps jsonb,
  fees jsonb,
  fee_total_min numeric(10,2),
  fee_total_max numeric(10,2),
  apply_url text,
  embassy_url text,
  source_url text,
  last_verified date,
  data_source text NOT NULL DEFAULT 'passport-index',
  detailed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT visa_requirements_route_unique UNIQUE NULLS NOT DISTINCT (origin_id, destination_id, type_code),
  CONSTRAINT visa_requirements_origin_neq_dest CHECK (origin_id <> destination_id),
  CONSTRAINT visa_requirements_processing_order CHECK (processing_days_min <= processing_days_max),
  CONSTRAINT visa_requirements_fee_total_order CHECK (fee_total_min <= fee_total_max),
  CONSTRAINT visa_requirements_fee_nonneg CHECK (fee_amount >= 0),
  CONSTRAINT visa_requirements_type_code_fk
    FOREIGN KEY (destination_id, type_code)
    REFERENCES public.visa_types (destination_id, code)
    MATCH SIMPLE
);

-- ----------------------------------------------------------------------------
-- BLOG POSTS — metadata only (translations in separate table)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cover_url text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  date date NOT NULL,
  read_time int NOT NULL,
  author text NOT NULL,
  related_origin_id uuid REFERENCES public.countries(id) ON DELETE SET NULL,
  related_destination_id uuid REFERENCES public.countries(id) ON DELETE SET NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------------------------
-- BLOG POST TRANSLATIONS — locale-keyed content
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_post_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  locale text NOT NULL CHECK (locale IN ('en','fr','es','ar')),
  slug text NOT NULL,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT blog_post_translations_post_locale_unique UNIQUE (post_id, locale),
  CONSTRAINT blog_post_translations_locale_slug_unique UNIQUE (locale, slug)
);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY — public read-only, no write policies
-- ----------------------------------------------------------------------------
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_post_translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access on countries" ON public.countries;
CREATE POLICY "Public read access on countries"
  ON public.countries FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read access on visa_types" ON public.visa_types;
CREATE POLICY "Public read access on visa_types"
  ON public.visa_types FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read access on visa_requirements" ON public.visa_requirements;
CREATE POLICY "Public read access on visa_requirements"
  ON public.visa_requirements FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public read access on blog_posts" ON public.blog_posts;
CREATE POLICY "Public read access on blog_posts"
  ON public.blog_posts FOR SELECT TO anon, authenticated USING (published = true);

DROP POLICY IF EXISTS "Public read access on published blog_post_translations" ON public.blog_post_translations;
CREATE POLICY "Public read access on published blog_post_translations"
  ON public.blog_post_translations FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.blog_posts bp
      WHERE bp.id = blog_post_translations.post_id
        AND bp.published = true
    )
  );

-- ----------------------------------------------------------------------------
-- UPDATED_AT TRIGGER FUNCTION — returns trigger, sets new.updated_at = now()
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ----------------------------------------------------------------------------
-- UPDATED_AT TRIGGERS — attached to every table with updated_at (re-runnable)
-- ----------------------------------------------------------------------------
DROP TRIGGER IF EXISTS update_countries_updated_at ON public.countries;
CREATE TRIGGER update_countries_updated_at
  BEFORE UPDATE ON public.countries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_visa_types_updated_at ON public.visa_types;
CREATE TRIGGER update_visa_types_updated_at
  BEFORE UPDATE ON public.visa_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_visa_requirements_updated_at ON public.visa_requirements;
CREATE TRIGGER update_visa_requirements_updated_at
  BEFORE UPDATE ON public.visa_requirements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_post_translations_updated_at ON public.blog_post_translations;
CREATE TRIGGER update_blog_post_translations_updated_at
  BEFORE UPDATE ON public.blog_post_translations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- INDEXES (no redundant indexes duplicating unique constraints)
-- ----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_visa_types_destination ON public.visa_types(destination_id);
CREATE INDEX IF NOT EXISTS idx_visa_requirements_origin ON public.visa_requirements(origin_id);
CREATE INDEX IF NOT EXISTS idx_visa_requirements_destination ON public.visa_requirements(destination_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date_published ON public.blog_posts(date DESC) WHERE published;
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags_gin ON public.blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_post ON public.blog_post_translations(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_translations_locale_slug ON public.blog_post_translations(locale, slug);
