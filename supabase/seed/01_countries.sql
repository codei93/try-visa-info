-- ============================================================================
-- try-visa-info — Seed data: countries (01_countries.sql)
-- 32 countries: 21 origins + 11 destinations (destinations also usable as origins)
-- Re-runnable: ON CONFLICT (slug) DO NOTHING
-- ============================================================================

INSERT INTO public.countries (slug, iso_code, name, region, is_origin, is_destination) VALUES
  -- Origins (21)
  ('nigeria', 'NG', '{"en":"Nigeria","fr":"Nigeria","es":"Nigeria","ar":"نيجيريا"}', 'africa', true, false),
  ('ghana', 'GH', '{"en":"Ghana","fr":"Ghana","es":"Ghana","ar":"غانا"}', 'africa', true, false),
  ('kenya', 'KE', '{"en":"Kenya","fr":"Kenya","es":"Kenia","ar":"كينيا"}', 'africa', true, false),
  ('uganda', 'UG', '{"en":"Uganda","fr":"Ouganda","es":"Uganda","ar":"أوغندا"}', 'africa', true, false),
  ('tanzania', 'TZ', '{"en":"Tanzania","fr":"Tanzanie","es":"Tanzania","ar":"تنزانيا"}', 'africa', true, false),
  ('ethiopia', 'ET', '{"en":"Ethiopia","fr":"Éthiopie","es":"Etiopía","ar":"إثيوبيا"}', 'africa', true, false),
  ('south-africa', 'ZA', '{"en":"South Africa","fr":"Afrique du Sud","es":"Sudáfrica","ar":"جنوب إفريقيا"}', 'africa', true, false),
  ('egypt', 'EG', '{"en":"Egypt","fr":"Égypte","es":"Egipto","ar":"مصر"}', 'africa', true, false),
  ('india', 'IN', '{"en":"India","fr":"Inde","es":"India","ar":"الهند"}', 'asia', true, false),
  ('pakistan', 'PK', '{"en":"Pakistan","fr":"Pakistan","es":"Pakistán","ar":"باكستان"}', 'asia', true, false),
  ('bangladesh', 'BD', '{"en":"Bangladesh","fr":"Bangladesh","es":"Bangladés","ar":"بنغلاديش"}', 'asia', true, false),
  ('philippines', 'PH', '{"en":"Philippines","fr":"Philippines","es":"Filipinas","ar":"الفلبين"}', 'asia', true, false),
  ('cameroon', 'CM', '{"en":"Cameroon","fr":"Cameroun","es":"Camerún","ar":"الكاميرون"}', 'africa', true, false),
  ('senegal', 'SN', '{"en":"Senegal","fr":"Sénégal","es":"Senegal","ar":"السنغال"}', 'africa', true, false),
  ('morocco', 'MA', '{"en":"Morocco","fr":"Maroc","es":"Marruecos","ar":"المغرب"}', 'africa', true, false),
  ('mexico', 'MX', '{"en":"Mexico","fr":"Mexique","es":"México","ar":"المكسيك"}', 'north-america', true, false),
  ('colombia', 'CO', '{"en":"Colombia","fr":"Colombie","es":"Colombia","ar":"كولومبيا"}', 'south-america', true, false),
  ('peru', 'PE', '{"en":"Peru","fr":"Pérou","es":"Perú","ar":"بيرو"}', 'south-america', true, false),
  ('ecuador', 'EC', '{"en":"Ecuador","fr":"Équateur","es":"Ecuador","ar":"الإكوادور"}', 'south-america', true, false),
  ('venezuela', 'VE', '{"en":"Venezuela","fr":"Venezuela","es":"Venezuela","ar":"فنزويلا"}', 'south-america', true, false),
  ('bolivia', 'BO', '{"en":"Bolivia","fr":"Bolivie","es":"Bolivia","ar":"بوليفيا"}', 'south-america', true, false),
  -- Destinations (11) — also usable as origins (is_origin=true, is_destination=true)
  ('usa', 'US', '{"en":"USA","fr":"États-Unis","es":"EE. UU.","ar":"الولايات المتحدة"}', 'north-america', true, true),
  ('uk', 'GB', '{"en":"UK","fr":"Royaume-Uni","es":"Reino Unido","ar":"المملكة المتحدة"}', 'europe', true, true),
  ('canada', 'CA', '{"en":"Canada","fr":"Canada","es":"Canadá","ar":"كندا"}', 'north-america', true, true),
  ('germany', 'DE', '{"en":"Germany","fr":"Allemagne","es":"Alemania","ar":"ألمانيا"}', 'europe', true, true),
  ('france', 'FR', '{"en":"France","fr":"France","es":"Francia","ar":"فرنسا"}', 'europe', true, true),
  ('switzerland', 'CH', '{"en":"Switzerland","fr":"Suisse","es":"Suiza","ar":"سويسرا"}', 'europe', true, true),
  ('poland', 'PL', '{"en":"Poland","fr":"Pologne","es":"Polonia","ar":"بولندا"}', 'europe', true, true),
  ('uae', 'AE', '{"en":"UAE","fr":"Émirats arabes unis","es":"Emiratos Árabes Unidos","ar":"الإمارات"}', 'middle-east', true, true),
  ('saudi-arabia', 'SA', '{"en":"Saudi Arabia","fr":"Arabie saoudite","es":"Arabia Saudita","ar":"المملكة العربية السعودية"}', 'middle-east', true, true),
  ('japan', 'JP', '{"en":"Japan","fr":"Japon","es":"Japón","ar":"اليابان"}', 'asia', true, true),
  ('china', 'CN', '{"en":"China","fr":"Chine","es":"China","ar":"الصين"}', 'asia', true, true)
ON CONFLICT (slug) DO NOTHING;
