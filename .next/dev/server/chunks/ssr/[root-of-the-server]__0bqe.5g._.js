module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://mipsnmaugtjagmndfeqd.supabase.co");
const supabaseServiceKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcHNubWF1Z3RqYWdtbmRmZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxMTkxMzYsImV4cCI6MjExMDY5NTEzNn0.uOi-zKYxHnbHIoaGUZekg-srjwJtnYlGWyUAEaE0Cbg");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});
}),
"[project]/src/lib/localized.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/localized.ts
// Helpers for reading locale-keyed jsonb columns with fallback to "en".
__turbopack_context__.s([
    "flagFromIso",
    ()=>flagFromIso,
    "locales",
    ()=>locales,
    "t",
    ()=>t,
    "tArray",
    ()=>tArray
]);
const locales = [
    'en',
    'fr',
    'es',
    'ar'
];
function t(obj, locale) {
    if (!obj || typeof obj !== 'object') return undefined;
    return obj[locale] ?? obj['en'] ?? undefined;
}
function tArray(obj, locale) {
    const val = t(obj, locale);
    return Array.isArray(val) ? val : [];
}
function flagFromIso(isoCode) {
    if (!isoCode || isoCode.length !== 2) return '🏳️';
    const cp1 = isoCode.charCodeAt(0) - 'A'.charCodeAt(0) + 0x1f1e6;
    const cp2 = isoCode.charCodeAt(1) - 'A'.charCodeAt(0) + 0x1f1e6;
    return String.fromCodePoint(cp1, cp2);
}
}),
"[project]/src/lib/format.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/format.ts
// Formatters for structured values (fees, days) using Intl.NumberFormat.
__turbopack_context__.s([
    "formatFee",
    ()=>formatFee,
    "formatFeeRange",
    ()=>formatFeeRange,
    "formatMaxStay",
    ()=>formatMaxStay,
    "formatProcessingDays",
    ()=>formatProcessingDays,
    "formatValidity",
    ()=>formatValidity
]);
const localeToIntl = {
    en: 'en-US',
    fr: 'fr-FR',
    es: 'es-ES',
    ar: 'ar-SA'
};
function formatFee(amount, currency = 'USD', locale = 'en') {
    if (amount === null || amount === undefined) return 'Varies';
    return new Intl.NumberFormat(localeToIntl[locale], {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
function formatFeeRange(min, max, currency = 'USD', locale = 'en') {
    if (min === null && max === null) return 'Varies';
    if (min === null) return `Up to ${formatFee(max, currency, locale)}`;
    if (max === null) return `From ${formatFee(min, currency, locale)}`;
    return `${formatFee(min, currency, locale)}–${formatFee(max, currency, locale)}`;
}
function formatProcessingDays(min, max) {
    if (min === max) return `${min} day${min !== 1 ? 's' : ''}`;
    return `${min}–${max} days`;
}
function formatMaxStay(days) {
    if (days === null) return 'Varies';
    return `${days} days`;
}
function formatValidity(days) {
    if (days === null) return 'Varies';
    return `${days} days`;
}
}),
"[project]/src/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SITE_URL",
    ()=>SITE_URL,
    "getAllBlogSlugs",
    ()=>getAllBlogSlugs,
    "getAllDestinationSlugs",
    ()=>getAllDestinationSlugs,
    "getAllDetailedRoutePairs",
    ()=>getAllDetailedRoutePairs,
    "getAllOriginDestinationPairs",
    ()=>getAllOriginDestinationPairs,
    "getBlogPosts",
    ()=>getBlogPosts,
    "getCountry",
    ()=>getCountry,
    "getDestination",
    ()=>getDestination,
    "getDestinations",
    ()=>getDestinations,
    "getOrigins",
    ()=>getOrigins,
    "getPost",
    ()=>getPost,
    "getRequirement",
    ()=>getRequirement,
    "getVisaTypes",
    ()=>getVisaTypes,
    "hydrateBlogPost",
    ()=>hydrateBlogPost,
    "hydrateCountry",
    ()=>hydrateCountry,
    "hydrateRequirement",
    ()=>hydrateRequirement,
    "hydrateVisaType",
    ()=>hydrateVisaType,
    "popularRoutes",
    ()=>popularRoutes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/localized.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/format.ts [app-rsc] (ecmascript)");
;
;
;
const popularRoutes = [
    [
        "uganda",
        "usa"
    ],
    [
        "nigeria",
        "uk"
    ],
    [
        "ghana",
        "canada"
    ],
    [
        "kenya",
        "germany"
    ],
    [
        "philippines",
        "japan"
    ],
    [
        "india",
        "uae"
    ],
    [
        "pakistan",
        "saudi-arabia"
    ],
    [
        "egypt",
        "france"
    ],
    [
        "bangladesh",
        "switzerland"
    ],
    [
        "south-africa",
        "poland"
    ],
    [
        "ethiopia",
        "china"
    ],
    [
        "tanzania",
        "japan"
    ]
];
async function getOrigins() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("*").eq("is_origin", true).order("name->>en");
    if (error) throw error;
    return data ?? [];
}
async function getDestinations() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("*").eq("is_destination", true).order("name->>en");
    if (error) throw error;
    return data ?? [];
}
async function getDestination(slug) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("*").eq("slug", slug).single();
    if (error) return null;
    return data ?? null;
}
async function getCountry(slug) {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("*").eq("slug", slug).single();
    if (error) return null;
    return data ?? null;
}
async function getVisaTypes(dest) {
    const destCountry = await getCountry(dest);
    if (!destCountry) return [];
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("visa_types").select("*").eq("destination_id", destCountry.id).order("code");
    if (error) throw error;
    return data ?? [];
}
async function getRequirement(origin, destination, typeCode) {
    const o = await getCountry(origin);
    const d = await getCountry(destination);
    if (!o || !d) return null;
    let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("visa_requirements").select("*").eq("origin_id", o.id).eq("destination_id", d.id);
    if (typeCode) {
        query = query.eq("type_code", typeCode);
    }
    const { data: reqRow, error } = await query.single();
    // No requirement row at all — generate generic fallback from visa_types
    if (error || !reqRow) {
        return getGenericRequirement(o, d, typeCode);
    }
    // Fetch visa_types defaults for fallback when req columns are NULL
    const types = await getVisaTypes(d.slug);
    const type = types.find((t)=>t.code === (reqRow.type_code ?? typeCode ?? types[0]?.code)) ?? types[0];
    if (!type) return null;
    // Resolve each field: use req value if non-NULL, otherwise fall back to visa_types default
    const resolved = {
        id: reqRow.id,
        origin_id: o.id,
        destination_id: d.id,
        type_code: reqRow.type_code ?? undefined,
        visa_required: reqRow.visa_required,
        visa_type: reqRow.visa_type ?? type.name,
        entry_type: reqRow.entry_type ?? "multiple",
        validity_days: reqRow.validity_days ?? null,
        max_stay_days: reqRow.max_stay_days ?? type.stay_days_max ?? null,
        processing_days_min: reqRow.processing_days_min ?? type.processing_days_min,
        processing_days_max: reqRow.processing_days_max ?? type.processing_days_max,
        official_fee_amount: reqRow.official_fee_amount ?? type.fee_amount,
        official_fee_currency: reqRow.official_fee_currency ?? type.fee_currency,
        mandatory_docs: reqRow.mandatory_docs ?? type.default_mandatory_docs,
        supporting_docs: reqRow.supporting_docs ?? type.default_supporting_docs,
        steps: reqRow.steps ?? type.default_steps,
        fees: reqRow.fees ?? [],
        fee_total_min: reqRow.fee_total_min ?? null,
        fee_total_max: reqRow.fee_total_max ?? null,
        apply_url: reqRow.apply_url ?? type.apply_url,
        embassy_url: reqRow.embassy_url ?? type.embassy_url,
        source_url: reqRow.source_url ?? type.source_url,
        last_verified: reqRow.last_verified ?? type.last_verified ?? new Date().toISOString().split("T")[0],
        detailed: reqRow.detailed,
        created_at: reqRow.created_at,
        updated_at: reqRow.updated_at
    };
    return resolved;
}
/**
 * Build a generic visa requirement fallback when no detailed DB record exists.
 * Uses the destination's visa types for type-specific info.
 */ async function getGenericRequirement(o, d, typeCode) {
    const types = await getVisaTypes(d.slug);
    if (types.length === 0) return null;
    const type = types.find((t)=>t.code === typeCode) ?? types[0];
    const dName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(d.name, "en") ?? d.name;
    const oName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(o.name, "en") ?? o.name;
    return {
        id: "",
        origin_id: o.id,
        destination_id: d.id,
        type_code: type.code,
        visa_required: "yes",
        visa_type: {
            en: type.name.en,
            fr: type.name.fr,
            es: type.name.es,
            ar: type.name.ar
        },
        entry_type: "multiple",
        validity_days: null,
        max_stay_days: type.stay_days_max ?? null,
        processing_days_min: type.processing_days_min,
        processing_days_max: type.processing_days_max,
        official_fee_amount: type.fee_amount,
        official_fee_currency: type.fee_currency,
        mandatory_docs: type.default_mandatory_docs,
        supporting_docs: type.default_supporting_docs,
        steps: type.default_steps,
        fees: [],
        fee_total_min: null,
        fee_total_max: null,
        apply_url: type.apply_url ?? `https://www.google.com/search?q=${encodeURIComponent(`${dName} official visa application`)}`,
        embassy_url: type.embassy_url ?? `https://www.google.com/search?q=${encodeURIComponent(`${dName} embassy in ${oName}`)}`,
        source_url: type.source_url,
        last_verified: type.last_verified ?? new Date().toISOString().split("T")[0],
        detailed: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
}
async function getAllDetailedRoutePairs() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("visa_requirements").select("origin_id, destination_id, type_code").eq("detailed", true);
    if (!data) return [];
    // Resolve UUIDs to slugs
    const { data: countries } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("id, slug");
    if (!countries) return [];
    const idToSlug = new Map(countries.map((c)=>[
            c.id,
            c.slug
        ]));
    return data.map((row)=>({
            origin: idToSlug.get(row.origin_id),
            destination: idToSlug.get(row.destination_id),
            typeCode: row.type_code ?? undefined
        })).filter((p)=>p.origin && p.destination);
}
async function getAllOriginDestinationPairs() {
    const { data: origins } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("slug");
    const { data: destinations } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("slug");
    const pairs = [];
    for (const o of origins ?? []){
        for (const d of destinations ?? []){
            pairs.push({
                origin: o.slug,
                destination: d.slug
            });
        }
    }
    return pairs;
}
async function getAllDestinationSlugs() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("countries").select("slug");
    return (data ?? []).map((c)=>c.slug);
}
async function getAllBlogSlugs() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("blog_post_translations").select("slug").eq("locale", "en");
    return (data ?? []).map((p)=>p.slug);
}
const SITE_URL = ("TURBOPACK compile-time value", "http://localhost:3000") ?? "http://localhost:3000";
function hydrateRequirement(req, locale) {
    return {
        origin: req.origin_id,
        destination: req.destination_id,
        typeCode: req.type_code ?? undefined,
        visaRequired: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])({
            en: req.visa_required,
            fr: req.visa_required,
            es: req.visa_required,
            ar: req.visa_required
        }, locale) ?? req.visa_required,
        visaType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(req.visa_type, locale) ?? "",
        entryType: req.entry_type,
        validity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatValidity"])(req.validity_days),
        maxStay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatMaxStay"])(req.max_stay_days),
        processingTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatProcessingDays"])(req.processing_days_min, req.processing_days_max),
        officialFee: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatFee"])(req.official_fee_amount, req.official_fee_currency, locale),
        mandatoryDocs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tArray"])(req.mandatory_docs, locale),
        supportingDocs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tArray"])(req.supporting_docs, locale),
        steps: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tArray"])(req.steps, locale),
        fees: req.fees.map((f)=>({
                item: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(f.label, locale) ?? f.key,
                cost: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatFeeRange"])(f.min, f.max, f.currency, locale)
            })),
        feeTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatFeeRange"])(req.fee_total_min, req.fee_total_max, req.official_fee_currency, locale),
        applyUrl: req.apply_url,
        embassyUrl: req.embassy_url,
        lastVerified: req.last_verified,
        detailed: req.detailed
    };
}
function hydrateCountry(country, locale) {
    return {
        id: country.id,
        slug: country.slug,
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(country.name, locale) ?? country.name.en ?? "Unknown",
        flag: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["flagFromIso"])(country.iso_code)
    };
}
function hydrateVisaType(visaType, locale) {
    return {
        code: visaType.code,
        name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(visaType.name, locale) ?? visaType.name.en ?? "",
        icon: visaType.icon,
        description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$localized$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["t"])(visaType.description, locale) ?? visaType.description.en ?? "",
        stay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatMaxStay"])(visaType.stay_days_max),
        processing: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatProcessingDays"])(visaType.processing_days_min, visaType.processing_days_max)
    };
}
function hydrateBlogPost(post, locale, countries) {
    const countryById = countries ? Object.fromEntries(countries.map((c)=>[
            c.id,
            c.slug
        ])) : {};
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        cover: post.blog_posts.cover_url,
        tags: post.blog_posts.tags,
        date: post.blog_posts.date,
        readTime: post.blog_posts.read_time,
        author: post.blog_posts.author,
        related: {
            origin: post.blog_posts.related_origin_id ? countryById[post.blog_posts.related_origin_id] : undefined,
            destination: post.blog_posts.related_destination_id ? countryById[post.blog_posts.related_destination_id] : undefined
        },
        content: post.content.split("\n\n").filter(Boolean),
        published: post.blog_posts.published,
        created_at: post.blog_posts.created_at,
        updated_at: post.blog_posts.updated_at
    };
}
async function getPost(slug, locale = "en") {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("blog_post_translations").select(`
      *,
      blog_posts (
        id,
        cover_url,
        tags,
        date,
        read_time,
        author,
        related_origin_id,
        related_destination_id,
        published,
        created_at,
        updated_at
      )
    `).eq("slug", slug).eq("locale", locale).single();
    if (error) return null;
    return data;
}
async function getBlogPosts(locale = "en") {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from("blog_post_translations").select(`
      *,
      blog_posts (
        id,
        cover_url,
        tags,
        date,
        read_time,
        author,
        related_origin_id,
        related_destination_id,
        published,
        created_at,
        updated_at
      )
    `).eq("locale", locale);
    if (error) throw error;
    return (data ?? []).sort((a, b)=>new Date(b.blog_posts.date).getTime() - new Date(a.blog_posts.date).getTime());
}
}),
"[project]/src/components/home/HomePageContent.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/home/HomePageContent.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/HomePageContent.tsx <module evaluation>", "default");
}),
"[project]/src/components/home/HomePageContent.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/home/HomePageContent.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/home/HomePageContent.tsx", "default");
}),
"[project]/src/components/home/HomePageContent.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HomePageContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/home/HomePageContent.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HomePageContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/home/HomePageContent.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HomePageContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/[locale]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HomePageContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/HomePageContent.tsx [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: "TryVisaInfo — Visa requirements, documents & fees",
    description: "Find visa requirements, documents, fees and processing times for any route.",
    openGraph: {
        type: "website"
    },
    twitter: {
        card: "summary_large_image"
    }
};
async function Home({ params }) {
    const locale = (await params).locale;
    const [origins, destinations] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getOrigins"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDestinations"])()
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HomePageContent$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        origins: origins,
        destinations: destinations
    }, void 0, false, {
        fileName: "[project]/src/app/[locale]/page.tsx",
        lineNumber: 26,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/[locale]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[locale]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0bqe.5g._.js.map