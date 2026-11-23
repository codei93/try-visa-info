-- ============================================================================
-- try-visa-info — Seed data: visa_types (02_visa_types.sql)
-- 12 rows: one verified main visa per destination
-- Template + override model: visa_types holds DEFAULT values that
-- visa_requirements falls back to when its columns are NULL.
-- Re-runnable: ON CONFLICT (destination_id, code) DO NOTHING
-- FK lookups via (select id from countries where iso_code = 'XX')
-- ============================================================================

INSERT INTO public.visa_types (
  destination_id, code, name, description, icon,
  stay_days_max, processing_days_min, processing_days_max,
  default_mandatory_docs, default_supporting_docs, default_steps,
  fee_amount, fee_currency, apply_url, embassy_url, source_url, last_verified
)
SELECT
  (SELECT id FROM public.countries WHERE iso_code = d.iso_code),
  d.code,
  d.name::jsonb,
  d.description::jsonb,
  d.icon,
  COALESCE(d.stay_days_max, 0),
  COALESCE(d.processing_days_min, 0),
  COALESCE(d.processing_days_max, d.processing_days_min, 0),
  d.default_mandatory_docs::jsonb,
  d.default_supporting_docs::jsonb,
  d.default_steps::jsonb,
  COALESCE(d.fee_amount, 0.00), COALESCE(d.fee_currency, 'USD'), '', '', d.source_url, NULL
FROM (VALUES
  -- US — B1/B2 Tourist & Business — $185 USD
  ('US', 'B1B2',
   '{"en":"B1/B2 Tourist & Business","fr":"B1/B2 Tourisme & Affaires","es":"B1/B2 Turismo y Negocios","ar":"B1/B2 سياحة وأعمال"}',
   '{"en":"General visits, tourism and business meetings.","fr":"Visites générales, tourisme et réunions d’affaires.","es":"Visitas generales, turismo y reuniones de negocios.","ar":"الزيارات العامة والسياحة واجتماعات الأعمال."}',
   '✈️', NULL, NULL, NULL,
   '{"en":["Valid passport (minimum 6 months validity beyond travel dates)","Completed DS-160 online application form","Recent passport-size photograph (white background, 2x2 inches)","Bank statements (last 3–6 months showing sufficient funds)","Proof of employment, business ownership or enrollment","Travel itinerary (flights + accommodation)","Ties to home country (property, family, employment letter)"]}',
   '{"en":["Copies of previous US visas (if any)","Invitation letter (if visiting family or friends)","Travel insurance policy","Proof of accommodation (hotel bookings)"]}',
   '{"en":["Complete the DS-160 online application at ceac.state.gov","Pay the MRV visa application fee ($185 USD)","Schedule your visa interview at the US Embassy","Attend your biometric appointment (fingerprints + photo)","Attend the visa interview with all required documents","Wait for the visa decision (3–10 business days)","Collect your passport with the visa stamped"]}',
   185.00, 'USD', '', '', 'https://travel.state.gov/content/travel/en/visas.html', NULL),

  -- UK — Standard Visitor — £135 GBP (6-month visa)
  ('GB', 'STANDARD_VISITOR',
   '{"en":"Standard Visitor","fr":"Visiteur standard","es":"Visitante estándar","ar":"زائر عادي"}',
   '{"en":"Standard visitor visa for up to 6 months.","fr":"Visa de visiteur standard pour 6 mois maximum.","es":"Visa de visitante estándar por hasta 6 meses.","ar":"تأشيرة زائر عادي لمدة تصل إلى 6 أشهر."}',
   '📄', 180, NULL, NULL,
   '{"en":["Valid passport with at least one blank page","Completed online application on GOV.UK","Bank statements for the last 6 months","Proof of employment or business (letter, payslips, CAC documents)","Details of planned travel and accommodation","Tuberculosis test certificate (for stays over 6 months)"]}',
   '{"en":["Invitation letter from UK host","Previous travel history (old passports)","Property or tax documents showing ties to home country"]}',
   '{"en":["Apply online on GOV.UK and pay the visa fee","Book an appointment at a visa application centre","Upload or bring supporting documents","Attend the appointment for fingerprints and photo","Wait for a decision (about 3 weeks)","Collect your passport with the vignette"]}',
   135.00, 'GBP', '', '', 'https://www.gov.uk/standard-visitor', NULL),

  -- Canada — Visitor Visa (TRV) — $100 CAD
  ('CA', 'TRV',
   '{"en":"Visitor Visa (TRV)","fr":"Visa de visiteur (TRV)","es":"Visa de visitante (TRV)","ar":"تأشيرة زائر (TRV)"}',
   '{"en":"Temporary resident visitor visa.","fr":"Visa de résident temporaire visiteur.","es":"Visa de residente temporal visitante.","ar":"تأشيرة زائر مقيم مؤقت."}',
   '📄', 180, NULL, NULL,
   '{"en":["Valid passport","Completed IRCC online application","Digital photo meeting IRCC specifications","Proof of financial support (bank statements)","Purpose of travel letter","Proof of ties to home country (job, family, property)"]}',
   '{"en":["Invitation letter from a Canadian host","Travel history","Travel insurance"]}',
   '{"en":["Create an IRCC secure account and complete the application","Pay the visa and biometrics fees online","Give biometrics at the VFS centre","Wait for processing (2–8 weeks)","Submit your passport when requested","Collect your passport with the visa"]}',
   100.00, 'CAD', '', '', 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html', NULL),

  -- DE Schengen — Short-Stay (Type C) — €90 EUR
  ('DE', 'SCHENGEN_C',
   '{"en":"Schengen Short-Stay (Type C)","fr":"Séjour court Schengen (Type C)","es":"Estancia corta Schengen (Tipo C)","ar":"إقامة قصيرة شنغن (النوع ج)"}',
   '{"en":"Short-stay Schengen visa for up to 90 days.","fr":"Visa Schengen de court séjour pour 90 jours maximum.","es":"Visa Schengen de corta estancia para 90 días máximo.","ar":"تأشيرة شنغن قصيرة المدى لمدة تصل إلى 90 يومًا."}',
   '📄', 90, 15, 45,
   '{"en":["Passport valid 3 months beyond departure, issued within 10 years","Completed and signed Schengen application form","Two biometric photos (35x45 mm)","Travel medical insurance (€30,000 minimum cover)","Round-trip flight reservation","Proof of accommodation","Bank statements for the last 3 months"]}',
   '{"en":["Employer letter with approved leave","Invitation letter (if applicable)","Previous Schengen visas"]}',
   '{"en":["Complete the application form on VIDEX","Book an appointment at VFS Global","Attend the appointment and give biometrics","Pay the visa and service fees","Wait for processing (10–15 days)","Collect your passport"]}',
   90.00, 'EUR', '', '', 'https://videx.diplo.de/', NULL),

  -- FR Schengen — Short-Stay (Type C) — €90 EUR
  ('FR', 'SCHENGEN_C',
   '{"en":"Schengen Short-Stay (Type C)","fr":"Séjour court Schengen (Type C)","es":"Estancia corta Schengen (Tipo C)","ar":"إقامة قصيرة شنغن (النوع ج)"}',
   '{"en":"Short-stay Schengen visa for up to 90 days.","fr":"Visa Schengen de court séjour pour 90 jours maximum.","es":"Visa Schengen de corta estancia para 90 días máximo.","ar":"تأشيرة شنغن قصيرة المدى لمدة تصل إلى 90 يومًا."}',
   '📄', 90, 15, 45,
   '{"en":["Passport valid 3 months beyond departure, issued within 10 years","Completed and signed Schengen application form","Two biometric photos (35x45 mm)","Travel medical insurance (€30,000 minimum cover)","Round-trip flight reservation","Proof of accommodation","Bank statements for the last 3 months"]}',
   '{"en":["Employer letter with approved leave","Invitation letter (if applicable)","Previous Schengen visas"]}',
   '{"en":["Complete the application form on France-Visas","Book an appointment at VFS Global or consulate","Attend the appointment and give biometrics","Pay the visa and service fees","Wait for processing (10–15 days)","Collect your passport"]}',
   90.00, 'EUR', '', '', 'https://france-visas.gouv.fr/', NULL),

  -- CH Schengen — Short-Stay (Type C) — €90 EUR
  ('CH', 'SCHENGEN_C',
   '{"en":"Schengen Short-Stay (Type C)","fr":"Séjour court Schengen (Type C)","es":"Estancia corta Schengen (Tipo C)","ar":"إقامة قصيرة شنغن (النوع ج)"}',
   '{"en":"Short-stay Schengen visa for up to 90 days.","fr":"Visa Schengen de court séjour pour 90 jours maximum.","es":"Visa Schengen de corta estancia para 90 días máximo.","ar":"تأشيرة شنغن قصيرة المدى لمدة تصل إلى 90 يومًا."}',
   '📄', 90, 15, 45,
   '{"en":["Passport valid 3 months beyond departure, issued within 10 years","Completed and signed Schengen application form","Two biometric photos (35x45 mm)","Travel medical insurance (€30,000 minimum cover)","Round-trip flight reservation","Proof of accommodation","Bank statements for the last 3 months"]}',
   '{"en":["Employer letter with approved leave","Invitation letter (if applicable)","Previous Schengen visas"]}',
   '{"en":["Complete the application form on the Swiss visa portal","Book an appointment at the Swiss representation","Attend the appointment and give biometrics","Pay the visa and service fees","Wait for processing (10–15 days)","Collect your passport"]}',
   90.00, 'EUR', '', '', 'https://www.sem.admin.ch/sem/en/home.html', NULL),

  -- PL Schengen — Short-Stay (Type C) — €90 EUR
  ('PL', 'SCHENGEN_C',
   '{"en":"Schengen Short-Stay (Type C)","fr":"Séjour court Schengen (Type C)","es":"Estancia corta Schengen (Tipo C)","ar":"إقامة قصيرة شنغن (النوع ج)"}',
   '{"en":"Short-stay Schengen visa for up to 90 days.","fr":"Visa Schengen de court séjour pour 90 jours maximum.","es":"Visa Schengen de corta estancia para 90 días máximo.","ar":"تأشيرة شنغن قصيرة المدى لمدة تصل إلى 90 يومًا."}',
   '📄', 90, 15, 45,
   '{"en":["Passport valid 3 months beyond departure, issued within 10 years","Completed and signed Schengen application form","Two biometric photos (35x45 mm)","Travel medical insurance (€30,000 minimum cover)","Round-trip flight reservation","Proof of accommodation","Bank statements for the last 3 months"]}',
   '{"en":["Employer letter with approved leave","Invitation letter (if applicable)","Previous Schengen visas"]}',
   '{"en":["Complete the application form on the Polish visa portal","Book an appointment at the Polish consulate or VFS","Attend the appointment and give biometrics","Pay the visa and service fees","Wait for processing (10–15 days)","Collect your passport"]}',
   90.00, 'EUR', '', '', 'https://www.gov.pl/web/diplomacy/visas', NULL),

  -- AE — Tourist Visa (30-day single entry) — $200 AED + 5% VAT
  ('AE', 'TOURIST_30',
   '{"en":"Tourist Visa (30-day single entry)","fr":"Visa touristique (entrée unique 30 jours)","es":"Visa de turista (entrada única 30 días)","ar":"تأشيرة سياحية (دخول واحد 30 يومًا)"}',
   '{"en":"30-day single-entry tourist visa.","fr":"Visa touristique à entrée unique de 30 jours.","es":"Visa de turista de entrada única de 30 días.","ar":"تأشيرة سياحية لدخول واحد لمدة 30 يومًا."}',
   '📄', 30, 2, 2,
   '{"en":["Valid passport (minimum 6 months validity)","Completed visa application form","Recent passport-size photograph","Confirmed return flight ticket","Proof of accommodation (hotel booking)","Proof of sufficient funds"]}',
   '{"en":["Travel itinerary","Travel insurance","Previous travel history"]}',
   '{"en":["Submit application through UAE immigration portal or airline","Pay the visa fee ($200 AED + 5% VAT)","Wait for processing (2 days)","Receive e-visa via email","Print visa and present on arrival"]}',
   200.00, 'AED', '', '', 'https://www.ica.gov.ae/', NULL),

  -- SA — Tourist eVisa — 395 SAR
  ('SA', 'TOURIST_EVISA',
   '{"en":"Tourist eVisa","fr":"Visa touristique électronique","es":"Visa de turista electrónico","ar":"تأشيرة سياحية إلكترونية"}',
   '{"en":"Tourist electronic visa valid for 365 days.","fr":"Visa touristique électronique valable 365 jours.","es":"Visa de turista electrónico válido por 365 días.","ar":"تأشيرة سياحية إلكترونية صالحة لمدة 365 يومًا."}',
   '📄', 90, 1, 3,
   '{"en":["Valid passport (minimum 6 months validity)","Completed online application on Visit Saudi portal","Recent passport-size photograph","Proof of accommodation","Travel medical insurance","Proof of sufficient funds"]}',
   '{"en":["Travel itinerary","Invitation letter (if visiting family)","Previous visas"]}',
   '{"en":["Apply online on the Visit Saudi portal","Pay the visa fee (395 SAR)","Wait for processing (1–3 days)","Receive e-visa via email","Print visa and present on arrival"]}',
   395.00, 'SAR', '', '', 'https://www.visitsaudi.com/', NULL),

  -- JP — Short-Term Stay Visa (single entry) — ¥15,000 JPY
  ('JP', 'SHORT_STAY',
   '{"en":"Short-Term Stay Visa (single entry)","fr":"Visa de séjour de courte durée (entrée unique)","es":"Visa de estancia de corta duración (entrada única)","ar":"تأشيرة إقامة قصيرة (دخول واحد)"}',
   '{"en":"Single-entry short-term stay visa.","fr":"Visa de séjour de courte durée à entrée unique.","es":"Visa de estancia de corta duración de entrada única.","ar":"تأشيرة إقامة قصيرة لدخول واحد."}',
   '📄', 90, 5, NULL,
   '{"en":["Valid passport","Completed visa application form","Recent passport-size photograph","Certificate of Eligibility (if required)","Flight itinerary","Proof of accommodation","Proof of financial means"]}',
   '{"en":["Invitation letter (if visiting family or friends)","Travel itinerary","Previous Japanese visas"]}',
   '{"en":["Prepare documents and application form","Submit to Japanese embassy or consulate","Pay the visa fee (¥15,000 JPY)","Wait for processing (minimum 5 days)","Collect your passport with visa"]}',
   15000.00, 'JPY', '', '', 'https://www.mofa.go.jp/j_info/visit/visa/', NULL),

  -- CN L — Tourist Visa — fee depends on nationality
  ('CN', 'L',
   '{"en":"L Tourist Visa","fr":"Visa touristique L","es":"Visa de turista L","ar":"تأشيرة سياحية L"}',
   '{"en":"L category tourist visa.","fr":"Visa touristique catégorie L.","es":"Visa de turista categoría L.","ar":"تأشيرة سياحية من الفئة L."}',
   '📄', NULL, 4, 4,
   '{"en":["Valid passport (minimum 6 months validity)","Completed Chinese visa application form","Recent passport-size photograph","Previous Chinese visas (if any)","Travel itinerary","Proof of accommodation","Round-trip flight reservation"]}',
   '{"en":["Invitation letter (if visiting family or friends)","Hotel bookings","Previous travel history"]}',
   '{"en":["Complete the Chinese visa application form online","Gather required documents","Submit application at Chinese embassy/consulate or CVASC","Pay the visa fee (varies by nationality)","Wait for processing (4 days)","Collect your passport with visa"]}',
   NULL, NULL, '', '', 'https://www.coa.gov.cn/', NULL),

  -- CN M — Business (Trade) Visa — fee depends on nationality
  ('CN', 'M',
   '{"en":"M Business (Trade) Visa","fr":"Visa affaires (commerce) M","es":"Visa de negocios (comercio) M","ar":"تأشيرة أعمال (تجارة) M"}',
   '{"en":"M category business/trade visa.","fr":"Visa affaires/commerce catégorie M.","es":"Visa de negocios/comercio categoría M.","ar":"تأشيرة أعمال/تجارة من الفئة M."}',
   '📄', NULL, 4, 4,
   '{"en":["Valid passport (minimum 6 months validity)","Completed Chinese visa application form","Recent passport-size photograph","Invitation letter from Chinese trade partner","Business license of inviting company","Trade contract or agreement","Round-trip flight reservation","Proof of accommodation"]}',
   '{"en":["Business registration documents","Bank statements","Previous Chinese visas"]}',
   '{"en":["Complete the Chinese visa application form online","Gather required documents including invitation letter","Submit application at Chinese embassy/consulate or CVASC","Pay the visa fee (varies by nationality)","Wait for processing (4 days)","Collect your passport with visa"]}',
   NULL, NULL, '', '', 'https://www.coa.gov.cn/', NULL)
) AS d(iso_code, code, name, description, icon, stay_days_max, processing_days_min, processing_days_max,
  default_mandatory_docs, default_supporting_docs, default_steps,
  fee_amount, fee_currency, source_url)
ON CONFLICT (destination_id, code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  stay_days_max = EXCLUDED.stay_days_max,
  processing_days_min = EXCLUDED.processing_days_min,
  processing_days_max = EXCLUDED.processing_days_max,
  default_mandatory_docs = EXCLUDED.default_mandatory_docs,
  default_supporting_docs = EXCLUDED.default_supporting_docs,
  default_steps = EXCLUDED.default_steps,
  fee_amount = EXCLUDED.fee_amount,
  fee_currency = EXCLUDED.fee_currency,
  source_url = EXCLUDED.source_url,
  updated_at = now();
