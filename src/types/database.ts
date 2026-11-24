// src/types/database.ts
// TypeScript types matching the refactored Supabase schema.
// These mirror the public schema tables: countries, visa_types,
// visa_requirements, blog_posts, blog_post_translations.

export type Locale = 'en' | 'fr' | 'es' | 'ar';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

// ----------------------------------------------------------------------------
// countries
// ----------------------------------------------------------------------------
export interface Country {
  id: string;
  slug: string;
  name: Record<Locale, string>; // jsonb with at least "en"
  iso_code: string;
  region: string | null;
  is_origin: boolean;
  is_destination: boolean;
  created_at: string;
  updated_at: string;
}

// ----------------------------------------------------------------------------
// visa_types
// ----------------------------------------------------------------------------
export interface VisaType {
  id: string;
  destination_id: string;
  code: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: string;
  stay_days_max: number;
  processing_days_min: number;
  processing_days_max: number;
  default_mandatory_docs: Record<Locale, string[]>;
  default_supporting_docs: Record<Locale, string[]>;
  default_steps: Record<Locale, string[]>;
  fee_amount: number;
  fee_currency: string;
  apply_url: string;
  embassy_url: string;
  source_url: string | null;
  last_verified: string | null;
  created_at: string;
  updated_at: string;
}

// ----------------------------------------------------------------------------
// visa_requirements
// ----------------------------------------------------------------------------
export interface FeeItem {
  key: string;
  label: Record<Locale, string>;
  min: number;
  max: number;
  currency: string;
}

export type VisaStatus =
  | 'visa-free'
  | 'visa-required'
  | 'e-visa'
  | 'eta'
  | 'on-arrival'
  | 'not-admitted';

/**
 * A visa_requirements row with template defaults from visa_types already merged
 * in (non-null override on the row wins, otherwise the visa_types default).
 * Fields that are unknown for a pair stay null; nothing is invented.
 */
export interface VisaRequirement {
  id: string;
  origin_id: string;
  destination_id: string;
  type_code: string | null;
  status: VisaStatus;
  visa_free_days: number | null;
  visa_type: Record<Locale, string>;
  entry_type: 'single' | 'multiple' | 'n/a' | null;
  validity_days: number | null;
  max_stay_days: number | null;
  processing_days_min: number | null;
  processing_days_max: number | null;
  fee_amount: number | null;
  fee_currency: string | null;
  mandatory_docs: Record<Locale, string[]>;
  supporting_docs: Record<Locale, string[]>;
  steps: Record<Locale, string[]>;
  fees: FeeItem[];
  fee_total_min: number | null;
  fee_total_max: number | null;
  apply_url: string | null;
  embassy_url: string | null;
  source_url: string | null;
  last_verified: string | null;
  detailed: boolean;
  created_at: string;
  updated_at: string;
}

// ----------------------------------------------------------------------------
// blog_posts + blog_post_translations
// ----------------------------------------------------------------------------
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  tags: string[];
  date: string;
  readTime: number;
  author: string;
  related: { origin?: string; destination?: string };
  content: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Raw database row for blog_posts (snake_case columns from Supabase)
export interface BlogPostRow {
  id: string;
  cover_url: string;
  tags: string[];
  date: string;
  read_time: number;
  author: string;
  related_origin_id: string | null;
  related_destination_id: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPostTranslation {
  id: string;
  post_id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPostWithTranslation {
  id: string;
  post_id: string;
  locale: Locale;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  created_at: string;
  updated_at: string;
  blog_posts: BlogPostRow;
}
