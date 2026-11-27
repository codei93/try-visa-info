# Where the visa data comes from (checked 2026-11-25)

Rule: a value is stored only if an official government or embassy page supports it. Everything else is NULL
(never 0) and the row has `last_verified = NULL`. Re-check anything marked "unverified" before publishing.

## 02_visa_types.sql (destination templates)

| Destination | Verified from official pages | NOT verified / left empty |
|---|---|---|
| USA B1/B2 | Fee $185 (State Dept rule, June 2026); required items and steps (travel.state.gov visitor visa page) | Processing time (interview waits vary by city, from about 1 month to 6+). Whether the $250 "Visa Integrity Fee" is being charged (reports conflict). Optional $750 expedite pilot runs to 2026-12-31 |
| UK Standard Visitor | Fee £135, up to 6 months, apply up to 3 months ahead, decision usually within 3 weeks, eVisa instead of a vignette, TB test only for stays over 6 months (gov.uk) | none |
| Canada TRV | Fee CAD 100, biometrics CAD 85, documents and steps (IRCC) | Max stay and processing time (IRCC publishes processing time per country) |
| Germany, Switzerland | Fee EUR 90 (EUR 45 ages 6-11, free under 6), 15 calendar days usual, up to 45 in some cases, insurance EUR 30,000, VIDEX form (DE), swiss-visa.ch form (CH) | VFS Global vs TLScontact varies by country |
| France, Poland | Same Schengen-wide fee, documents and timing | National portals not confirmed, so `last_verified` is NULL |
| UAE 30-day | Fee AED 200 + 5% VAT (Dubai GDRFA); how to apply (u.ae) | Processing time (sources say 48 hours to 3 working days). Document list not published on the official page |
| Saudi eVisa | Official portal: visa.visitsaudi.com | Fee (sources show SAR 395 and SAR 535). Stay and validity are from secondary sources |
| Japan | About JPY 15,000 single entry from 2026-07-01 (MOFA), paid in local currency; 74 visa-exempt countries | Fee differs by nationality (e.g. India pays less). Documents list not fetched |
| China L / M | 30-day visa-free policy and reduced fees run to 2026-12-31 (embassy notices) | Fee depends on nationality and mission. Document list. M visa invitation letter is stated as "generally" |

## 03_visa_requirements.sql (329 pairs)

Verified against official lists (`data_source = 'manual'`, 329 rows):
- UK: gov.uk Appendix Visitor visa national list and Appendix ETA national list (updated 2026-11-13). All 31 origins.
- USA: Visa Waiver Program list (travel.state.gov); Canadian citizens are visa-exempt. All 31 origins.
- Canada: eTA eligibility (canada.ca). Mexico, Morocco and the Philippines can use an eTA only if they fly and hold a valid US visa or a Canadian visa from the past 10 years, so they are listed as visa-required and not marked `detailed`.
- Germany, France, Switzerland, Poland: EU Regulation 2018/1806 Annex II (visa-exempt list). ETIAS is not yet in operation. Ecuador, Bolivia, Saudi Arabia, China and the African and South Asian origins are treated as visa-required because they are absent from Annex II.
- Saudi Arabia: official eVisa portal list (72 countries; Africa: Mauritius, Seychelles, South Africa). Mexico added Nov 2026. Other nationalities are shown as visa-required (embassy visa).
- UAE: official MOFA/ICP visa exemption list (u.ae, Emirates). 90-day visa-free for US, GB, CA, DE, FR, CH, PL, JP, CN, AE, MX(180), CO, PE, EC(90). GCC citizens visa-free. All other nationalities visa-required.
- Japan: MOFA visa-exemption list (74 countries). Japan eVisa online application eligible: AU, BR, CA, KH, SA, TW, UK, US. India, South Africa and China are NOT eligible for eVisa and require embassy visa.
- China: National Immigration Administration 30-day list (50 countries; NIA c183390). Morocco added to visa-free list. Ecuador NOT on visa-free list (visa-required).

Unverified (`data_source = 'passport-index'`): NONE — all rows now verified against official sources.

`detailed = true` (102 rows): visa-required pairs into the USA, UK, Canada, Germany and Switzerland, where both the
pair status and the destination template are verified. The sitemap lists only these.

## Dates that will make this data stale
- 2026-12-31: China's reduced visa fees, fingerprint exemption, and the 30-day visa-free policy (including UK and Canada) end unless extended.
- 2026-12-31: US $750 expedited-interview pilot ends.
- ETIAS (EU): no confirmed start date; re-check when one is announced.
