const DEFAULT_SETTINGS = {
    company_name: "Buy Commodity Solutions Private Limited",
    mobile_1: "+91 99101 56202",
    mobile_2: "+91 88514 24339",
    whatsapp: "+91 99101 56202",
    email: "ankit@buycommodity.com",
    website: "www.buycommodity.in",
    corporate_office: "Wing A, 5th Floor Statesmen House, Connaught Place, New Delhi - 110001",
    gst_address: "Wing A, 5th Floor Statesmen House, Connaught Place, New Delhi - 110001",
    gst_number: "",
    working_hours: "Mon - Sat: 9:30 AM - 6:30 PM | Sunday: Closed",
    enquiry_email: "ankit@buycommodity.com",
    google_maps_link: "",
    footer_text: "",
    social_links: "{}"
};

const STATIC_CATALOG = [
    { cat: "Mild Steel (MS)", name: "HR Coil", type: "Hot Rolled Coil", thickness: "1.6 - 16 mm", width: "900 - 1850 mm", length: "Full Size", grade: "Grade 1 (IS10748) | Grade 2 (IS1079DD) | E250/E350 (IS2062) | SAPH440 | BSK 46 | IS1079" },
    { cat: "Mild Steel (MS)", name: "HR Sheets / Plates", type: "Hot Rolled Sheets / Plates", thickness: "1.6 - 60 mm", width: "900 - 1850 mm / as per requirement", length: "1500 - 12000 mm / custom", grade: "Grade 1 (IS10748) | Grade 2 (IS1079DD) | E250/E350 (IS2062) | SAPH440 | BSK 46 | IS1079" },
    { cat: "Mild Steel (MS)", name: "CR Coil", type: "Cold Rolled Coil", thickness: "0.5 - 2.5 mm", width: "900 - 1520 mm", length: "Full Size", grade: "CR2 (D) | CR3 (DD) | CR4 (EDD)" },
    { cat: "Mild Steel (MS)", name: "CR Sheet", type: "Cold Rolled Sheet", thickness: "0.5 - 2.5 mm", width: "900 - 1520 mm", length: "1500 - 6300 mm", grade: "CR2 (D) | CR3 (DD) | CR4 (EDD)" },
    { cat: "Stainless Steel (SS)", name: "SS Coil", type: "Stainless Steel Coil", thickness: "2.0 - 12.0 mm", width: "1250 mm", length: "Coil", grade: "304 | JT | SDM | DD | CU | J4 | JSL-AUS" },
    { cat: "Stainless Steel (SS)", name: "SS Sheets / Plates", type: "Stainless Steel Sheets / Plates", thickness: "0.50 - 80 mm", width: "1250 mm / as per requirement", length: "Blank / Sheet / Plate", grade: "304 | JT | SDM | DD | CU | J4 | JSL-AUS" },
    { cat: "Stainless Steel (SS)", name: "SS Slab", type: "Stainless Steel Slab", thickness: "Maximum 200 mm", width: "1285 mm", length: "Slab", grade: "304 | JT | SDM | DD | CU | J4 | JSL-AUS" },
    { cat: "Structural Steel", name: "Angle", type: "MS Angle", thickness: "3 - 20 mm", width: "20 - 200 mm", length: "Standard / Custom", grade: "IS2062, E250, E350 and commercial grades" },
    { cat: "Structural Steel", name: "Flat", type: "MS Flat", thickness: "5 - 65 mm", width: "25 - 500 mm", length: "Standard / Custom", grade: "IS2062 and commercial grades" },
    { cat: "Structural Steel", name: "Channel", type: "MS Channel", thickness: "As per section", width: "75x40 | 100x50 | 125x65 | 150x75 | 175x75 | 200x75 | 225x80 | 250x80 | 300x90 | 350x100 | 400x100", length: "Standard / Custom", grade: "IS2062, E250, E350" },
    { cat: "Structural Steel", name: "I / H / NPV Beams", type: "I / H / NPV Beams", thickness: "As per section", width: "100x50 | 125x70 | 150x75 | 175x85 | 200x100 | 225x110 | 250x125 | 300x140 | 350x140 | 400x140 | 450x150 | 500x180 | 550x190 | 600x210 and NPV sections", length: "6 m - 12 m", grade: "IS2062, E250, E350" },
    { cat: "Structural Steel", name: "MS Round / Square / Rectangular Hollow Pipe", type: "MS Pipes & Hollow Sections", thickness: "As per pipe / section", width: "Round, Square and Rectangular sections", length: "Standard / Custom Length", grade: "MS / Structural Pipe grades" },
    { cat: "Stainless Steel (SS)", name: "SS Pipe", type: "Round / Square / Rectangle SS Pipe", thickness: "As per section", width: "Standard sizes", length: "Standard Length", grade: "202 | 304" },
    { cat: "Structural Steel", name: "Round Bar", type: "MS Round Bar", thickness: "16 | 18 | 20 | 22 | 25 | 28 | 30 | 32 | 34 | 36 | 38 | 40 | 42 | 45 | 47 | 50 | 56 | 60 | 63 | 66 | 71 | 75 | 80 | 85 | 90 | 100 | 110 | 118 | 125 | 130 | 155 mm", width: "Diameter sizes", length: "Standard Length", grade: "Commercial / IS grades" },
    { cat: "Structural Steel", name: "Square Bar", type: "MS Square Bar", thickness: "6 | 16 | 18 | 20 | 22 | 25 | 28 | 32 | 36 | 40 | 45 | 50 | 55 mm", width: "Square sizes", length: "Standard Length", grade: "Commercial / IS grades" },
    { cat: "Stainless Steel (SS)", name: "SS Round Bar", type: "SS Round Bar", thickness: "5.0 - 350.0 mm", width: "Diameter sizes", length: "Standard Length", grade: "304 / 202 and as required" },
    { cat: "Structural Steel", name: "TMT", type: "TMT Bar", thickness: "6 | 8 | 10 | 12 | 16 | 20 | 22 | 25 | 28 | 32 | 36 | 40 mm", width: "Diameter sizes", length: "Standard Length", grade: "Fe 500 / Fe 550 and as required" }
];

const STATIC_CATALOG_GROUPS = [
    { id: "coils", title: "Coils", desc: "Hot Rolled, Cold Rolled and Stainless Steel coils for industrial procurement.", items: ["HR Coil", "CR Coil", "SS Coil"] },
    { id: "plates-sheets", title: "Sheets / Plates", desc: "HR, CR and Stainless Steel Sheets / Plates.", items: ["HR Sheets / Plates", "CR Sheet", "SS Sheets / Plates", "SS Slab"] },
    { id: "angles-flats", title: "Angles & Flats", desc: "MS angles and flats in standard and requirement-specific sizes.", items: ["Angle", "Flat"] },
    { id: "channels-beams", title: "Channels & Beams", desc: "MS Channels, I / H / NPV Beams for fabrication, construction and engineering use.", items: ["Channel", "I / H / NPV Beams"] },
    { id: "pipes", title: "Pipes", desc: "MS Round / Square / Rectangular Pipes and Hollow Sections, plus stainless steel pipe options.", items: ["MS Round / Square / Rectangular Hollow Pipe", "SS Pipe"] },
    { id: "bars-tmt", title: "Bars & TMT", desc: "Round bars, square bars and TMT bars in standard sizes and grades.", items: ["Round Bar", "Square Bar", "SS Round Bar", "TMT"] }
];

const UNIT_OPTIONS = ["Kg", "MT", "Piece", "Metre", "Sheet", "Coil"];
const RATE_DISPLAY_OPTIONS = ["show_price", "price_on_request", "coming_soon", "out_of_stock"];
const IMAGE_TYPE_CONFIG = [
    { key: "segment_photo", label: "Product Segment Photographs", tbodyId: "segmentPhotoRows" },
    { key: "segment_icon", label: "Product Segment Icons", tbodyId: "segmentIconRows" },
    { key: "product_photo", label: "Product Photographs", tbodyId: "productPhotoRows" }
];

const SEGMENTS_CACHE_KEY = "bcspl-public-segments-v5";
const HOME_PRODUCTS_CACHE_KEY = "bcspl-public-home-products-v4";
const CACHE_TTL_MS = 30 * 60 * 1000;

const state = {
    admin: {
        activeSection: "dashboardSection",
        segments: [],
        categories: [],
        products: [],
        pricing: [],
        grades: [],
        images: [],
        enquiries: [],
        recipients: [],
        editingIndexes: {
            segments: new Set(),
            categories: new Set(),
            products: new Set(),
            pricing: new Set(),
            grades: new Set(),
            recipients: new Set(),
            segment_photo: new Set(),
            segment_icon: new Set(),
            product_photo: new Set()
        },
        editSnapshots: {},
        deleteQueues: {
            segments: [],
            categories: [],
            products: [],
            pricing: [],
            grades: [],
            recipients: []
        },
        tableViews: {}
    },
    public: {
        loading: true,
        error: false,
        segments: [],
        categories: [],
        products: [],
        pricing: [],
        images: [],
        homeProducts: []
    }
};

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function toBool(value, fallback = true) {
    if (typeof value === "boolean") return value;
    if (value == null) return fallback;
    const text = String(value).trim().toLowerCase();
    if (["true", "yes", "1", "active", "y"].includes(text)) return true;
    if (["false", "no", "0", "inactive", "n"].includes(text)) return false;
    return fallback;
}

function cleanName(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\//g, "-")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function normalizeSearchText(...parts) {
    return parts.map((part) => String(part || "").toLowerCase().trim()).join(" ").replace(/\s+/g, " ").trim();
}

function dateOnly(value) {
    return value ? String(value).slice(0, 10) : "";
}

function addDays(dateText, days) {
    if (!dateText || !days) return "";
    const date = new Date(`${dateText}T00:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    date.setDate(date.getDate() + Number(days));
    return date.toISOString().slice(0, 10);
}

function priceValidTill(pricingRow) {
    return addDays(dateOnly(pricingRow?.rate_updated_on), pricingRow?.price_validity_days);
}

function formatNumericRate(value) {
    if (value === "" || value == null || Number.isNaN(Number(value))) return "";
    const number = Number(value);
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(number);
}

function formatRateDisplayState(pricingRow) {
    const mode = pricingRow?.rate_display || "price_on_request";
    if (mode === "coming_soon") return { text: "Coming Soon", validTill: "", showValidity: false };
    if (mode === "out_of_stock") return { text: "Currently Unavailable", validTill: "", showValidity: false };
    if (mode === "price_on_request") return { text: "Price on Request", validTill: "", showValidity: false };
    const rateText = formatNumericRate(pricingRow?.rate);
    const unitText = String(pricingRow?.unit || "").trim();
    const validTill = priceValidTill(pricingRow);
    return {
        text: rateText && unitText ? `\u20B9${rateText} / ${unitText}` : "Price on Request",
        validTill,
        showValidity: Boolean(validTill)
    };
}

function readCache(key) {
    try {
        const raw = sessionStorage.getItem(key) || localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.expiresAt || Date.now() > parsed.expiresAt) {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
            return null;
        }
        return parsed.payload || null;
    } catch {
        return null;
    }
}

function writeCache(key, payload) {
    const item = JSON.stringify({ expiresAt: Date.now() + CACHE_TTL_MS, payload });
    try {
        sessionStorage.setItem(key, item);
    } catch {
        try {
            localStorage.setItem(key, item);
        } catch {
            return;
        }
    }
}

function clearPublicMetadataCaches() {
    [SEGMENTS_CACHE_KEY, HOME_PRODUCTS_CACHE_KEY].forEach((key) => {
        try { sessionStorage.removeItem(key); } catch {}
        try { localStorage.removeItem(key); } catch {}
    });
}

function normalizeSegment(item, index) {
    return {
        segment_id: item?.segment_id || "",
        segment_name: item?.segment_name || "",
        description: item?.description || "",
        segment_photo_image_id: item?.segment_photo_image_id || "",
        segment_icon_image_id: item?.segment_icon_image_id || "",
        display_order: Number(item?.display_order || index + 1),
        active: item?.active !== false
    };
}

function normalizeCategory(item) {
    return {
        category_id: item?.category_id || "",
        segment_id: item?.segment_id || "",
        category_name: item?.category_name || "",
        active: item?.active !== false
    };
}

function normalizeProduct(item, index) {
    return {
        product_id: item?.product_id || "",
        segment_id: item?.segment_id || "",
        category_id: item?.category_id || "",
        product_name: item?.product_name || "",
        description: item?.description || "",
        product_photo_image_id: item?.product_photo_image_id || "",
        show_on_home: item?.show_on_home === true,
        home_display_order: item?.home_display_order == null || item?.home_display_order === "" ? "" : Number(item.home_display_order),
        show_on_prices_enquiry: item?.show_on_prices_enquiry === true,
        prices_enquiry_display_order: item?.prices_enquiry_display_order == null || item?.prices_enquiry_display_order === "" ? "" : Number(item.prices_enquiry_display_order),
        display_order: Number(item?.display_order || index + 1),
        active: item?.active !== false
    };
}

function normalizePricing(item, index) {
    return {
        pricing_id: item?.pricing_id || "",
        product_id: item?.product_id || "",
        grade_id: item?.grade_id || "",
        grade_name: item?.grade_name || "",
        specification: item?.specification || "",
        size_thickness: item?.size_thickness || "",
        unit: item?.unit || "",
        rate: item?.rate == null || item?.rate === "" ? "" : Number(item.rate),
        rate_display: item?.rate_display || "price_on_request",
        price_validity_days: item?.price_validity_days == null || item?.price_validity_days === "" ? "" : Number(item.price_validity_days),
        rate_updated_on: item?.rate_updated_on || "",
        remarks: item?.remarks || "",
        display_order: Number(item?.display_order || index + 1),
        active: item?.active !== false
    };
}

function normalizeGrade(item, index) {
    return {
        grade_id: item?.grade_id || "",
        product_id: item?.product_id || "",
        product_name: item?.product_name || "",
        category_id: item?.category_id || "",
        category_name: item?.category_name || "",
        segment_id: item?.segment_id || "",
        segment_name: item?.segment_name || "",
        grade_name: item?.grade_name || "",
        display_order: Number(item?.display_order || index + 1),
        active: item?.active !== false
    };
}

function normalizeImage(item) {
    return {
        image_id: item?.image_id || "",
        image_name: item?.image_name || "",
        image_type: item?.image_type || "",
        source_type: item?.source_type || "local",
        file_path: item?.file_path || "",
        mime_type: item?.mime_type || "",
        active: item?.active !== false
    };
}

function normalizeEnquiryRecipient(item, index) {
    return {
        id: item?.id || "",
        display_name: item?.display_name || "",
        email: item?.email || "",
        display_order: Number(item?.display_order || index + 1),
        active: item?.active !== false
    };
}

function getPublicSegmentById(segmentId) {
    return state.public.segments.find((segment) => segment.segment_id === segmentId) || null;
}

function getPublicCategoryById(categoryId) {
    return state.public.categories.find((category) => category.category_id === categoryId) || null;
}

function getPublicProductById(productId) {
    return state.public.products.find((product) => product.product_id === productId) || null;
}

function getPublicPricingById(pricingId) {
    return state.public.pricing.find((pricing) => pricing.pricing_id === pricingId) || null;
}

function getAdminSegmentById(segmentId) {
    return state.admin.segments.find((segment) => segment.segment_id === segmentId) || null;
}

function getAdminCategoryById(categoryId) {
    return state.admin.categories.find((category) => category.category_id === categoryId) || null;
}

function getAdminProductById(productId) {
    return state.admin.products.find((product) => product.product_id === productId) || null;
}

function getImageById(imageId, source = state.public.images) {
    return source.find((image) => image.image_id === imageId) || null;
}

function resolveImageUrl(imageId, source = state.public.images) {
    const image = typeof imageId === "object" ? imageId : getImageById(imageId, source);
    if (!image) return "";
    if (image.source_type === "storage") {
        return BCSPLDataLayer.getStoragePublicUrl(image.file_path);
    }
    return image.file_path;
}

async function loadSiteSettings() {
    try {
        const row = await BCSPLDataLayer.fetchSiteSettings();
        return { ...DEFAULT_SETTINGS, ...(row || {}) };
    } catch (error) {
        console.error("Unable to load site settings.", error);
        return { ...DEFAULT_SETTINGS };
    }
}

async function saveSiteSettings() {
    const payload = {
        company_name: document.getElementById("set_company_name")?.value?.trim() || DEFAULT_SETTINGS.company_name,
        mobile_1: document.getElementById("set_mobile_1")?.value?.trim() || "",
        mobile_2: document.getElementById("set_mobile_2")?.value?.trim() || "",
        whatsapp: document.getElementById("set_whatsapp")?.value?.trim() || "",
        email: document.getElementById("set_email")?.value?.trim() || "",
        website: document.getElementById("set_website")?.value?.trim() || "",
        corporate_office: document.getElementById("set_corporate_office")?.value?.trim() || "",
        gst_address: document.getElementById("set_gst_address")?.value?.trim() || "",
        gst_number: document.getElementById("set_gst_number")?.value?.trim() || "",
        working_hours: document.getElementById("set_working_hours")?.value?.trim() || "",
        enquiry_email: document.getElementById("set_enquiry_email")?.value?.trim() || "",
        google_maps_link: document.getElementById("set_google_maps_link")?.value?.trim() || "",
        footer_text: document.getElementById("set_footer_text")?.value?.trim() || "",
        social_links: document.getElementById("set_social_links")?.value?.trim() || "{}",
        updated_at: new Date().toISOString()
    };

    try {
        await BCSPLDataLayer.saveSiteSettings(payload);
        return true;
    } catch (error) {
        console.error("Unable to save site settings.", error);
        return false;
    }
}

async function renderBasics() {
    const settings = await loadSiteSettings();
    const phone = settings.mobile_1 || "";
    const phone2 = settings.mobile_2 || "";
    const email = settings.enquiry_email || settings.email || "";

    document.querySelectorAll("[data-phone]").forEach((node) => { node.textContent = phone; });
    document.querySelectorAll("[data-phone2]").forEach((node) => { node.textContent = phone2; });
    document.querySelectorAll("[data-email]").forEach((node) => { node.textContent = email; });
    document.querySelectorAll("[data-website]").forEach((node) => { node.textContent = settings.website || ""; });
    document.querySelectorAll("[data-address]").forEach((node) => { node.textContent = settings.corporate_office || ""; });
    document.querySelectorAll("[data-corporate-address]").forEach((node) => { node.textContent = settings.corporate_office || ""; });
    document.querySelectorAll("[data-gst-address]").forEach((node) => { node.textContent = settings.gst_address || ""; });
    document.querySelectorAll("[data-whatsapp]").forEach((node) => { node.textContent = settings.whatsapp || ""; });
    document.querySelectorAll("[data-working-hours]").forEach((node) => { node.textContent = settings.working_hours || ""; });

    document.querySelectorAll("[data-call]").forEach((node) => { node.href = `tel:${phone.replace(/\s/g, "")}`; });
    document.querySelectorAll("[data-whatsapp-link]").forEach((node) => { node.href = `https://wa.me/${String(settings.whatsapp || "").replace(/[^0-9]/g, "")}`; });
    document.querySelectorAll("[data-website-link]").forEach((node) => {
        const website = settings.website || "";
        node.href = website.startsWith("http") ? website : `https://${website}`;
    });
}

function renderPublicState(container, kind, message) {
    if (!container) return;
    container.innerHTML = `<div class="public-state public-state-${kind}">${escapeHtml(message)}</div>`;
}

async function loadPublicSegmentsFromCache() {
    const cached = readCache(SEGMENTS_CACHE_KEY);
    if (cached) {
        state.public.segments = (cached.segments || []).map(normalizeSegment);
        if (!state.public.images.length) state.public.images = (cached.images || []).map(normalizeImage);
        return;
    }

    try {
        const [segments, images] = await Promise.all([
            BCSPLDataLayer.fetchPublicSegments(),
            BCSPLDataLayer.fetchActiveImages()
        ]);
        state.public.segments = (segments || []).map(normalizeSegment);
        state.public.images = (images || []).map(normalizeImage);
        writeCache(SEGMENTS_CACHE_KEY, { segments: state.public.segments, images: state.public.images });
    } catch (error) {
        console.error("Unable to load cached public segments.", error);
    }
}

async function loadHomeProductsFromCache() {
    const cached = readCache(HOME_PRODUCTS_CACHE_KEY);
    if (cached) {
        state.public.homeProducts = (cached.products || []).map(normalizeProduct);
        if (!state.public.categories.length) state.public.categories = (cached.categories || []).map(normalizeCategory);
        if (!state.public.images.length) state.public.images = (cached.images || []).map(normalizeImage);
        return;
    }

    try {
        const [products, categories, images] = await Promise.all([
            BCSPLDataLayer.fetchPublicHomeProducts(),
            BCSPLDataLayer.fetchCategories({ includeInactive: false }),
            BCSPLDataLayer.fetchActiveImages()
        ]);
        state.public.homeProducts = (products || []).map(normalizeProduct);
        state.public.categories = (categories || []).map(normalizeCategory);
        if (!state.public.images.length) state.public.images = (images || []).map(normalizeImage);
        writeCache(HOME_PRODUCTS_CACHE_KEY, {
            products: state.public.homeProducts,
            categories: state.public.categories,
            images: state.public.images
        });
    } catch (error) {
        console.error("Unable to load cached home shortcuts.", error);
    }
}

async function loadFullPublicData() {
    state.public.loading = true;
    state.public.error = false;

    try {
        const [segments, categories, products, pricing, images] = await Promise.all([
            BCSPLDataLayer.fetchPublicSegments(),
            BCSPLDataLayer.fetchCategories({ includeInactive: false }),
            BCSPLDataLayer.fetchProducts({ includeInactive: false }),
            BCSPLDataLayer.fetchProductPricing({ includeInactive: false }),
            BCSPLDataLayer.fetchActiveImages()
        ]);

        state.public.segments = (segments || []).map(normalizeSegment);
        state.public.categories = (categories || []).map(normalizeCategory);
        state.public.products = (products || []).map(normalizeProduct);
        state.public.pricing = (pricing || []).map(normalizePricing);
        state.public.images = (images || []).map(normalizeImage);
        state.public.homeProducts = [...state.public.products]
            .filter((product) => product.show_on_home === true && product.show_on_prices_enquiry === true)
            .sort((a, b) => Number(a.home_display_order || 9999) - Number(b.home_display_order || 9999)
                || String(a.product_name || "").localeCompare(String(b.product_name || ""))
                || String(a.product_id || "").localeCompare(String(b.product_id || "")))
            .slice(0, 8);

        writeCache(SEGMENTS_CACHE_KEY, { segments: state.public.segments, images: state.public.images });
        writeCache(HOME_PRODUCTS_CACHE_KEY, { products: state.public.homeProducts, categories: state.public.categories, images: state.public.images });
    } catch (error) {
        console.error("Unable to load public catalogue data.", error);
        state.public.error = true;
    } finally {
        state.public.loading = false;
    }
}

function resolveHomepageSegmentIcon(segmentName, databaseIconId) {
    const name = String(segmentName || "").trim().toLowerCase();
    if (name.includes("pig iron")) return "assets/icon-segment-pig-iron.svg";
    if (name.includes("scrap")) return "assets/icon-segment-scrap.svg";
    if ((name === "round" || name === "rounds" || name.includes("rounds &") || name.includes("& rounds")) && !name.includes("square")) {
        return "assets/icon-segment-rounds.svg";
    }
    if (name.includes("flat") && !name.includes("round") && !name.includes("angle")) {
        return "assets/icon-segment-flat-bars.svg";
    }
    return resolveImageUrl(databaseIconId);
}

function renderHomeSegments() {
    const container = document.getElementById("featuredProducts");
    if (!container) return;

    if (state.public.loading && !state.public.segments.length) {
        renderPublicState(container, "loading", "Loading product segments...");
        return;
    }
    if (state.public.error && !state.public.segments.length) {
        renderPublicState(container, "error", "We could not load product segments right now. Please try again shortly.");
        return;
    }
    if (!state.public.segments.length) {
        renderPublicState(container, "empty", "No product segments are available at the moment.");
        return;
    }

    const segments = [...state.public.segments]
        .filter((segment) => segment.active !== false)
        .sort((a, b) =>
            Number(a.display_order || 0) - Number(b.display_order || 0)
            || String(a.segment_name || "").localeCompare(String(b.segment_name || ""))
            || String(a.segment_id || "").localeCompare(String(b.segment_id || ""))
        );
    container.classList.toggle("mobile-odd-segment-count", segments.length % 2 === 1);
    container.dataset.segmentCount = String(segments.length);
    container.innerHTML = segments.map((segment, index) => {
        const photoUrl = resolveImageUrl(segment.segment_photo_image_id);
        const iconUrl = resolveHomepageSegmentIcon(segment.segment_name, segment.segment_icon_image_id);
        const description = String(segment.description || "").trim();
        const items = description.split(/\s*(?:\/|,|•|\||;|\band\b)\s*/i).map((item) => item.trim()).filter(Boolean).slice(0, 4);
        const detailHtml = items.length > 1
            ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
            : `<p>${escapeHtml(description)}</p>`;
        return `<a class="home-cat-card" data-product="${escapeHtml(segment.segment_name)}" href="products.html?segment_id=${encodeURIComponent(segment.segment_id)}" title="Open ${escapeHtml(segment.segment_name)} details" aria-label="Open ${escapeHtml(segment.segment_name)} product details"><div class="home-cat-visual">${photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(segment.segment_name)}" loading="${index === 0 ? "eager" : "lazy"}">` : ""}</div>${iconUrl ? `<span class="home-icon" aria-hidden="true"><img src="${escapeHtml(iconUrl)}" alt=""></span>` : ""}<div class="home-cat-body"><h3>${escapeHtml(segment.segment_name)}</h3>${detailHtml}<span class="home-card-link">View Products</span><span class="card-arrow">&#8599;</span></div></a>`;
    }).join("");
    bindSegmentCarousel();
}

function bindSegmentCarousel() {
    const carousel = document.getElementById("featuredProducts");
    if (!carousel) return;
    const shell = carousel.closest(".segment-carousel-shell");
    const previous = shell?.querySelector(".segment-prev");
    const next = shell?.querySelector(".segment-next");
    if (!shell || !previous || !next) return;

    const updateButtons = () => {
        const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
        previous.disabled = carousel.scrollLeft <= 2;
        next.disabled = carousel.scrollLeft >= maxScroll - 2;
        const hasOverflow = maxScroll > 4;
        previous.hidden = !hasOverflow;
        next.hidden = !hasOverflow;
    };

    const scrollDistance = () => {
        const firstCard = carousel.querySelector(".home-cat-card");
        if (!firstCard) return Math.max(280, carousel.clientWidth * 0.72);
        const gap = Number.parseFloat(getComputedStyle(carousel).gap || "0") || 0;
        return Math.max(firstCard.getBoundingClientRect().width + gap, carousel.clientWidth * 0.34);
    };

    previous.onclick = () => carousel.scrollBy({ left: -scrollDistance() * 2, behavior: "smooth" });
    next.onclick = () => carousel.scrollBy({ left: scrollDistance() * 2, behavior: "smooth" });

    if (carousel.dataset.carouselBound !== "true") {
        carousel.dataset.carouselBound = "true";
        carousel.addEventListener("scroll", updateButtons, { passive: true });
        window.addEventListener("resize", updateButtons, { passive: true });
    }

    carousel.scrollLeft = 0;
    requestAnimationFrame(updateButtons);
    setTimeout(updateButtons, 150);
}

function renderHomeSearchChips() {
    const chips = document.getElementById("homeSearchChips");
    if (!chips) return;
    const values = [...state.public.homeProducts]
        .filter((product) => product.show_on_home === true && product.show_on_prices_enquiry === true)
        .sort((a, b) => Number(a.home_display_order || 9999) - Number(b.home_display_order || 9999)
            || String(a.product_name || "").localeCompare(String(b.product_name || ""))
            || String(a.product_id || "").localeCompare(String(b.product_id || "")))
        .slice(0, 8);
    chips.innerHTML = values.map((product) => `<a class="home-shortcut-chip" href="enquiry.html?product_id=${encodeURIComponent(product.product_id)}">${escapeHtml(product.product_name)}</a>`).join("");
}

function searchableItems() {
    return state.public.pricing.map((pricing) => {
        const product = getPublicProductById(pricing.product_id);
        if (!product || product.show_on_prices_enquiry !== true || product.active === false) return null;
        const category = product ? getPublicCategoryById(product.category_id) : null;
        const segment = product ? getPublicSegmentById(product.segment_id) : null;
        if (!category || category.active === false || !segment || segment.active === false || pricing.active === false) return null;
        const rateState = formatRateDisplayState(pricing);
        return {
            productId: product?.product_id || "",
            pricingId: pricing.pricing_id || "",
            productName: product?.product_name || "Product",
            categoryName: category?.category_name || "",
            segmentName: segment?.segment_name || "",
            grade: pricing.grade_name || "",
            specification: pricing.specification || "",
            sizeThickness: pricing.size_thickness || "",
            remarks: pricing.remarks || "",
            rateText: rateState.text,
            validTill: rateState.validTill || "",
            imageUrl: resolveImageUrl(product?.product_photo_image_id),
            searchText: normalizeSearchText(segment?.segment_name, category?.category_name, product?.product_name, pricing.grade_name, pricing.specification, pricing.size_thickness, pricing.remarks)
        };
    }).filter(Boolean);
}

function renderSearchResults(query) {
    const container = document.getElementById("homeSearchResults");
    if (!container) return;

    const text = String(query || "").trim().toLowerCase();
    if (!text) {
        container.className = "hero-search-results";
        container.innerHTML = "";
        return;
    }

    const terms = text.split(/\s+/).filter(Boolean);
    const matches = searchableItems()
        .map((item) => ({ item, score: terms.reduce((score, term) => score + (item.searchText.includes(term) ? 1 : 0), item.searchText.includes(text) ? 2 : 0) }))
        .filter((entry) => entry.score > 0 && entry.item.productId)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((entry) => entry.item);

    container.className = "hero-search-results active";
    if (!matches.length) {
        container.innerHTML = '<div class="search-no-result">No exact match found. Please share your requirement and our team will help you identify the right product. <a href="enquiry.html">Send Enquiry</a></div>';
        return;
    }

    container.innerHTML = matches.map((item) => `<a class="search-product-tile" href="enquiry.html?product_id=${encodeURIComponent(item.productId)}&pricing_id=${encodeURIComponent(item.pricingId || "")}">${item.imageUrl ? `<div class="search-product-img"><img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.productName)}" loading="lazy"></div>` : ""}<div class="search-product-body"><h4>${escapeHtml(item.productName)}</h4><p>${escapeHtml([item.segmentName, item.categoryName].filter(Boolean).join(" | "))}</p><small>${escapeHtml([item.grade, item.specification, item.sizeThickness].filter(Boolean).join(" | "))}</small><small>${escapeHtml(item.rateText)}${item.validTill ? ` | Valid till: ${escapeHtml(item.validTill)}` : ""}</small><span>Enquire</span></div></a>`).join("");
}

function bindHomeSearch() {
    const input = document.getElementById("homeSearch");
    if (!input) return;

    const run = () => renderSearchResults(input.value);
    document.getElementById("homeSearchBtn")?.addEventListener("click", run);
    document.getElementById("homeSearchClear")?.addEventListener("click", () => {
        input.value = "";
        renderSearchResults("");
        input.focus();
    });

    input.addEventListener("input", () => {
        if (input.value.trim().length >= 2) run();
        else renderSearchResults("");
    });
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            run();
        }
    });

    // Home chips are direct links in RC7 and intentionally do not scope search.
}

function renderProductsPage() {
    const container = document.getElementById("allProducts");
    if (!container) return;

    const byName = Object.fromEntries(STATIC_CATALOG.map((item) => [item.name, item]));
    container.innerHTML = STATIC_CATALOG_GROUPS.map((group) => `<section class="catalog-section" id="${group.id}"><div class="catalog-head"><span>Product Segment</span><h2>${escapeHtml(group.title)}</h2><p>${escapeHtml(group.desc)}</p><a class="btn btn-outline segment-enquiry" href="enquiry.html">Check Prices & Enquiry &rarr;</a></div><div class="catalog-list">${group.items.map((name) => byName[name]).filter(Boolean).map((item) => `<article class="catalog-row" id="${cleanName(item.name)}"><div class="catalog-name"><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.cat)}</small><em>${escapeHtml(item.type)}</em></div><div><span>Thickness / Size</span><p>${escapeHtml(item.thickness)}</p></div><div><span>Width / Section</span><p>${escapeHtml(item.width)}</p></div><div><span>Length</span><p>${escapeHtml(item.length)}</p></div><div class="catalog-grade"><span>Grade</span><p>${escapeHtml(item.grade)}</p></div></article>`).join("")}</div></section>`).join("") + '<section class="catalog-note"><b>Customisation:</b> blank sizes, slitting, cutting and sizing can be provided as per requirement, subject to availability and commercial confirmation.</section>';

    const filter = document.getElementById("catFilter");
    if (filter) {
        filter.innerHTML = '<option value="all">All Product Groups</option>' + STATIC_CATALOG_GROUPS.map((group) => `<option value="${group.id}">${escapeHtml(group.title)}</option>`).join("");
        filter.onchange = () => {
            document.querySelectorAll(".catalog-section").forEach((section) => {
                section.style.display = filter.value === "all" || filter.value === section.id ? "block" : "none";
            });
        };
    }
}

function findStaticGroupIdForSegment(segmentName) {
    const key = cleanName(segmentName);
    if (key.includes("coil")) return "coils";
    if (key.includes("sheet") || key.includes("plate")) return "plates-sheets";
    if (key.includes("angle") || key.includes("flat")) return "angles-flats";
    if (key.includes("channel") || key.includes("beam")) return "channels-beams";
    if (key.includes("pipe")) return "pipes";
    if (key.includes("bar") || key.includes("tmt") || key.includes("round")) return "bars-tmt";
    return STATIC_CATALOG_GROUPS.find((group) => cleanName(group.title) === key)?.id || "";
}

function applyProductsPageSegmentTarget() {
    const params = new URLSearchParams(location.search);
    const segmentId = params.get("segment_id") || "";
    if (!segmentId) return;

    const segment = getPublicSegmentById(segmentId);
    const sectionId = findStaticGroupIdForSegment(segment?.segment_name || "");
    if (!sectionId) return;

    const target = document.getElementById(sectionId);
    const catalogue = document.getElementById("allProducts");
    if (!target || !catalogue || !target.classList.contains("catalog-section")) return;

    document.querySelectorAll(".catalog-section").forEach((section) => {
        section.style.display = "block";
        section.classList.remove("catalog-section-highlight");
    });
    const filter = document.getElementById("catFilter");
    if (filter) filter.value = "all";

    const firstSection = catalogue.querySelector(".catalog-section");
    if (firstSection && firstSection !== target) catalogue.insertBefore(target, firstSection);

    target.classList.add("catalog-section-highlight");
    setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    setTimeout(() => target.classList.remove("catalog-section-highlight"), 2500);
}

function publicPricingRowsForProduct(productId) {
    return state.public.pricing.filter((pricing) => pricing.product_id === productId && pricing.active !== false).sort((a, b) =>
        Number(a.display_order || 0) - Number(b.display_order || 0)
        || String(a.grade_name || "").localeCompare(String(b.grade_name || ""))
        || String(a.specification || "").localeCompare(String(b.specification || ""))
        || String(a.size_thickness || "").localeCompare(String(b.size_thickness || ""))
        || String(a.pricing_id || "").localeCompare(String(b.pricing_id || ""))
    );
}

function compactEnquiryRatesTable(rows, { full = false, footerHtml = "" } = {}) {
    const tableRows = rows.length ? rows : [null];
    const headings = full ? "<th>Grade</th><th>Specification</th><th>Size / Thickness</th><th>Rate</th><th>Validity</th>" : "<th>Grade</th><th>Specification / Size</th><th>Rate</th>";
    const renderedRows = tableRows.map((pricing) => {
        if (!pricing) return full
            ? '<tr><td>As required</td><td>As required</td><td>As required</td><td><b>Price on Request</b></td><td>&mdash;</td></tr>'
            : '<tr><td>As required</td><td>As required</td><td><b>Price on Request</b></td></tr>';
        const rateState = formatRateDisplayState(pricing);
        const specification = pricing.specification || "";
        const size = pricing.size_thickness || "";
        const combined = specification && size ? `${specification} \u2022 ${size}` : specification || size || "As required";
        const rate = full
            ? `<b>${escapeHtml(rateState.text)}</b>`
            : `<span class="rate-display-cell"><b>${escapeHtml(rateState.text)}</b><small${rateState.showValidity ? "" : ' class="rate-validity-placeholder" aria-hidden="true"'}>${rateState.showValidity ? `Valid till ${escapeHtml(formatPublicDate(rateState.validTill))}` : "No validity"}</small></span>`;
        const row = full
            ? `<tr data-pricing-row-id="${escapeHtml(pricing.pricing_id)}"><td>${escapeHtml(pricing.grade_name || "As required")}</td><td>${escapeHtml(specification || "As required")}</td><td>${escapeHtml(size || "As required")}</td><td>${rate}</td><td>${rateState.showValidity ? escapeHtml(formatPublicDate(rateState.validTill)) : "&mdash;"}</td></tr>`
            : `<tr data-pricing-row-id="${escapeHtml(pricing.pricing_id)}"><td><span class="preview-cell-clamp">${escapeHtml(pricing.grade_name || "As required")}</span></td><td class="spec-size-cell"><span class="preview-cell-clamp">${escapeHtml(combined)}</span></td><td>${rate}</td></tr>`;
        return full && pricing.remarks ? `${row}<tr class="rate-remarks-row"><td colspan="5"><b>Remarks:</b> ${escapeHtml(pricing.remarks)}</td></tr>` : row;
    }).join("");
    return `<div class="compact-enquiry-table-wrap"><table class="compact-enquiry-rates ${full ? "full-rate-table" : ""}"><thead><tr>${headings}</tr></thead><tbody>${renderedRows}</tbody></table>${footerHtml}</div>`;
}

function formatPublicDate(dateText) {
    if (!dateText) return "";
    const date = new Date(`${dateText}T00:00:00`);
    return Number.isNaN(date.getTime()) ? dateText : new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

const enquiryCatalogueView = { query: "", segmentId: "", productId: "", grade: "", page: 1, pageSize: 9, controlsBound: false };

function publicEnquiryProducts(targetProductId = "") {
    return [...state.public.products]
        .filter((product) => product.active !== false && product.show_on_prices_enquiry === true && (!targetProductId || product.product_id === targetProductId))
        .sort((a, b) => Number(a.prices_enquiry_display_order || 9999) - Number(b.prices_enquiry_display_order || 9999)
            || String(a.product_name || "").localeCompare(String(b.product_name || ""))
            || String(a.product_id || "").localeCompare(String(b.product_id || "")));
}

function enquiryProductSearchText(product) {
    const segment = getPublicSegmentById(product.segment_id);
    const category = getPublicCategoryById(product.category_id);
    const pricing = publicPricingRowsForProduct(product.product_id);
    return normalizeSearchText(product.product_name, segment?.segment_name, category?.category_name,
        ...pricing.flatMap((row) => [row.grade_name, row.specification, row.size_thickness]));
}

function pricingOptionLabel(pricing) {
    const product = getPublicProductById(pricing.product_id);
    const category = product ? getPublicCategoryById(product.category_id) : null;
    const parts = [product?.product_name || "Product", category?.category_name || "", pricing.grade_name || "", pricing.specification || "", pricing.size_thickness || ""];
    return parts.filter(Boolean).join(" | ");
}

const enquirySelectionSession = { productId: "", values: new Map(), selected: new Set() };

function selectedEnquirySelectionIds() {
    return Array.from(document.querySelectorAll('#selectedEnquiryProducts [data-enquiry-select]:checked'))
        .map((checkbox) => checkbox.dataset.enquirySelectionId || "").filter(Boolean);
}

function rememberEnquiryOptionValues() {
    document.querySelectorAll("#selectedEnquiryProducts [data-selected-enquiry-id]").forEach((row) => {
        const checkbox = row.querySelector("[data-enquiry-select]");
        const selectionId = row.dataset.selectedEnquiryId || "";
        if (!selectionId) return;
        if (checkbox?.checked) enquirySelectionSession.selected.add(selectionId);
        else enquirySelectionSession.selected.delete(selectionId);
        enquirySelectionSession.values.set(selectionId, {
            quantity: row.querySelector('[data-enquiry-field="quantity"]')?.value || "",
            unit: row.querySelector('[data-enquiry-field="unit"]')?.value || ""
        });
    });
}

function renderSelectedEnquiryProducts() {
    const wrap = document.getElementById("selectedEnquiryProducts");
    if (!wrap) return;
    rememberEnquiryOptionValues();
    const pricingRows = enquirySelectionSession.productId ? publicPricingRowsForProduct(enquirySelectionSession.productId) : [];
    if (!pricingRows.length && !enquirySelectionSession.productId) {
        wrap.innerHTML = '<div class="selected-product-empty">Choose Create Enquiry on a Product card to view the available products.</div>';
        return;
    }

    const productFallback = !pricingRows.length && !!enquirySelectionSession.productId;
    const selectionRows = productFallback ? publicEnquiryProducts() : pricingRows;
    const helperNote = productFallback ? '<div class="selected-product-empty">This product has no published rates yet. Please pick a product from the list below.</div>' : "";

    wrap.innerHTML = `${helperNote}<div class="enquiry-option-toolbar"><label><input type="checkbox" id="selectAllEnquiryPricing"> <span id="selectAllEnquiryPricingText">Select All Products</span></label><small>${selectionRows.length} ${selectionRows.length === 1 ? "product" : "products"} available</small></div><div class="enquiry-options-scroll">${selectionRows.map((item) => {
        const isPricingRow = !productFallback;
        const selectionId = isPricingRow ? item.pricing_id : item.product_id;
        const previous = enquirySelectionSession.values.get(selectionId) || {};
        const checked = enquirySelectionSession.selected.has(selectionId);
        const product = isPricingRow ? getPublicProductById(item.product_id) : item;
        const category = product ? getPublicCategoryById(product.category_id) : null;
        const segment = product ? getPublicSegmentById(product.segment_id) : null;
        const units = [...new Set([item?.unit, product?.unit, ...UNIT_OPTIONS].filter(Boolean))];
        const rateState = isPricingRow ? formatRateDisplayState(item) : null;
        const detailsHtml = isPricingRow
            ? `<span><small>Grade</small><b>${escapeHtml(item.grade_name || "-")}</b></span><span><small>Specification</small><b>${escapeHtml(item.specification || "-")}</b></span><span><small>Size / Thickness</small><b>${escapeHtml(item.size_thickness || "-")}</b></span><span><small>Rate / Status</small><b>${escapeHtml(rateState.text)}</b></span>`
            : `<span><small>Segment</small><b>${escapeHtml(segment?.segment_name || "-")}</b></span><span><small>Category</small><b>${escapeHtml(category?.category_name || "-")}</b></span><span><small>Product</small><b>${escapeHtml(product?.product_name || "-")}</b></span><span><small>Status</small><b>No published rates yet</b></span>`;
        return `<div class="selected-product-row${isPricingRow ? "" : " selected-product-row-product"}" data-selected-enquiry-id="${escapeHtml(selectionId)}" data-selected-enquiry-kind="${isPricingRow ? "pricing" : "product"}" data-selected-product-id="${escapeHtml(product?.product_id || selectionId)}"><label class="pricing-option-check"><input type="checkbox" data-enquiry-select data-enquiry-selection-id="${escapeHtml(selectionId)}" data-enquiry-selection-kind="${isPricingRow ? "pricing" : "product"}" ${checked ? "checked" : ""}><span>Select Product</span></label><div class="pricing-option-details">${detailsHtml}</div><label>Quantity<input type="number" min="0.001" step="0.001" data-enquiry-field="quantity" value="${escapeHtml(previous.quantity || "")}" placeholder="Quantity" ${checked ? "" : "disabled"}></label><label>Unit<select data-enquiry-field="unit" ${checked ? "" : "disabled"}><option value="">Select Unit</option>${units.map((unit) => `<option value="${escapeHtml(unit)}" ${(previous.unit === unit || (!previous.unit && (item?.unit || product?.unit) === unit)) ? "selected" : ""}>${escapeHtml(unit)}</option>`).join("")}</select></label></div>`;
    }).join("")}</div>`;

    const selectAll = document.getElementById("selectAllEnquiryPricing");
    const update = () => {
        const boxes = Array.from(wrap.querySelectorAll("[data-enquiry-select]"));
        boxes.forEach((checkbox) => {
            const row = checkbox.closest("[data-selected-enquiry-id]");
            row?.classList.toggle("selected", checkbox.checked);
            row?.querySelectorAll('[data-enquiry-field="quantity"],[data-enquiry-field="unit"]').forEach((field) => { field.disabled = !checkbox.checked; });
        });
        const selected = boxes.filter((box) => box.checked).length;
        boxes.forEach((box) => {
            const selectionId = box.dataset.enquirySelectionId || "";
            if (!selectionId) return;
            if (box.checked) enquirySelectionSession.selected.add(selectionId);
            else enquirySelectionSession.selected.delete(selectionId);
        });
        if (selectAll) { selectAll.checked = boxes.length > 0 && selected === boxes.length; selectAll.indeterminate = selected > 0 && selected < boxes.length; }
        const text = document.getElementById("selectAllEnquiryPricingText");
        if (text) text.textContent = selected === boxes.length && boxes.length ? "Clear All Products" : "Select All Products";
    };
    wrap.querySelectorAll("[data-enquiry-select]").forEach((checkbox) => checkbox.onchange = update);
    if (selectAll) selectAll.onchange = () => { wrap.querySelectorAll("[data-enquiry-select]").forEach((checkbox) => { checkbox.checked = selectAll.checked; }); update(); };
    update();
}

function enquirySourceFromUrl() {
    const params = new URLSearchParams(location.search);
    if (params.get("product_id")) return "Home Product Tile";
    if (document.referrer.includes("index.html")) return "Home Page";
    if (document.referrer.includes("products.html")) return "Products Page";
    return "Direct Enquiry Page";
}

function enquiryPayloadFromForm(form) {
    rememberEnquiryOptionValues();
    const products = selectedEnquirySelectionIds().map((selectionId) => {
        const row = document.querySelector(`[data-selected-enquiry-id="${CSS.escape(selectionId)}"]`);
        const kind = row?.dataset.selectedEnquiryKind || "pricing";
        const pricing = kind === "pricing" ? getPublicPricingById(selectionId) : null;
        const product = pricing ? getPublicProductById(pricing.product_id) : getPublicProductById(row?.dataset.selectedProductId || selectionId);
        return {
            product_id: product?.product_id || "",
            pricing_id: pricing?.pricing_id || "",
            quantity: row?.querySelector('[data-enquiry-field="quantity"]')?.value || null,
            unit: row?.querySelector('[data-enquiry-field="unit"]')?.value || pricing?.unit || ""
        };
    });

    const data = new FormData(form);
    return {
        customer_name: String(data.get("customer_name") || "").trim(),
        company_name: String(data.get("company_name") || "").trim(),
        mobile: String(data.get("mobile") || "").trim(),
        email: String(data.get("email") || "").trim(),
        city: String(data.get("city") || "").trim(),
        requirement_details: String(data.get("requirement_details") || "").trim(),
        message: String(data.get("message") || "").trim(),
        source_page: String(data.get("source_page") || enquirySourceFromUrl()).trim(),
        website: String(data.get("website") || "").trim(),
        products
    };
}

function validateEnquiryPayload(payload) {
    if (!payload.customer_name) return "Your Name is required.";
    if (!payload.mobile) return "Mobile Number is required.";
    if (!payload.products.length) return "Select at least one product.";
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return "Enter a valid Email ID.";
    for (const item of payload.products) {
        if (!item.product_id) return "Each selected product must include valid product details.";
        if (item.quantity !== null && item.quantity !== "" && Number(item.quantity) <= 0) return "Quantity must be greater than zero.";
    }
    return "";
}

function showEnquiryForm({ productId = "" } = {}) {
    const formBox = document.querySelector(".formbox");
    rememberEnquiryOptionValues();
    enquirySelectionSession.productId = productId;
    enquirySelectionSession.selected.clear();
    if (productId && !publicPricingRowsForProduct(productId).length) {
        enquirySelectionSession.selected.add(productId);
    }
    renderSelectedEnquiryProducts();
    formBox?.classList.add("active");
    formBox?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setEnquiryFilterOptions(selectId, rows, valueKey, labelKey, allLabel, selectedValue) {
    const select = document.getElementById(selectId);
    if (!select) return "";
    const unique = [...new Map(rows.filter(Boolean).map((row) => [String(row[valueKey] || ""), row])).values()]
        .filter((row) => row[valueKey]).sort((a, b) => String(a[labelKey] || "").localeCompare(String(b[labelKey] || "")));
    select.innerHTML = `<option value="">${allLabel}</option>${unique.map((row) => `<option value="${escapeHtml(row[valueKey])}">${escapeHtml(row[labelKey])}</option>`).join("")}`;
    select.value = unique.some((row) => String(row[valueKey]) === String(selectedValue)) ? selectedValue : "";
    return select.value;
}

function populateEnquiryCatalogueFilters(products) {
    const productIds = new Set(products.map((product) => product.product_id));
    const segments = state.public.segments.filter((segment) => products.some((product) => product.segment_id === segment.segment_id));
    enquiryCatalogueView.segmentId = setEnquiryFilterOptions("enquirySegmentFilter", segments, "segment_id", "segment_name", "All Segments", enquiryCatalogueView.segmentId);
    const scopedProducts = products.filter((product) => !enquiryCatalogueView.segmentId || product.segment_id === enquiryCatalogueView.segmentId);
    enquiryCatalogueView.productId = setEnquiryFilterOptions("enquiryProductFilter", scopedProducts, "product_id", "product_name", "All Products", enquiryCatalogueView.productId);
    const grades = state.public.pricing.filter((pricing) => pricing.active !== false && productIds.has(pricing.product_id)
        && scopedProducts.some((product) => product.product_id === pricing.product_id)
        && (!enquiryCatalogueView.productId || pricing.product_id === enquiryCatalogueView.productId))
        .map((pricing) => ({ grade: pricing.grade_name || "" }));
    enquiryCatalogueView.grade = setEnquiryFilterOptions("enquiryGradeFilter", grades, "grade", "grade", "All Grades", enquiryCatalogueView.grade);
}

function bindEnquiryCatalogueControls() {
    if (enquiryCatalogueView.controlsBound) return;
    enquiryCatalogueView.controlsBound = true;
    const search = document.getElementById("enquiryCatalogueSearch");
    let timer = null;
    search?.addEventListener("input", () => {
        clearTimeout(timer);
        timer = setTimeout(() => { enquiryCatalogueView.query = search.value.trim(); enquiryCatalogueView.page = 1; renderEnquiryPage(); }, 160);
    });
    [["enquirySegmentFilter", "segmentId"], ["enquiryProductFilter", "productId"], ["enquiryGradeFilter", "grade"]].forEach(([id, key]) => {
        document.getElementById(id)?.addEventListener("change", (event) => {
            enquiryCatalogueView[key] = event.target.value;
            if (key === "segmentId") { enquiryCatalogueView.productId = ""; enquiryCatalogueView.grade = ""; }
            if (key === "productId") enquiryCatalogueView.grade = "";
            enquiryCatalogueView.page = 1;
            renderEnquiryPage();
        });
    });
    document.getElementById("enquiryProductsPerPage")?.addEventListener("change", (event) => {
        enquiryCatalogueView.pageSize = Number(event.target.value) || 9;
        enquiryCatalogueView.page = 1;
        renderEnquiryPage();
    });
    document.getElementById("resetEnquiryCatalogueFilters")?.addEventListener("click", () => {
        Object.assign(enquiryCatalogueView, { query: "", segmentId: "", productId: "", grade: "", page: 1 });
        if (search) search.value = "";
        renderEnquiryPage();
    });
}

function renderEnquiryPagination(total) {
    const wrap = document.getElementById("enquiryPagination");
    if (!wrap) return;
    const pages = Math.ceil(total / enquiryCatalogueView.pageSize);
    wrap.hidden = pages <= 1;
    if (pages <= 1) { wrap.innerHTML = ""; return; }
    enquiryCatalogueView.page = Math.min(Math.max(1, enquiryCatalogueView.page), pages);
    wrap.innerHTML = `<button type="button" data-page="${enquiryCatalogueView.page - 1}" ${enquiryCatalogueView.page === 1 ? "disabled" : ""}>Previous</button>${Array.from({ length: pages }, (_, index) => `<button type="button" data-page="${index + 1}" class="${enquiryCatalogueView.page === index + 1 ? "active" : ""}" ${enquiryCatalogueView.page === index + 1 ? 'aria-current="page"' : ""}>${index + 1}</button>`).join("")}<button type="button" data-page="${enquiryCatalogueView.page + 1}" ${enquiryCatalogueView.page === pages ? "disabled" : ""}>Next</button>`;
    wrap.querySelectorAll("button[data-page]").forEach((button) => button.onclick = () => {
        enquiryCatalogueView.page = Number(button.dataset.page) || 1;
        renderEnquiryPage();
        document.querySelector(".enquiry-catalogue-filters")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
}

function renderEnquiryPage() {
    const grid = document.getElementById("enquiryProducts");
    if (!grid) return;

    if (state.public.loading && !state.public.products.length) {
        renderPublicState(grid, "loading", "Loading product pricing...");
        return;
    }
    if (state.public.error && !state.public.products.length) {
        renderPublicState(grid, "error", "We could not load products right now. Please try again shortly.");
        return;
    }

    const params = new URLSearchParams(location.search);
    const targetProductId = params.get("product_id") || "";
    const allProducts = publicEnquiryProducts(targetProductId);

    if (!allProducts.length) {
        renderPublicState(grid, "empty", "No enquiry products are available right now.");
        return;
    }
    bindEnquiryCatalogueControls();
    populateEnquiryCatalogueFilters(allProducts);
    const query = enquiryCatalogueView.query.toLowerCase();
    const products = allProducts.filter((product) => {
        const rows = publicPricingRowsForProduct(product.product_id);
        return (!query || enquiryProductSearchText(product).includes(query))
            && (!enquiryCatalogueView.segmentId || product.segment_id === enquiryCatalogueView.segmentId)
            && (!enquiryCatalogueView.productId || product.product_id === enquiryCatalogueView.productId)
            && (!enquiryCatalogueView.grade || rows.some((row) => row.grade_name === enquiryCatalogueView.grade));
    });
    const resultCount = document.getElementById("enquiryCatalogueResultCount");
    if (resultCount) resultCount.textContent = `Showing ${products.length} of ${allProducts.length} products`;
    const pageCount = Math.max(1, Math.ceil(products.length / enquiryCatalogueView.pageSize));
    enquiryCatalogueView.page = Math.min(enquiryCatalogueView.page, pageCount);
    const pageStart = (enquiryCatalogueView.page - 1) * enquiryCatalogueView.pageSize;
    const pageProducts = products.slice(pageStart, pageStart + enquiryCatalogueView.pageSize);
    renderEnquiryPagination(products.length);

    grid.innerHTML = pageProducts.map((product) => {
        const segment = getPublicSegmentById(product.segment_id);
        const category = getPublicCategoryById(product.category_id);
        const pricingRows = publicPricingRowsForProduct(product.product_id);
        const imageUrl = resolveImageUrl(product.product_photo_image_id);
        const additionalRates = Math.max(0, pricingRows.length - 1);
        const previewFooter = `<div class="rate-table-footer rate-action-strip"><span>${pricingRows.length} ${pricingRows.length === 1 ? "rate" : "rates"} available</span>${additionalRates ? `<button class="approved-view-rates" type="button" aria-expanded="false">View All Rates (${pricingRows.length})</button>` : ""}</div>`;
        const expandedFooter = additionalRates ? `<div class="rate-table-footer rate-action-strip"><button class="approved-view-less" type="button">Hide Rates</button></div>` : "";
        return `<article class="approved-rate-card enquiry-pricing-card ${targetProductId === product.product_id ? "highlighted-category" : ""}" data-product-id="${escapeHtml(product.product_id)}"><div class="approved-rate-head"><div class="approved-rate-image">${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(product.product_name)}" loading="lazy">` : ""}</div><div class="approved-rate-title"><b>${escapeHtml(segment?.segment_name || "Product Segment")}</b><h3>${escapeHtml(product.product_name)}</h3>${category?.category_name ? `<span>${escapeHtml(category.category_name)}</span>` : ""}${product.description ? `<p title="${escapeHtml(product.description)}">${escapeHtml(product.description)}</p>` : ""}</div></div><div class="approved-rate-body">${compactEnquiryRatesTable(pricingRows.slice(0, 1), { footerHtml: previewFooter })}${additionalRates ? `<div class="approved-all-rates" hidden>${compactEnquiryRatesTable(pricingRows, { full: true, footerHtml: expandedFooter })}</div>` : ""}</div><button class="btn btn-outline approved-create-enquiry enqProductPick" type="button" data-product-id="${escapeHtml(product.product_id)}">Create Enquiry &rarr;</button></article>`;
    }).join("") || '<div class="enquiry-no-products"><b>No products match these filters.</b><span>Try changing or resetting the filters.</span></div>';

    const source = document.getElementById("enquirySourcePage");
    if (source) source.value = enquirySourceFromUrl();

    const targetPricingId = params.get("pricing_id") || "";

    document.querySelectorAll(".approved-view-rates").forEach((button) => {
        button.onclick = () => {
            const card = button.closest(".approved-rate-card");
            const allRates = card?.querySelector(".approved-all-rates");
            if (allRates) allRates.hidden = false;
            card?.classList.add("expanded");
            button.setAttribute("aria-expanded", "true");
            button.hidden = true;
        };
    });
    document.querySelectorAll(".approved-view-less").forEach((button) => {
        button.onclick = () => {
            const card = button.closest(".approved-rate-card");
            const allRates = card?.querySelector(".approved-all-rates");
            const viewButton = card?.querySelector(".approved-view-rates");
            if (allRates) allRates.hidden = true;
            card?.classList.remove("expanded");
            if (viewButton) {
                viewButton.hidden = false;
                viewButton.setAttribute("aria-expanded", "false");
            }
        };
    });
    if (targetPricingId) {
        const targetRow = Array.from(document.querySelectorAll("[data-pricing-row-id]")).find((row) => row.dataset.pricingRowId === targetPricingId);
        const card = targetRow?.closest(".approved-rate-card");
        const allRates = card?.querySelector(".approved-all-rates");
        const viewButton = card?.querySelector(".approved-view-rates");
        if (allRates) allRates.hidden = false;
        card?.classList.add("expanded");
        targetRow?.classList.add("highlighted-category");
        if (viewButton) viewButton.hidden = true;
    }
    document.querySelectorAll(".enqProductPick[data-product-id]").forEach((button) => {
        button.onclick = () => showEnquiryForm({ productId: button.dataset.productId || "" });
    });

    const closeForm = document.getElementById("closeEnqForm");
    if (closeForm) closeForm.onclick = () => document.querySelector(".formbox")?.classList.remove("active");
    renderSelectedEnquiryProducts();

    const form = document.getElementById("enqForm");
    if (form) {
        form.onsubmit = async (event) => {
            event.preventDefault();
            const status = document.getElementById("enquirySubmitStatus");
            const button = document.getElementById("submitEnquiryBtn");
            const payload = enquiryPayloadFromForm(form);
            const errorMessage = validateEnquiryPayload(payload);
            if (errorMessage) {
                if (status) {
                    status.className = "full enquiry-submit-status error";
                    status.textContent = errorMessage;
                }
                return;
            }

            if (button) {
                button.disabled = true;
                button.textContent = "Sending...";
            }
            if (status) {
                status.className = "full enquiry-submit-status loading";
                status.textContent = "Saving your enquiry...";
            }

            try {
                const result = await BCSPLDataLayer.submitWebsiteEnquiry(payload);
                form.reset();
                enquirySelectionSession.productId = "";
                enquirySelectionSession.values.clear();
                enquirySelectionSession.selected.clear();
                renderSelectedEnquiryProducts();
                if (status) {
                    status.className = "full enquiry-submit-status success";
                    status.textContent = `Thank you. Your enquiry ${result.enquiry_reference || ""} has been received. Our team will contact you shortly.`;
                }
            } catch (error) {
                console.error("Enquiry submission failed.", error);
                if (status) {
                    status.className = "full enquiry-submit-status error";
                    status.textContent = "We could not submit your enquiry right now. Please try again or contact us directly.";
                }
            } finally {
                if (button) {
                    button.disabled = false;
                    button.textContent = "Send Enquiry \u2192";
                }
            }
        };
    }
}

function download(name, content, type) {
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([content], { type }));
    anchor.download = name;
    anchor.click();
}

function exportRowsToXlsx(rows, fileName, sheetName) {
    if (!window.XLSX) {
        alert("Excel library not loaded.");
        return;
    }
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
}

function parseCsv(text, delimiter) {
    const rows = [];
    let row = [];
    let current = "";
    let quoted = false;
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        const next = text[index + 1];
        if (char === '"') {
            if (quoted && next === '"') {
                current += '"';
                index++;
            } else {
                quoted = !quoted;
            }
        } else if (char === delimiter && !quoted) {
            row.push(current);
            current = "";
        } else if ((char === "\n" || char === "\r") && !quoted) {
            if (current || row.length) {
                row.push(current);
                rows.push(row);
                row = [];
                current = "";
            }
            if (char === "\r" && next === "\n") index++;
        } else {
            current += char;
        }
    }
    if (current || row.length) {
        row.push(current);
        rows.push(row);
    }
    const headers = rows.shift() || [];
    return rows.filter((entry) => entry.length).map((entry) => Object.fromEntries(headers.map((header, index) => [String(header).trim(), entry[index] ?? ""])));
}

function renderAdminSection(sectionId) {
    state.admin.activeSection = sectionId;
    document.querySelectorAll("[data-admin-section]").forEach((section) => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
    document.querySelectorAll("#adminModuleNav [data-section]").forEach((button) => {
        button.classList.toggle("active", button.dataset.section === sectionId);
    });
}

const ADMIN_TABLE_CONFIG = {
    segments: { tbodyId: "segmentRows", countId: "segmentsSelectedCount", selectAllId: "selectAllSegments", numberColumn: 1 },
    categories: { tbodyId: "categoryRows", countId: "categoriesSelectedCount", selectAllId: "selectAllCategories", numberColumn: 1 },
    products: { tbodyId: "productRows", countId: "productsSelectedCount", selectAllId: "selectAllProducts", numberColumn: 1 },
    pricing: { tbodyId: "pricingRows", countId: "pricingSelectedCount", selectAllId: "selectAllPricing", numberColumn: 1 },
    grades: { tbodyId: "gradeRows", countId: "gradesSelectedCount", selectAllId: "selectAllGrades", numberColumn: 1 },
    recipients: { tbodyId: "enquiryRecipientRows", countId: "recipientsSelectedCount", selectAllId: "selectAllRecipients", numberColumn: 1 },
    segment_photo: { tbodyId: "segmentPhotoRows", countId: "segmentPhotosSelectedCount", selectAllId: "selectAllSegmentPhotos" },
    segment_icon: { tbodyId: "segmentIconRows", countId: "segmentIconsSelectedCount", selectAllId: "selectAllSegmentIcons" },
    product_photo: { tbodyId: "productPhotoRows", countId: "productPhotosSelectedCount", selectAllId: "selectAllProductPhotos" }
};

function adminTableView(key) {
    return state.admin.tableViews[key] ||= { query: "", filters: {}, sortColumn: -1, sortDirection: "asc" };
}

function adminCellValue(cell) {
    if (!cell) return "";
    const field = cell.querySelector("input:not([type=file]), select, textarea");
    if (field?.type === "checkbox") return field.checked ? "yes" : "no";
    if (field?.tagName === "SELECT") return String(field.options[field.selectedIndex]?.text || "").trim();
    if (field) return String(field.value || "").trim();
    const image = cell.querySelector("img");
    return String(image?.alt || cell.textContent || "").trim();
}

function adminFilterUsesSelect(label) {
    return /(segment|category|product$|grade|active|source|unit|rate display|receive enquiries|show on|photograph|icon)/i.test(label);
}

function ensureAdminTableTools(key) {
    const config = ADMIN_TABLE_CONFIG[key];
    const tbody = document.getElementById(config?.tbodyId || "");
    const table = tbody?.closest("table");
    const titleRow = table?.tHead?.rows?.[0];
    if (!config || !tbody || !table || !titleRow) return;
    const view = adminTableView(key);
    let toolbar = table.parentElement?.previousElementSibling;
    if (!toolbar?.classList.contains("admin-table-search")) {
        toolbar = document.createElement("div");
        toolbar.className = "admin-table-search";
        toolbar.dataset.tableKey = key;
        toolbar.innerHTML = `<input type="search" class="admin-table-query" placeholder="Search this module..." aria-label="Search this module"><button type="button" class="btn btn-gold admin-table-search-btn" title="Apply search and filters">&#128269; <span>Search</span></button><button type="button" class="btn btn-outline admin-table-clear-btn" title="Clear search, filters and sorting">&times; <span>Clear</span></button><small class="admin-table-result-count" aria-live="polite"></small>`;
        table.parentElement?.before(toolbar);
        const query = toolbar.querySelector(".admin-table-query");
        query.value = view.query;
        const apply = () => {
            view.query = query.value.trim();
            view.filters = {};
            table.tHead.querySelectorAll("[data-admin-column-filter]").forEach((control) => {
                if (control.value.trim()) view.filters[control.dataset.column] = control.value.trim();
            });
            applyAdminTableView(key);
        };
        table._applyAdminFilters = apply;
        let liveSearchTimer = null;
        query.oninput = () => {
            clearTimeout(liveSearchTimer);
            liveSearchTimer = setTimeout(apply, 180);
        };
        toolbar.querySelector(".admin-table-search-btn").onclick = apply;
        query.onkeydown = (event) => { if (event.key === "Enter") { event.preventDefault(); apply(); } };
        toolbar.querySelector(".admin-table-clear-btn").onclick = () => {
            view.query = ""; view.filters = {}; view.sortColumn = -1; query.value = "";
            table.tHead.querySelectorAll("[data-admin-column-filter]").forEach((control) => { control.value = ""; });
            applyAdminTableView(key);
        };
    }
    if (!table.tHead.querySelector(".admin-column-filter-row")) {
        const filterRow = document.createElement("tr");
        filterRow.className = "admin-column-filter-row";
        Array.from(titleRow.cells).forEach((heading, column) => {
            const cell = document.createElement("th");
            const label = heading.textContent.trim();
            if ((column === 0 && heading.querySelector("[type=checkbox]")) || column === config.numberColumn || /^(preview|action|upload)/i.test(label)) cell.className = "admin-filter-empty";
            else if (adminFilterUsesSelect(label)) cell.innerHTML = `<select data-admin-column-filter data-column="${column}" aria-label="Filter ${escapeHtml(label)}"><option value="">All</option></select>`;
            else cell.innerHTML = `<input type="search" data-admin-column-filter data-column="${column}" placeholder="Filter" aria-label="Filter ${escapeHtml(label)}">`;
            filterRow.appendChild(cell);
        });
        table.tHead.appendChild(filterRow);
        filterRow.querySelectorAll("input,select").forEach((control) => {
            control.value = view.filters[control.dataset.column] || "";
            control.onclick = (event) => event.stopPropagation();
            if (control.tagName === "SELECT") {
                control.onchange = () => table._applyAdminFilters?.();
            } else {
                let filterTimer = null;
                control.oninput = () => {
                    clearTimeout(filterTimer);
                    filterTimer = setTimeout(() => table._applyAdminFilters?.(), 180);
                };
            }
            control.onkeydown = (event) => { if (event.key === "Enter") toolbar?.querySelector(".admin-table-search-btn")?.click(); };
        });
    }
    table.tHead.querySelectorAll("select[data-admin-column-filter]").forEach((control) => {
        const current = view.filters[control.dataset.column] || "";
        const column = Number(control.dataset.column);
        const values = [...new Set(Array.from(tbody.rows).map((row) => adminCellValue(row.cells[column])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
        control.innerHTML = `<option value="">All</option>${values.map((value) => `<option value="${escapeHtml(value.toLowerCase())}">${escapeHtml(value)}</option>`).join("")}`;
        control.value = current;
    });
    Array.from(titleRow.cells).forEach((heading, column) => {
        const label = heading.textContent.trim();
        if (heading.dataset.sortReady || (column === 0 && heading.querySelector("[type=checkbox]")) || /^(preview|action|upload)/i.test(label)) return;
        heading.dataset.sortReady = "true";
        heading.classList.add("admin-sortable-header");
        heading.title = `${heading.title ? `${heading.title} - ` : ""}Click to sort`;
        heading.onclick = () => {
            if (view.sortColumn === column) view.sortDirection = view.sortDirection === "asc" ? "desc" : "asc";
            else { view.sortColumn = column; view.sortDirection = "asc"; }
            applyAdminTableView(key);
        };
    });
}

function applyAdminTableView(key) {
    ensureAdminTableTools(key);
    const config = ADMIN_TABLE_CONFIG[key];
    const tbody = document.getElementById(config?.tbodyId || "");
    const table = tbody?.closest("table");
    if (!tbody || !table) return;
    const view = adminTableView(key);
    const rows = Array.from(tbody.rows);
    const query = view.query.toLowerCase();
    rows.forEach((row) => {
        const values = Array.from(row.cells).map(adminCellValue);
        const matchesQuery = !query || values.join(" ").toLowerCase().includes(query);
        const matchesFilters = Object.entries(view.filters).every(([column, filter]) => values[Number(column)]?.toLowerCase().includes(filter.toLowerCase()));
        row.hidden = !(matchesQuery && matchesFilters);
    });
    if (view.sortColumn >= 0) {
        rows.sort((a, b) => {
            const left = adminCellValue(a.cells[view.sortColumn]); const right = adminCellValue(b.cells[view.sortColumn]);
            const leftNumber = Number(left); const rightNumber = Number(right);
            const compared = left !== "" && right !== "" && Number.isFinite(leftNumber) && Number.isFinite(rightNumber)
                ? leftNumber - rightNumber : left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
            return view.sortDirection === "desc" ? -compared : compared;
        }).forEach((row) => tbody.appendChild(row));
    }
    let visibleNumber = 0;
    Array.from(tbody.rows).forEach((row) => { if (!row.hidden && Number.isFinite(config.numberColumn)) row.cells[config.numberColumn].textContent = String(++visibleNumber); });
    const visible = rows.filter((row) => !row.hidden).length;
    const result = table.parentElement?.previousElementSibling?.querySelector(".admin-table-result-count");
    if (result) result.textContent = `${visible} of ${rows.length} records`;
    table.tHead.querySelectorAll(".admin-sortable-header").forEach((heading) => {
        const active = view.sortColumn === heading.cellIndex;
        heading.classList.toggle("active-sort", active);
        heading.dataset.sortDirection = active ? view.sortDirection : "";
        heading.setAttribute("aria-sort", active ? (view.sortDirection === "asc" ? "ascending" : "descending") : "none");
    });
    updateAdminTableSelectionSummary(key);
}

function updateAdminTableSelectionSummary(key) {
    const config = ADMIN_TABLE_CONFIG[key];
    if (!config?.countId || !config.selectAllId) return;
    const tbody = document.getElementById(config.tbodyId); const count = document.getElementById(config.countId); const selectAll = document.getElementById(config.selectAllId);
    if (!tbody) return;
    const visibleBoxes = Array.from(tbody.querySelectorAll("tr:not([hidden]) [data-row-select]"));
    const visibleSelected = visibleBoxes.filter((box) => box.checked).length;
    const totalSelected = state.admin.editingIndexes[key]?.size || 0;
    const hiddenSelected = Math.max(0, totalSelected - visibleSelected);
    if (count) { count.textContent = totalSelected ? `${totalSelected} selected${hiddenSelected ? ` (${hiddenSelected} hidden)` : ""}` : ""; count.hidden = totalSelected === 0; }
    if (selectAll) { selectAll.checked = visibleBoxes.length > 0 && visibleSelected === visibleBoxes.length; selectAll.indeterminate = visibleSelected > 0 && visibleSelected < visibleBoxes.length; }
}

function visibleRowIndexes(tbodyId) {
    return Array.from(document.querySelectorAll(`#${tbodyId} tr:not([hidden])`)).map((row) => Number(row.dataset.index)).filter(Number.isFinite);
}

function resetAdminTableView(key) {
    Object.assign(adminTableView(key), { query: "", filters: {}, sortColumn: -1, sortDirection: "asc" });
    const table = document.getElementById(ADMIN_TABLE_CONFIG[key]?.tbodyId || "")?.closest("table");
    const toolbar = table?.parentElement?.previousElementSibling;
    const query = toolbar?.querySelector(".admin-table-query"); if (query) query.value = "";
    table?.tHead?.querySelectorAll("[data-admin-column-filter]").forEach((control) => { control.value = ""; });
}

function adminSegmentOptions(selectedId = "") {
    return '<option value="">Select segment</option>' + state.admin.segments.map((segment) => `<option value="${segment.segment_id}" ${segment.segment_id === selectedId ? "selected" : ""}>${escapeHtml(segment.segment_name)}</option>`).join("");
}

function adminCategoryOptions(selectedId = "", segmentId = "") {
    const categories = segmentId ? state.admin.categories.filter((category) => category.segment_id === segmentId) : state.admin.categories;
    return '<option value="">Select category</option>' + categories.map((category) => `<option value="${category.category_id}" ${category.category_id === selectedId ? "selected" : ""}>${escapeHtml(category.category_name)}</option>`).join("");
}

function adminProductOptions(selectedId = "") {
    return '<option value="">Select product</option>' + state.admin.products.map((product) => `<option value="${product.product_id}" ${product.product_id === selectedId ? "selected" : ""}>${escapeHtml(product.product_name)}</option>`).join("");
}

function adminProductOptionsForCategory(selectedId = "", categoryId = "") {
    return '<option value="">Select product</option>' + state.admin.products
        .filter((product) => !categoryId || product.category_id === categoryId)
        .map((product) => `<option value="${product.product_id}" ${product.product_id === selectedId ? "selected" : ""}>${escapeHtml(product.product_name)}</option>`).join("");
}

function imageOptionsByType(imageType, selectedId = "") {
    const images = state.admin.images.filter((image) => image.image_type === imageType);
    return '<option value="">Select image</option>' + images.map((image) => `<option value="${image.image_id}" ${image.image_id === selectedId ? "selected" : ""}>${escapeHtml(image.image_name)}</option>`).join("");
}

function gradeOptions(productId, selectedGradeId = "") {
    const grades = state.admin.grades
        .filter((grade) => grade.active !== false && String(grade.product_id) === String(productId || ""))
        .sort((a, b) => Number(a.display_order || 0) - Number(b.display_order || 0)
            || a.grade_name.localeCompare(b.grade_name)
            || String(a.grade_id || "").localeCompare(String(b.grade_id || "")));
    return '<option value="">Select grade</option>' + grades.map((grade) => `<option value="${escapeHtml(grade.grade_id)}" ${grade.grade_id === selectedGradeId ? "selected" : ""}>${escapeHtml(grade.grade_name)}</option>`).join("");
}

function setRowReadOnly(row, readOnly) {
    row.querySelectorAll("input[data-field], select[data-field], textarea[data-field]").forEach((element) => {
        if (element.classList.contains("readonly-field")) {
            element.disabled = true;
            return;
        }
        element.disabled = readOnly;
    });
}

function toggleSelectAllRows(tbodyId, checked) {
    document.querySelectorAll(`#${tbodyId} [data-row-select]`).forEach((input) => {
        input.checked = checked;
    });
}

function selectedRowIndexes(tbodyId) {
    return Array.from(document.querySelectorAll(`#${tbodyId} [data-row-select]:checked`))
        .map((checkbox) => Number(checkbox.closest("tr")?.dataset.index))
        .filter((index) => Number.isFinite(index));
}


function wireSelectionCount(tbodyId, countId, selectAllId = "", moduleKey = "", sync = null, rerender = null) {
    const tbody = document.getElementById(tbodyId);
    const count = document.getElementById(countId);
    if (!tbody) return;

    const update = () => {
        const total = tbody.querySelectorAll("[data-row-select]").length;
        const selected = tbody.querySelectorAll("[data-row-select]:checked").length;
        if (count) {
            count.textContent = selected ? `${selected} selected` : "";
            count.hidden = selected === 0;
        }
        const selectAll = selectAllId ? document.getElementById(selectAllId) : null;
        if (selectAll) {
            selectAll.checked = total > 0 && selected === total;
            selectAll.indeterminate = selected > 0 && selected < total;
        }
    };

    tbody.querySelectorAll("[data-row-select]").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const row = checkbox.closest("tr");
            const index = Number(row?.dataset.index);
            if (moduleKey && Number.isFinite(index)) {
                const snapshots = state.admin.editSnapshots[moduleKey] ||= new Map();
                if (checkbox.checked) {
                    if (!snapshots.has(index)) snapshots.set(index, structuredClone(state.admin[moduleKey][index] || {}));
                    state.admin.editingIndexes[moduleKey].add(index);
                    row?.classList.add("row-editing");
                    if (row) setRowReadOnly(row, false);
                } else {
                    if (sync) sync();
                    if (snapshots.has(index)) {
                        const snapshot = snapshots.get(index);
                        if (snapshot === null) state.admin[moduleKey].splice(index, 1);
                        else state.admin[moduleKey][index] = snapshot;
                    }
                    snapshots.delete(index);
                    state.admin.editingIndexes[moduleKey].delete(index);
                    if (rerender) rerender();
                }
            }
            update();
        });
    });
    update();
}

async function setModuleSelection(moduleKey, checked, rerender, indexes = null) {
    if (!checked) {
        const snapshots = state.admin.editSnapshots[moduleKey] || new Map();
        const targets = indexes ? new Set(indexes) : null;
        const selectedSnapshots = [...snapshots.entries()].filter(([index]) => !targets || targets.has(index));
        if (selectedSnapshots.length && !confirm(`Discard changes in ${selectedSnapshots.length} selected row(s)?`)) {
            rerender();
            return;
        }
        selectedSnapshots.sort(([a], [b]) => b - a).forEach(([index, snapshot]) => {
            if (snapshot === null) state.admin[moduleKey].splice(index, 1);
            else state.admin[moduleKey][index] = snapshot;
            snapshots.delete(index);
            state.admin.editingIndexes[moduleKey].delete(index);
        });
        if (!indexes) { state.admin.editingIndexes[moduleKey] = new Set(); state.admin.editSnapshots[moduleKey] = new Map(); }
        rerender();
        return;
    }
    const snapshots = state.admin.editSnapshots[moduleKey] ||= new Map();
    state.admin[moduleKey].forEach((item, index) => {
        if (indexes && !indexes.includes(index)) return;
        if (!snapshots.has(index)) snapshots.set(index, structuredClone(item));
        state.admin.editingIndexes[moduleKey].add(index);
    });
    rerender();
}

async function deleteSelectedRows({ moduleKey, tbodyId, label, nameField, idField, save }) {
    const indexes = selectedRowIndexes(tbodyId);
    if (!indexes.length) {
        alert(`Select one or more ${label} rows first.`);
        return;
    }
    const list = state.admin[moduleKey];
    const names = indexes
        .map((index) => list[index]?.[nameField])
        .filter(Boolean);
    if (!confirm(`Delete ${indexes.length} selected ${label} record(s)?\n\n${names.join("\n")}`)) return;
    indexes.sort((a, b) => b - a).forEach((index) => {
        const item = list[index];
        if (item?.[idField]) state.admin.deleteQueues[moduleKey].push(item[idField]);
        list.splice(index, 1);
    });
    state.admin.editingIndexes[moduleKey] = new Set();
    renderAllAdminViews();
    if (!state.admin.deleteQueues[moduleKey].length) {
        alert(`Removed ${indexes.length} unsaved ${label} row(s).`);
        return;
    }
    try {
        await save();
    } catch (error) {
        await refreshAdminData();
        renderAllAdminViews();
        throw error;
    }
}

function renderSegmentRows() {
    const tbody = document.getElementById("segmentRows");
    if (!tbody) return;
    tbody.innerHTML = state.admin.segments.map((segment, index) => `<tr data-index="${index}" data-id="${segment.segment_id}" class="${state.admin.editingIndexes.segments.has(index) ? "row-editing" : ""}"><td><input type="checkbox" data-row-select ${state.admin.editingIndexes.segments.has(index) ? "checked" : ""}></td><td>${index + 1}</td><td><input data-field="segment_name" value="${escapeHtml(segment.segment_name)}" placeholder="Segment Name"></td><td><textarea data-field="description" placeholder="Description">${escapeHtml(segment.description || "")}</textarea></td><td><select data-field="segment_photo_image_id">${imageOptionsByType("segment_photo", segment.segment_photo_image_id)}</select></td><td><select data-field="segment_icon_image_id">${imageOptionsByType("segment_icon", segment.segment_icon_image_id)}</select></td><td><input type="number" min="1" data-field="display_order" value="${segment.display_order || index + 1}"></td><td><input type="checkbox" data-field="active" ${segment.active !== false ? "checked" : ""}></td></tr>`).join("");
    tbody.querySelectorAll("tr").forEach((row) => {
        setRowReadOnly(row, !state.admin.editingIndexes.segments.has(Number(row.dataset.index)));
    });
    wireSelectionCount("segmentRows", "segmentsSelectedCount", "selectAllSegments", "segments", syncSegmentsFromInputs, renderSegmentRows);
    applyAdminTableView("segments");
}

function renderCategoryRows() {
    const tbody = document.getElementById("categoryRows");
    if (!tbody) return;
    tbody.innerHTML = state.admin.categories.map((category, index) => `<tr data-index="${index}" data-id="${category.category_id}" class="${state.admin.editingIndexes.categories.has(index) ? "row-editing" : ""}"><td><input type="checkbox" data-row-select ${state.admin.editingIndexes.categories.has(index) ? "checked" : ""}></td><td>${index + 1}</td><td><select data-field="segment_id">${adminSegmentOptions(category.segment_id)}</select></td><td><input data-field="category_name" value="${escapeHtml(category.category_name)}" placeholder="Category Name"></td><td><input type="checkbox" data-field="active" ${category.active !== false ? "checked" : ""}></td></tr>`).join("");
    tbody.querySelectorAll("tr").forEach((row) => {
        setRowReadOnly(row, !state.admin.editingIndexes.categories.has(Number(row.dataset.index)));
    });
    wireSelectionCount("categoryRows", "categoriesSelectedCount", "selectAllCategories", "categories", syncCategoriesFromInputs, renderCategoryRows);
    applyAdminTableView("categories");
}

function renderProductRows() {
    const tbody = document.getElementById("productRows");
    if (!tbody) return;

    tbody.innerHTML = state.admin.products.map((product, index) => {
        const isEditing = state.admin.editingIndexes.products.has(index);
        return `<tr data-index="${index}" data-id="${product.product_id}" class="${isEditing ? "row-editing" : ""}">
            <td class="select-cell"><input type="checkbox" data-row-select ${isEditing ? "checked" : ""} aria-label="Select ${escapeHtml(product.product_name || "product")}"></td>
            <td>${index + 1}</td>
            <td><select data-field="segment_id">${adminSegmentOptions(product.segment_id)}</select></td>
            <td><select data-field="category_id">${adminCategoryOptions(product.category_id, product.segment_id)}</select></td>
            <td><input data-field="product_name" value="${escapeHtml(product.product_name)}" placeholder="Product Name"></td>
            <td><textarea data-field="description" placeholder="Description">${escapeHtml(product.description || "")}</textarea></td>
            <td><select data-field="product_photo_image_id">${imageOptionsByType("product_photo", product.product_photo_image_id)}</select></td>
            <td><input type="checkbox" data-field="active" ${product.active !== false ? "checked" : ""}></td>
            <td><input type="checkbox" data-field="show_on_prices_enquiry" ${product.show_on_prices_enquiry === true ? "checked" : ""}></td>
            <td><input type="number" min="1" data-field="prices_enquiry_display_order" value="${escapeHtml(product.prices_enquiry_display_order || "")}"></td>
            <td><input type="checkbox" data-field="show_on_home" ${product.show_on_home === true ? "checked" : ""}></td>
            <td><input type="number" min="1" max="8" data-field="home_display_order" value="${escapeHtml(product.home_display_order || "")}"></td>
        </tr>`;
    }).join("");

    tbody.querySelectorAll("tr").forEach((row) => {
        const index = Number(row.dataset.index);
        const isEditing = state.admin.editingIndexes.products.has(index);
        setRowReadOnly(row, !isEditing);

        const homeToggle = row.querySelector('[data-field="show_on_home"]');
        const homeOrder = row.querySelector('[data-field="home_display_order"]');
        const pricesToggle = row.querySelector('[data-field="show_on_prices_enquiry"]');
        const pricesOrder = row.querySelector('[data-field="prices_enquiry_display_order"]');

        if (!isEditing) {
            if (homeOrder) homeOrder.disabled = true;
            if (pricesOrder) pricesOrder.disabled = true;
        } else {
            if (homeOrder) homeOrder.disabled = !homeToggle?.checked;
            if (pricesOrder) pricesOrder.disabled = !pricesToggle?.checked;
        }

        if (homeToggle) {
            homeToggle.onchange = () => {
                if (!homeOrder) return;
                homeOrder.disabled = !homeToggle.checked;
                if (!homeToggle.checked) homeOrder.value = "";
                if (homeToggle.checked && pricesToggle && !pricesToggle.checked) {
                    pricesToggle.checked = true;
                    if (pricesOrder) {
                        pricesOrder.disabled = false;
                        if (!pricesOrder.value) pricesOrder.value = String(index + 1);
                    }
                }
            };
        }

        if (pricesToggle) {
            pricesToggle.onchange = () => {
                if (!pricesOrder) return;
                if (!pricesToggle.checked && homeToggle?.checked) {
                    alert("A Product shown below Home Search must also be shown on Prices & Enquiry.");
                    pricesToggle.checked = true;
                    return;
                }
                pricesOrder.disabled = !pricesToggle.checked;
                if (!pricesToggle.checked) pricesOrder.value = "";
            };
        }
    });

    tbody.querySelectorAll('[data-field="segment_id"]').forEach((select) => {
        select.onchange = () => {
            const row = select.closest("tr");
            const index = Number(row?.dataset.index);
            if (!Number.isFinite(index)) return;
            const product = state.admin.products[index];
            if (!product) return;
            product.segment_id = select.value;
            product.category_id = "";
            const categorySelect = row.querySelector('[data-field="category_id"]');
            if (categorySelect) categorySelect.innerHTML = adminCategoryOptions("", select.value);
        };
    });

    wireSelectionCount("productRows", "productsSelectedCount", "selectAllProducts", "products", syncProductsStateFromInputs, renderProductRows);
    applyAdminTableView("products");
}
function renderPricingRows() {
    const tbody = document.getElementById("pricingRows");
    if (!tbody) return;
    tbody.innerHTML = state.admin.pricing.map((pricing, index) => `<tr data-index="${index}" data-id="${pricing.pricing_id}" class="${state.admin.editingIndexes.pricing.has(index) ? "row-editing" : ""}"><td><input type="checkbox" data-row-select ${state.admin.editingIndexes.pricing.has(index) ? "checked" : ""}></td><td>${index + 1}</td><td><select data-field="product_id">${adminProductOptions(pricing.product_id)}</select></td><td><select data-field="grade_id">${gradeOptions(pricing.product_id, pricing.grade_id)}</select></td><td><input data-field="specification" value="${escapeHtml(pricing.specification || "")}" placeholder="Specification"></td><td><input data-field="size_thickness" value="${escapeHtml(pricing.size_thickness || "")}" placeholder="Size / Thickness"></td><td><select data-field="unit"><option value="">Select unit</option>${UNIT_OPTIONS.map((unit) => `<option value="${unit}" ${pricing.unit === unit ? "selected" : ""}>${unit}</option>`).join("")}</select></td><td><input type="number" min="0" step="0.01" data-field="rate" value="${pricing.rate === "" ? "" : pricing.rate}"></td><td><select data-field="rate_display">${RATE_DISPLAY_OPTIONS.map((value) => `<option value="${value}" ${pricing.rate_display === value ? "selected" : ""}>${value}</option>`).join("")}</select></td><td><input type="number" min="1" data-field="price_validity_days" value="${escapeHtml(pricing.price_validity_days || "")}"></td><td><input class="readonly-field" readonly data-field="rate_updated_on" value="${escapeHtml(dateOnly(pricing.rate_updated_on))}"></td><td><input class="readonly-field" readonly value="${escapeHtml(priceValidTill(pricing))}"></td><td><input data-field="remarks" value="${escapeHtml(pricing.remarks || "")}" placeholder="Remarks"></td><td><input type="number" min="1" data-field="display_order" value="${pricing.display_order || index + 1}"></td><td><input type="checkbox" data-field="active" ${pricing.active !== false ? "checked" : ""}></td></tr>`).join("");
    tbody.querySelectorAll("tr").forEach((row) => {
        setRowReadOnly(row, !state.admin.editingIndexes.pricing.has(Number(row.dataset.index)));
    });
    tbody.querySelectorAll('[data-field="product_id"]').forEach((select) => {
        select.onchange = () => {
            const row = select.closest("tr");
            const index = Number(row?.dataset.index);
            const pricing = state.admin.pricing[index];
            if (!pricing) return;
            pricing.product_id = select.value;
            const validGrade = state.admin.grades.some((grade) => grade.grade_id === pricing.grade_id && grade.product_id === select.value && grade.active !== false);
            if (!validGrade) pricing.grade_id = "";
            const gradeSelect = row.querySelector('[data-field="grade_id"]');
            if (gradeSelect) gradeSelect.innerHTML = gradeOptions(select.value, pricing.grade_id);
        };
    });
    wireSelectionCount("pricingRows", "pricingSelectedCount", "selectAllPricing", "pricing", syncPricingFromInputs, renderPricingRows);
    applyAdminTableView("pricing");
}

function renderGradeRows() {
    const tbody = document.getElementById("gradeRows");
    if (!tbody) return;
    tbody.innerHTML = state.admin.grades.map((grade, index) => `<tr data-index="${index}" data-id="${grade.grade_id}" class="${state.admin.editingIndexes.grades.has(index) ? "row-editing" : ""}"><td><input type="checkbox" data-row-select ${state.admin.editingIndexes.grades.has(index) ? "checked" : ""}></td><td>${index + 1}</td><td><select data-field="segment_id">${adminSegmentOptions(grade.segment_id)}</select></td><td><select data-field="category_id">${adminCategoryOptions(grade.category_id, grade.segment_id)}</select></td><td><select data-field="product_id">${adminProductOptionsForCategory(grade.product_id, grade.category_id)}</select></td><td><input data-field="grade_name" value="${escapeHtml(grade.grade_name)}" placeholder="Grade Name"></td><td><input type="number" min="1" data-field="display_order" value="${grade.display_order || index + 1}"></td><td><input type="checkbox" data-field="active" ${grade.active !== false ? "checked" : ""}></td></tr>`).join("");
    tbody.querySelectorAll("tr").forEach((row) => {
        setRowReadOnly(row, !state.admin.editingIndexes.grades.has(Number(row.dataset.index)));
        const segment = row.querySelector('[data-field="segment_id"]');
        const category = row.querySelector('[data-field="category_id"]');
        const product = row.querySelector('[data-field="product_id"]');
        segment.onchange = () => { category.innerHTML = adminCategoryOptions("", segment.value); product.innerHTML = adminProductOptionsForCategory("", ""); };
        category.onchange = () => { product.innerHTML = adminProductOptionsForCategory("", category.value); };
    });
    wireSelectionCount("gradeRows", "gradesSelectedCount", "selectAllGrades", "grades", syncGradesFromInputs, renderGradeRows);
    applyAdminTableView("grades");
}


function imageRowsByType(imageType) {
    return state.admin.images.filter((image) => image.image_type === imageType);
}

function selectedImageRows(imageType) {
    const config = IMAGE_TYPE_CONFIG.find((item) => item.key === imageType);
    const tbody = document.getElementById(config?.tbodyId || "");
    if (!tbody) return [];
    const rows = imageRowsByType(imageType);
    return Array.from(tbody.querySelectorAll("[data-row-select]:checked"))
        .map((checkbox) => rows[Number(checkbox.closest("tr")?.dataset.index)])
        .filter(Boolean);
}

async function bulkDeleteImages(imageType) {
    const selected = selectedImageRows(imageType);
    if (!selected.length) {
        alert("Select one or more images first.");
        return;
    }
    const names = selected.map((image) => image.image_name).join("\n");
    if (!confirm(`Delete ${selected.length} selected image(s)? Referenced images will be blocked.\n\n${names}`)) return;

    const failures = [];
    for (const image of selected) {
        try {
            await BCSPLDataLayer.deleteImageLibraryItem(image.image_id);
        } catch (error) {
            failures.push(`${image.image_name}: ${error?.message || "in use"}`);
        }
    }

    await refreshAdminData();
    renderImageLibraryRows(imageType);
    if (failures.length) alert(`Some images could not be deleted:\n${failures.join("\n")}`);
}

function renderImageLibraryRows(imageType) {
    const config = IMAGE_TYPE_CONFIG.find((item) => item.key === imageType);
    const tbody = document.getElementById(config?.tbodyId || "");
    if (!tbody) return;
    const rows = state.admin.images.filter((image) => image.image_type === imageType);
    tbody.innerHTML = rows.map((image, index) => {
        const imageUrl = resolveImageUrl(image.image_id, state.admin.images);
        const isEditing = state.admin.editingIndexes[imageType].has(index);
        return `<tr data-index="${index}" data-image-type="${imageType}" data-id="${image.image_id}" class="${isEditing ? "row-editing" : ""}"><td><input type="checkbox" data-row-select ${isEditing ? "checked" : ""}></td><td>${imageUrl ? `<img class="admin-image-preview" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(image.image_name)}" loading="lazy">` : '<span class="admin-image-empty">No preview</span>'}</td><td><input data-field="image_name" value="${escapeHtml(image.image_name)}" placeholder="Image Name"></td><td><span class="admin-image-source">${escapeHtml(image.source_type)}</span></td><td><input data-field="file_path" value="${escapeHtml(image.file_path)}" ${image.source_type === "storage" ? "readonly class=\"readonly-field\"" : ""}></td><td><select data-field="active"><option value="true" ${image.active !== false ? "selected" : ""}>Yes</option><option value="false" ${image.active === false ? "selected" : ""}>No</option></select></td><td><input type="file" data-field="file" accept="image/*"></td></tr>`;
    }).join("");
    tbody.querySelectorAll("tr").forEach((row) => setRowReadOnly(row, !state.admin.editingIndexes[imageType].has(Number(row.dataset.index))));
    const countMap = {
        segment_photo: ["segmentPhotosSelectedCount", "selectAllSegmentPhotos"],
        segment_icon: ["segmentIconsSelectedCount", "selectAllSegmentIcons"],
        product_photo: ["productPhotosSelectedCount", "selectAllProductPhotos"]
    };
    const [countId, selectAllId] = countMap[imageType] || [];
    if (countId) wireImageSelection(imageType, tbody.id, countId, selectAllId);
    applyAdminTableView(imageType);
}

function wireImageSelection(imageType, tbodyId, countId, selectAllId) {
    const tbody = document.getElementById(tbodyId);
    const count = document.getElementById(countId);
    if (!tbody) return;
    const update = () => {
        const total = tbody.querySelectorAll("[data-row-select]").length;
        const selected = tbody.querySelectorAll("[data-row-select]:checked").length;
        if (count) {
            count.textContent = selected ? `${selected} selected` : "";
            count.hidden = selected === 0;
        }
        const selectAll = document.getElementById(selectAllId);
        if (selectAll) {
            selectAll.checked = total > 0 && selected === total;
            selectAll.indeterminate = selected > 0 && selected < total;
        }
    };
    tbody.querySelectorAll("[data-row-select]").forEach((checkbox) => {
        checkbox.onchange = () => {
            const row = checkbox.closest("tr");
            const index = Number(row?.dataset.index);
            if (checkbox.checked) {
                state.admin.editingIndexes[imageType].add(index);
                row?.classList.add("row-editing");
                if (row) setRowReadOnly(row, false);
            } else {
                state.admin.editingIndexes[imageType].delete(index);
                const image = imageRowsByType(imageType)[index];
                if (image && !image.image_id) {
                    const globalIndex = state.admin.images.indexOf(image);
                    if (globalIndex >= 0) state.admin.images.splice(globalIndex, 1);
                }
                renderImageLibraryRows(imageType);
            }
            update();
        };
    });
    update();
}

async function setImageSelection(imageType, checked, indexes = null) {
    if (!checked) {
        if (indexes) indexes.forEach((index) => state.admin.editingIndexes[imageType].delete(index));
        else state.admin.editingIndexes[imageType] = new Set();
        const rows = imageRowsByType(imageType);
        state.admin.images = state.admin.images.filter((image) => image.image_id || image.image_type !== imageType || (indexes && !indexes.includes(rows.indexOf(image))));
        renderImageLibraryRows(imageType);
        return;
    }
    const selected = indexes || imageRowsByType(imageType).map((_, index) => index);
    state.admin.editingIndexes[imageType] = new Set([...state.admin.editingIndexes[imageType], ...selected]);
    renderImageLibraryRows(imageType);
}

function renderEnquiryRecipientRows() {
    const tbody = document.getElementById("enquiryRecipientRows");
    if (!tbody) return;
    tbody.innerHTML = state.admin.recipients.map((item, index) => `<tr data-index="${index}" data-id="${item.id}" class="${state.admin.editingIndexes.recipients.has(index) ? "row-editing" : ""}"><td><input type="checkbox" data-row-select ${state.admin.editingIndexes.recipients.has(index) ? "checked" : ""}></td><td>${index + 1}</td><td><input data-field="display_name" value="${escapeHtml(item.display_name)}" placeholder="Sales"></td><td><input type="email" data-field="email" value="${escapeHtml(item.email)}" placeholder="sales@example.com"></td><td><input type="number" min="1" data-field="display_order" value="${item.display_order}"></td><td><input type="checkbox" data-field="active" ${item.active !== false ? "checked" : ""}></td></tr>`).join("");
    tbody.querySelectorAll("tr").forEach((row) => {
        setRowReadOnly(row, !state.admin.editingIndexes.recipients.has(Number(row.dataset.index)));
    });
    wireSelectionCount("enquiryRecipientRows", "recipientsSelectedCount", "selectAllRecipients", "recipients", syncRecipientInputs, renderEnquiryRecipientRows);
    applyAdminTableView("recipients");
}

function selectedProductsText(enquiry) {
    const rows = enquiry.selected_products || [];
    if (!rows.length) return "-";
    return rows.map((row) => row.product_name_snapshot || row.category_name_snapshot || row.product_id || "Product").join(", ");
}

function enquirySearchText(enquiry) {
    const productText = (enquiry.selected_products || []).map((row) => [
        row.segment_name_snapshot, row.category_name_snapshot, row.product_name_snapshot,
        row.grade_snapshot, row.specification_snapshot, row.size_thickness_snapshot,
        row.quantity, row.unit
    ].filter((value) => value !== "" && value != null).join(" ")).join(" ");
    return [
        enquiry.enquiry_reference, enquiry.customer_name, enquiry.company_name,
        enquiry.mobile, enquiry.email, enquiry.source_page, productText
    ].filter(Boolean).join(" ").toLowerCase();
}

function filteredAdminEnquiries() {
    const query = String(document.getElementById("enquirySearchInput")?.value || "").trim().toLowerCase();
    const compactQuery = query.replace(/[\s+()-]/g, "");
    const dateFrom = document.getElementById("enquiryDateFrom")?.value || "";
    const dateTo = document.getElementById("enquiryDateTo")?.value || "";
    const status = document.getElementById("enquiryStatusFilter")?.value || "";
    const emailStatus = document.getElementById("enquiryEmailFilter")?.value || "";

    return state.admin.enquiries.filter((enquiry) => {
        const receivedDate = dateOnly(enquiry.created_at);
        const text = enquirySearchText(enquiry);
        const compactText = text.replace(/[\s+()-]/g, "");
        if (query && !text.includes(query) && (!compactQuery || !compactText.includes(compactQuery))) return false;
        if (dateFrom && (!receivedDate || receivedDate < dateFrom)) return false;
        if (dateTo && (!receivedDate || receivedDate > dateTo)) return false;
        if (status && String(enquiry.status || "new").toLowerCase() !== status) return false;
        if (emailStatus && String(enquiry.email_notification_status || "pending").toLowerCase() !== emailStatus) return false;
        return true;
    });
}

function enquiryDetailItem(label, value) {
    const text = value === "" || value == null ? "-" : value;
    return `<div class="enquiry-detail-item"><span>${escapeHtml(label)}</span><b>${escapeHtml(text)}</b></div>`;
}

function closeEnquiryDetails() {
    const dialog = document.getElementById("enquiryDetailsDialog");
    if (dialog) dialog.hidden = true;
}

function openEnquiryDetails(enquiry) {
    const dialog = document.getElementById("enquiryDetailsDialog");
    const content = document.getElementById("enquiryDetailsContent");
    const reference = document.getElementById("enquiryDetailsReference");
    if (!dialog || !content || !enquiry) return;

    if (reference) reference.textContent = enquiry.enquiry_reference || enquiry.id || "";
    const products = enquiry.selected_products || [];
    const productRows = products.map((row) => `<tr><td>${escapeHtml(row.segment_name_snapshot || "-")}</td><td>${escapeHtml(row.category_name_snapshot || "-")}</td><td>${escapeHtml(row.product_name_snapshot || "-")}</td><td>${escapeHtml(row.grade_snapshot || "-")}</td><td>${escapeHtml(row.specification_snapshot || "-")}</td><td>${escapeHtml(row.size_thickness_snapshot || "-")}</td><td>${escapeHtml(row.quantity ?? "-")}</td><td>${escapeHtml(row.unit || "-")}</td></tr>`).join("");

    content.innerHTML = `
        <section class="enquiry-detail-section"><h4>Customer Details</h4><div class="enquiry-detail-grid">
            ${enquiryDetailItem("Name", enquiry.customer_name)}${enquiryDetailItem("Company", enquiry.company_name)}${enquiryDetailItem("Mobile", enquiry.mobile)}${enquiryDetailItem("Email", enquiry.email)}
        </div></section>
        <section class="enquiry-detail-section"><h4>Enquiry Information</h4><div class="enquiry-detail-grid">
            ${enquiryDetailItem("Received On", enquiry.created_at ? new Date(enquiry.created_at).toLocaleString() : "-")}${enquiryDetailItem("Status", enquiry.status || "new")}${enquiryDetailItem("Source Page", enquiry.source_page)}${enquiryDetailItem("Message", enquiry.message || enquiry.customer_message)}
        </div></section>
        <section class="enquiry-detail-section"><h4>Selected Products</h4><div class="enquiry-products-wrap"><table class="enquiry-products-detail"><thead><tr><th>Segment</th><th>Category</th><th>Product</th><th>Grade</th><th>Specification</th><th>Size</th><th>Quantity</th><th>Unit</th></tr></thead><tbody>${productRows || '<tr><td colspan="8">No product lines selected.</td></tr>'}</tbody></table></div></section>
        <section class="enquiry-detail-section"><h4>Notification Information</h4><div class="enquiry-detail-grid">
            ${enquiryDetailItem("Email Status", enquiry.email_notification_status)}${enquiryDetailItem("Email Sent On", enquiry.email_notification_sent_at)}${enquiryDetailItem("Failure Reason", enquiry.email_notification_error || enquiry.email_notification_failure_reason)}
        </div></section>`;
    dialog.hidden = false;
    document.getElementById("closeEnquiryDetailsX")?.focus();
}

function renderEnquiryRows() {
    const tbody = document.getElementById("enquiryRows");
    if (!tbody) return;
    const enquiries = filteredAdminEnquiries();
    const count = document.getElementById("enquiryResultCount");
    if (count) count.textContent = `${enquiries.length} of ${state.admin.enquiries.length} enquiries`;
    tbody.innerHTML = enquiries.map((enquiry, index) => {
        const status = enquiry.status || "new";
        return `<tr data-id="${enquiry.id}"><td>${index + 1}</td><td>${escapeHtml(dateOnly(enquiry.created_at) || "-")}</td><td>${escapeHtml(enquiry.customer_name || "-")}</td><td>${escapeHtml(enquiry.company_name || "-")}</td><td>${escapeHtml(enquiry.mobile || "-")}</td><td>${escapeHtml(enquiry.email || "-")}</td><td>${escapeHtml(selectedProductsText(enquiry))}</td><td><select data-field="status"><option value="new" ${status === "new" ? "selected" : ""}>new</option><option value="contacted" ${status === "contacted" ? "selected" : ""}>contacted</option><option value="closed" ${status === "closed" ? "selected" : ""}>closed</option></select></td><td><button class="btn btn-outline" data-action="view-enquiry">View</button> <button class="btn btn-outline" data-action="save-status">Save</button></td></tr>`;
    }).join("") || '<tr><td colspan="9" class="enquiry-no-results">No enquiries match your filters.</td></tr>';

    tbody.querySelectorAll('[data-action="view-enquiry"]').forEach((button) => {
        button.onclick = () => {
            const id = button.closest("tr")?.dataset.id;
            const enquiry = state.admin.enquiries.find((item) => item.id === id);
            openEnquiryDetails(enquiry);
        };
    });
    tbody.querySelectorAll('[data-action="save-status"]').forEach((button) => {
        button.onclick = async () => {
            const row = button.closest("tr");
            const id = row?.dataset.id;
            const status = row?.querySelector('[data-field="status"]')?.value || "new";
            await BCSPLDataLayer.updateEnquiryStatus(id, status);
            await loadAdminEnquiries();
            renderEnquiryRows();
            renderDashboard();
        };
    });
}

function getDashboardMetrics() {
    const today = new Date().toISOString().slice(0, 10);
    const threshold = addDays(today, 3);
    const liveRows = state.admin.pricing.filter((row) => row.active !== false && row.rate_display === "show_price" && priceValidTill(row) && priceValidTill(row) >= today);
    return {
        activeSegments: state.admin.segments.filter((row) => row.active !== false).length,
        activeCategories: state.admin.categories.filter((row) => row.active !== false).length,
        activeProducts: state.admin.products.filter((row) => row.active !== false).length,
        activePricingRows: state.admin.pricing.filter((row) => row.active !== false).length,
        livePrices: liveRows.length,
        expiringPrices: liveRows.filter((row) => priceValidTill(row) <= threshold).length,
        expiredPrices: state.admin.pricing.filter((row) => row.active !== false && row.rate_display === "show_price" && priceValidTill(row) && priceValidTill(row) < today).length,
        newEnquiries: state.admin.enquiries.filter((row) => (row.status || "new") === "new").length,
        failedNotifications: state.admin.enquiries.filter((row) => row.email_notification_status === "failed").length
    };
}

function renderDashboard() {
    const wrap = document.getElementById("dashboardCards");
    if (!wrap) return;
    const metrics = getDashboardMetrics();
    const cards = [
        ["Active Product Segments", metrics.activeSegments],
        ["Active Product Categories", metrics.activeCategories],
        ["Active Products", metrics.activeProducts],
        ["Active Pricing Rows", metrics.activePricingRows],
        ["Live Prices", metrics.livePrices],
        ["Expiring Within 3 Days", metrics.expiringPrices],
        ["Expired Prices", metrics.expiredPrices],
        ["New Enquiries", metrics.newEnquiries],
        ["Failed Email Notifications", metrics.failedNotifications]
    ];
    wrap.innerHTML = cards.map(([label, value]) => `<article class="dashboard-card"><small>${escapeHtml(label)}</small><b>${value}</b></article>`).join("");
}

function syncSegmentsFromInputs() {
    Array.from(document.querySelectorAll("#segmentRows tr")).forEach((row) => {
        const index = Number(row.dataset.index);
        if (!Number.isFinite(index) || !state.admin.segments[index]) return;
        state.admin.segments[index] = { ...state.admin.segments[index],
        segment_id: row.dataset.id || "",
        segment_name: row.querySelector('[data-field="segment_name"]')?.value?.trim() || "",
        description: row.querySelector('[data-field="description"]')?.value?.trim() || "",
        segment_photo_image_id: row.querySelector('[data-field="segment_photo_image_id"]')?.value || "",
        segment_icon_image_id: row.querySelector('[data-field="segment_icon_image_id"]')?.value || "",
        display_order: row.querySelector('[data-field="display_order"]')?.value ?? "",
        active: row.querySelector('[data-field="active"]')?.checked !== false };
    });
}

function syncCategoriesFromInputs() {
    Array.from(document.querySelectorAll("#categoryRows tr")).forEach((row) => {
        const index = Number(row.dataset.index);
        if (!Number.isFinite(index) || !state.admin.categories[index]) return;
        state.admin.categories[index] = { ...state.admin.categories[index],
        category_id: row.dataset.id || "",
        segment_id: row.querySelector('[data-field="segment_id"]')?.value || "",
        category_name: row.querySelector('[data-field="category_name"]')?.value?.trim() || "",
        active: row.querySelector('[data-field="active"]')?.checked !== false };
    });
}

function syncProductsStateFromInputs() {
    Array.from(document.querySelectorAll("#productRows tr")).forEach((row) => {
        const index = Number(row.dataset.index);
        if (!Number.isFinite(index) || !state.admin.products[index]) return;
        state.admin.products[index] = { ...state.admin.products[index],
        product_id: row.dataset.id || "",
        segment_id: row.querySelector('[data-field="segment_id"]')?.value || "",
        category_id: row.querySelector('[data-field="category_id"]')?.value || "",
        product_name: row.querySelector('[data-field="product_name"]')?.value?.trim() || "",
        description: row.querySelector('[data-field="description"]')?.value?.trim() || "",
        product_photo_image_id: row.querySelector('[data-field="product_photo_image_id"]')?.value || "",
        show_on_home: row.querySelector('[data-field="show_on_home"]')?.checked === true,
        home_display_order: row.querySelector('[data-field="home_display_order"]')?.value || "",
        show_on_prices_enquiry: row.querySelector('[data-field="show_on_prices_enquiry"]')?.checked === true,
        prices_enquiry_display_order: row.querySelector('[data-field="prices_enquiry_display_order"]')?.value || "",
        active: row.querySelector('[data-field="active"]')?.checked !== false };
    });
}

function reportAdminFieldError(input, message) {
    if (!input) {
        alert(message);
        return false;
    }
    input.setCustomValidity(message);
    const clear = () => input.setCustomValidity("");
    input.addEventListener("input", clear, { once: true });
    input.addEventListener("change", clear, { once: true });
    input.focus();
    input.reportValidity();
    return false;
}

function validateSelectedSegmentRows(selectedIndexes) {
    for (const index of selectedIndexes) {
        const row = document.querySelector(`#segmentRows tr[data-index="${index}"]`);
        const segment = state.admin.segments[index];
        if (!row || !segment) continue;

        const nameInput = row.querySelector('[data-field="segment_name"]');
        nameInput?.setCustomValidity("");
        if (!segment.segment_name) return reportAdminFieldError(nameInput, "Segment Name is required.");

        const duplicate = state.admin.segments.some((item, otherIndex) => otherIndex !== index
            && String(item.segment_name || "").trim().toLowerCase() === segment.segment_name.toLowerCase());
        if (duplicate) return reportAdminFieldError(nameInput, "Segment with the same name already exists.");

        const orderInput = row.querySelector('[data-field="display_order"]');
        orderInput?.setCustomValidity("");
        const order = Number(segment.display_order);
        if (!String(segment.display_order).trim() || !Number.isInteger(order) || order < 1) {
            return reportAdminFieldError(orderInput, "Display Order is required and must be a positive whole number.");
        }
    }
    return true;
}

function validateSelectedProductRows(selectedIndexes) {
    for (const index of selectedIndexes) {
        const row = document.querySelector(`#productRows tr[data-index="${index}"]`);
        const product = state.admin.products[index];
        if (!row || !product) continue;

        const validations = [
            {
                enabled: product.show_on_prices_enquiry,
                field: "prices_enquiry_display_order",
                message: "Prices & Enquiry Display Order is required and must be a positive whole number."
            },
            {
                enabled: product.show_on_home,
                field: "home_display_order",
                message: "Home Tile Position is required and must be a whole number from 1 to 8.",
                maximum: 8
            }
        ];

        for (const validation of validations) {
            const input = row.querySelector(`[data-field="${validation.field}"]`);
            if (!input) continue;
            input.setCustomValidity("");
            if (!validation.enabled) continue;

            const value = Number(input.value);
            const invalid = !input.value.trim()
                || !Number.isInteger(value)
                || value < 1
                || (validation.maximum && value > validation.maximum);
            if (!invalid) continue;
            return reportAdminFieldError(input, validation.message);
        }
    }

    const homeProducts = state.admin.products.filter((product) => product.show_on_home === true);
    if (homeProducts.length > 8) {
        const index = selectedIndexes.find((selectedIndex) => state.admin.products[selectedIndex]?.show_on_home === true);
        const input = Number.isFinite(index)
            ? document.querySelector(`#productRows tr[data-index="${index}"] [data-field="show_on_home"]`)
            : null;
        return reportAdminFieldError(input, "All 8 Home tile positions are occupied. Uncheck Show below Home Search or free an existing tile position before saving.");
    }
    return true;
}

function syncPricingFromInputs() {
    Array.from(document.querySelectorAll("#pricingRows tr")).forEach((row) => {
        const index = Number(row.dataset.index);
        if (!Number.isFinite(index) || !state.admin.pricing[index]) return;
        state.admin.pricing[index] = { ...state.admin.pricing[index],
        pricing_id: row.dataset.id || "",
        product_id: row.querySelector('[data-field="product_id"]')?.value || "",
            grade_id: row.querySelector('[data-field="grade_id"]')?.value || "",
        specification: row.querySelector('[data-field="specification"]')?.value?.trim() || "",
        size_thickness: row.querySelector('[data-field="size_thickness"]')?.value?.trim() || "",
        unit: row.querySelector('[data-field="unit"]')?.value || "",
        rate: row.querySelector('[data-field="rate"]')?.value?.trim() || "",
        rate_display: row.querySelector('[data-field="rate_display"]')?.value || "price_on_request",
        price_validity_days: row.querySelector('[data-field="price_validity_days"]')?.value || "",
        rate_updated_on: row.querySelector('[data-field="rate_updated_on"]')?.value || "",
        remarks: row.querySelector('[data-field="remarks"]')?.value?.trim() || "",
        display_order: row.querySelector('[data-field="display_order"]')?.value ?? "",
        active: row.querySelector('[data-field="active"]')?.checked !== false };
    });
}

function validateSelectedPricingRows(selectedIndexes) {
    for (const index of selectedIndexes) {
        const row = document.querySelector(`#pricingRows tr[data-index="${index}"]`);
        const pricing = state.admin.pricing[index];
        if (!row || !pricing) continue;

        const requiredSelections = [
            ["product_id", pricing.product_id, "Product is required."],
            ["grade_id", pricing.grade_id, "Grade is required."]
        ];
        for (const [field, value, message] of requiredSelections) {
            const input = row.querySelector(`[data-field="${field}"]`);
            input?.setCustomValidity("");
            if (!value) return reportAdminFieldError(input, message);
        }

        const orderInput = row.querySelector('[data-field="display_order"]');
        orderInput?.setCustomValidity("");
        const order = Number(pricing.display_order);
        if (!String(pricing.display_order).trim() || !Number.isInteger(order) || order < 1) {
            return reportAdminFieldError(orderInput, "Display Order is required and must be a positive whole number.");
        }

        if (pricing.rate_display === "show_price") {
            const livePriceFields = [
                ["rate", pricing.rate, "Rate is required for a live price."],
                ["unit", pricing.unit, "Unit is required for a live price."],
                ["price_validity_days", pricing.price_validity_days, "Price Validity is required for a live price."]
            ];
            for (const [field, value, message] of livePriceFields) {
                const input = row.querySelector(`[data-field="${field}"]`);
                input?.setCustomValidity("");
                if (value === "" || value == null) return reportAdminFieldError(input, message);
            }
        }
    }
    return true;
}

function syncGradesFromInputs() {
    Array.from(document.querySelectorAll("#gradeRows tr")).forEach((row) => {
        const index = Number(row.dataset.index);
        if (!Number.isFinite(index) || !state.admin.grades[index]) return;
        state.admin.grades[index] = { ...state.admin.grades[index],
        grade_id: row.dataset.id || "",
        product_id: row.querySelector('[data-field="product_id"]')?.value || "",
        category_id: row.querySelector('[data-field="category_id"]')?.value || "",
        segment_id: row.querySelector('[data-field="segment_id"]')?.value || "",
        grade_name: row.querySelector('[data-field="grade_name"]')?.value?.trim() || "",
        display_order: row.querySelector('[data-field="display_order"]')?.value ?? "",
        active: row.querySelector('[data-field="active"]')?.checked !== false };
    });
}

function syncRecipientInputs() {
    Array.from(document.querySelectorAll("#enquiryRecipientRows tr")).forEach((row) => {
        const index = Number(row.dataset.index);
        if (!Number.isFinite(index) || !state.admin.recipients[index]) return;
        state.admin.recipients[index] = { ...state.admin.recipients[index],
        id: row.dataset.id || "",
        display_name: row.querySelector('[data-field="display_name"]')?.value?.trim() || "",
        email: row.querySelector('[data-field="email"]')?.value?.trim() || "",
        display_order: row.querySelector('[data-field="display_order"]')?.value ?? "",
        active: row.querySelector('[data-field="active"]')?.checked !== false };
    });
}

function validateSelectedRecipientRows(selectedIndexes) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const index of selectedIndexes) {
        const row = document.querySelector(`#enquiryRecipientRows tr[data-index="${index}"]`);
        const recipient = state.admin.recipients[index];
        if (!row || !recipient) continue;
        const nameInput = row.querySelector('[data-field="display_name"]');
        const emailInput = row.querySelector('[data-field="email"]');
        const orderInput = row.querySelector('[data-field="display_order"]');
        if (!recipient.display_name) return reportAdminFieldError(nameInput, "Recipient Name is required.");
        if (!emailPattern.test(recipient.email)) return reportAdminFieldError(emailInput, "Enter a valid recipient email address.");
        const duplicate = state.admin.recipients.some((item, otherIndex) => otherIndex !== index && String(item.email || "").trim().toLowerCase() === recipient.email.toLowerCase());
        if (duplicate) return reportAdminFieldError(emailInput, "This recipient email address already exists.");
        const order = Number(recipient.display_order);
        if (!String(recipient.display_order).trim() || !Number.isInteger(order) || order < 1) return reportAdminFieldError(orderInput, "Recipient Order is required and must be a positive whole number.");
    }
    return true;
}

async function loadAdminEnquiries() {
    state.admin.enquiries = await BCSPLDataLayer.fetchEnquiries();
}

async function refreshAdminData() {
    const [segments, categories, products, pricing, grades, images, recipients] = await Promise.all([
        BCSPLDataLayer.fetchSegments({ includeInactive: true }),
        BCSPLDataLayer.fetchCategories({ includeInactive: true }),
        BCSPLDataLayer.fetchProducts({ includeInactive: true }),
        BCSPLDataLayer.fetchProductPricing({ includeInactive: true }),
        BCSPLDataLayer.fetchGradeMaster({ includeInactive: true }),
        BCSPLDataLayer.fetchImageLibrary({ includeInactive: true }),
        BCSPLDataLayer.fetchEnquiryRecipients({ includeInactive: true })
    ]);

    state.admin.segments = (segments || []).map(normalizeSegment);
    state.admin.categories = (categories || []).map(normalizeCategory);
    state.admin.products = (products || []).map(normalizeProduct);
    state.admin.pricing = (pricing || []).map(normalizePricing);
    state.admin.grades = (grades || []).map(normalizeGrade);
    state.admin.images = (images || []).map(normalizeImage);
    state.admin.recipients = (recipients || []).map(normalizeEnquiryRecipient);
    await loadAdminEnquiries();
}

async function saveSegments() {
    const selectedIndexes = [...state.admin.editingIndexes.segments];
    if (!selectedIndexes.length && !state.admin.deleteQueues.segments.length) { alert("Select one or more Segment rows to save."); return; }
    syncSegmentsFromInputs();
    if (!validateSelectedSegmentRows(selectedIndexes)) return;
    const deletes = [...new Set(state.admin.deleteQueues.segments)];
    for (const segmentId of deletes) {
        const categoryLinks = state.admin.categories.filter((row) => row.segment_id === segmentId).length;
        const productLinks = await BCSPLDataLayer.countProductsBySegment(segmentId);
        if (categoryLinks || productLinks) {
            throw new Error("Cannot delete selected segment because categories or products still reference it. Prefer deactivation.");
        }
    }
    await BCSPLDataLayer.applyOrderedChanges("segments", selectedIndexes.map((index) => state.admin.segments[index]), deletes);
    state.admin.deleteQueues.segments = [];
    clearPublicMetadataCaches();
    state.admin.editingIndexes.segments = new Set();
    state.admin.editSnapshots.segments = new Map();
    await refreshAdminData();
    renderAllAdminViews();
    alert("Product segments saved.");
}

async function saveCategories() {
    const selectedIndexes = [...state.admin.editingIndexes.categories];
    if (!selectedIndexes.length && !state.admin.deleteQueues.categories.length) { alert("Select one or more Category rows to save."); return; }
    syncCategoriesFromInputs();
    const deletes = [...new Set(state.admin.deleteQueues.categories)];
    for (const categoryId of deletes) {
        const productLinks = await BCSPLDataLayer.countProductsByCategory(categoryId);
        if (productLinks) {
            throw new Error("Cannot delete selected category because products still reference it. Prefer deactivation.");
        }
        await BCSPLDataLayer.deleteCategory(categoryId);
    }
    for (const index of selectedIndexes) await BCSPLDataLayer.saveCategory(state.admin.categories[index]);
    state.admin.deleteQueues.categories = [];
    state.admin.editingIndexes.categories = new Set();
    state.admin.editSnapshots.categories = new Map();
    await refreshAdminData();
    renderAllAdminViews();
    alert("Product categories saved.");
}

async function saveProducts() {
    const selectedIndexes = [...state.admin.editingIndexes.products];
    if (!selectedIndexes.length && !state.admin.deleteQueues.products.length) { alert("Select one or more Product rows to save."); return; }
    syncProductsStateFromInputs();
    if (!validateSelectedProductRows(selectedIndexes)) return;
    const deletes = [...new Set(state.admin.deleteQueues.products)];
    const upserts = selectedIndexes
        .map((index) => state.admin.products[index])
        .sort((a, b) => Number(a.show_on_home === true) - Number(b.show_on_home === true)
            || Number(a.show_on_prices_enquiry === true) - Number(b.show_on_prices_enquiry === true));
    await BCSPLDataLayer.applyOrderedChanges("products", upserts, deletes);
    state.admin.deleteQueues.products = [];
    clearPublicMetadataCaches();
    await refreshAdminData();
    state.admin.editingIndexes.products = new Set();
    state.admin.editSnapshots.products = new Map();
    renderAllAdminViews();
    alert("Products saved.");
}

async function savePricing() {
    const selectedIndexes = [...state.admin.editingIndexes.pricing];
    if (!selectedIndexes.length && !state.admin.deleteQueues.pricing.length) { alert("Select one or more Pricing rows to save."); return; }
    syncPricingFromInputs();
    if (!validateSelectedPricingRows(selectedIndexes)) return;
    const deletes = [...new Set(state.admin.deleteQueues.pricing)];
    await BCSPLDataLayer.applyOrderedChanges("pricing", selectedIndexes.map((index) => state.admin.pricing[index]), deletes);
    state.admin.deleteQueues.pricing = [];
    state.admin.editingIndexes.pricing = new Set();
    state.admin.editSnapshots.pricing = new Map();
    await refreshAdminData();
    renderAllAdminViews();
    alert("Product pricing saved.");
}

async function saveGrades() {
    const selectedIndexes = [...state.admin.editingIndexes.grades];
    if (!selectedIndexes.length && !state.admin.deleteQueues.grades.length) { alert("Select one or more Grade rows to save."); return; }
    syncGradesFromInputs();
    const deletes = [...new Set(state.admin.deleteQueues.grades)];
    state.admin.deleteQueues.grades = [];
    await BCSPLDataLayer.applyOrderedChanges("grades", selectedIndexes.map((index) => state.admin.grades[index]), deletes);
    state.admin.editingIndexes.grades = new Set();
    state.admin.editSnapshots.grades = new Map();
    await refreshAdminData();
    renderAllAdminViews();
    alert("Grade master saved.");
}

async function saveEnquiryRecipients() {
    const selectedIndexes = [...state.admin.editingIndexes.recipients];
    if (!selectedIndexes.length && !state.admin.deleteQueues.recipients.length) { alert("Select one or more Recipient rows to save."); return; }
    syncRecipientInputs();
    if (!validateSelectedRecipientRows(selectedIndexes)) return;
    const deletes = [...new Set(state.admin.deleteQueues.recipients)];
    await BCSPLDataLayer.applyOrderedChanges("recipients", selectedIndexes.map((index) => state.admin.recipients[index]), deletes);
    state.admin.deleteQueues.recipients = [];
    state.admin.editingIndexes.recipients = new Set();
    state.admin.editSnapshots.recipients = new Map();
    await refreshAdminData();
    renderAllAdminViews();
    alert("Enquiry recipients saved.");
}

async function saveImageLibraryRow(row, refresh = true) {
    if (!row) return;
    const imageType = row.dataset.imageType || "";
    const imageId = row.dataset.id || "";
    const existing = state.admin.images.find((image) => image.image_id === imageId && image.image_type === imageType) || { image_type: imageType, source_type: "local", file_path: "" };
    const file = row.querySelector('[data-field="file"]')?.files?.[0] || null;
    const payload = {
        image_id: imageId,
        image_name: row.querySelector('[data-field="image_name"]')?.value?.trim() || "",
        image_type: imageType,
        source_type: existing.source_type,
        file_path: row.querySelector('[data-field="file_path"]')?.value?.trim() || existing.file_path || "",
        mime_type: existing.mime_type || (file?.type || ""),
        active: row.querySelector('[data-field="active"]')?.value === "true"
    };
    await BCSPLDataLayer.saveImageLibraryItem(payload, file);
    if (refresh) {
        clearPublicMetadataCaches();
        await refreshAdminData();
        renderAllAdminViews();
    }
}

async function saveSelectedImages(imageType) {
    const config = IMAGE_TYPE_CONFIG.find((item) => item.key === imageType);
    const selectedRows = Array.from(document.querySelectorAll(`#${config?.tbodyId} [data-row-select]:checked`)).map((input) => input.closest("tr"));
    if (!selectedRows.length) {
        alert("Select one or more image rows to save.");
        return;
    }
    for (const row of selectedRows) await saveImageLibraryRow(row, false);
    clearPublicMetadataCaches();
    await refreshAdminData();
    state.admin.editingIndexes[imageType] = new Set();
    renderImageLibraryRows(imageType);
    alert("Selected images saved.");
}

function addImageRow(imageType) {
    resetAdminTableView(imageType);
    state.admin.images.push(normalizeImage({ image_type: imageType, image_name: "", source_type: "local", file_path: "", active: true }));
    state.admin.editingIndexes[imageType].add(imageRowsByType(imageType).length - 1);
    renderImageLibraryRows(imageType);
    document.querySelector(`#${IMAGE_TYPE_CONFIG.find((item) => item.key === imageType)?.tbodyId} tr:last-child [data-field="image_name"]`)?.focus();
}

function prependEditableAdminRow({ moduleKey, item, sync, render, focusSelector }) {
    if (sync) sync();
    const shiftedEditingIndexes = new Set([...state.admin.editingIndexes[moduleKey]].map((index) => index + 1));
    const existingSnapshots = state.admin.editSnapshots[moduleKey] || new Map();
    const shiftedSnapshots = new Map([...existingSnapshots.entries()].map(([index, snapshot]) => [index + 1, snapshot]));

    state.admin[moduleKey].unshift(item);
    shiftedEditingIndexes.add(0);
    shiftedSnapshots.set(0, null);
    state.admin.editingIndexes[moduleKey] = shiftedEditingIndexes;
    state.admin.editSnapshots[moduleKey] = shiftedSnapshots;
    render();
    document.querySelector(focusSelector)?.focus();
}

function addSegmentRow() {
    resetAdminTableView("segments");
    prependEditableAdminRow({ moduleKey: "segments", item: normalizeSegment({ segment_name: "", description: "", display_order: 1, active: true }, 0), sync: syncSegmentsFromInputs, render: renderSegmentRows, focusSelector: '#segmentRows tr:first-child [data-field="segment_name"]' });
}

function addCategoryRow() {
    resetAdminTableView("categories");
    prependEditableAdminRow({ moduleKey: "categories", item: normalizeCategory({ segment_id: "", category_name: "", active: true }), sync: syncCategoriesFromInputs, render: renderCategoryRows, focusSelector: '#categoryRows tr:first-child [data-field="segment_id"]' });
}

function addProductRow() {
    resetAdminTableView("products");
    prependEditableAdminRow({ moduleKey: "products", item: normalizeProduct({ segment_id: "", category_id: "", product_name: "", description: "", show_on_home: false, home_display_order: "", show_on_prices_enquiry: true, prices_enquiry_display_order: 1, active: true }, 0), sync: syncProductsStateFromInputs, render: renderProductRows, focusSelector: '#productRows tr:first-child [data-field="segment_id"]' });
}

function addPricingRow() {
    resetAdminTableView("pricing");
    prependEditableAdminRow({ moduleKey: "pricing", item: normalizePricing({ product_id: "", rate_display: "price_on_request", display_order: 1, active: true }, 0), sync: syncPricingFromInputs, render: renderPricingRows, focusSelector: '#pricingRows tr:first-child [data-field="product_id"]' });
}

function addGradeRow() {
    resetAdminTableView("grades");
    prependEditableAdminRow({ moduleKey: "grades", item: normalizeGrade({ grade_name: "", display_order: 1, active: true }, 0), sync: syncGradesFromInputs, render: renderGradeRows, focusSelector: '#gradeRows tr:first-child [data-field="segment_id"]' });
}

function addRecipientRow() {
    resetAdminTableView("recipients");
    prependEditableAdminRow({ moduleKey: "recipients", item: normalizeEnquiryRecipient({}, 0), sync: syncRecipientInputs, render: renderEnquiryRecipientRows, focusSelector: '#enquiryRecipientRows tr:first-child [data-field="display_name"]' });
}

function fillAdminSettings(settings) {
    const mapping = {
        company_name: "set_company_name",
        mobile_1: "set_mobile_1",
        mobile_2: "set_mobile_2",
        whatsapp: "set_whatsapp",
        email: "set_email",
        enquiry_email: "set_enquiry_email",
        website: "set_website",
        corporate_office: "set_corporate_office",
        gst_address: "set_gst_address",
        gst_number: "set_gst_number",
        working_hours: "set_working_hours",
        google_maps_link: "set_google_maps_link",
        footer_text: "set_footer_text",
        social_links: "set_social_links"
    };
    Object.entries(mapping).forEach(([key, id]) => {
        const element = document.getElementById(id);
        if (element) element.value = settings[key] ?? "";
    });
}

function renderAllAdminViews() {
    renderSegmentRows();
    renderCategoryRows();
    renderProductRows();
    renderPricingRows();
    renderGradeRows();
    IMAGE_TYPE_CONFIG.forEach((config) => renderImageLibraryRows(config.key));
    renderEnquiryRows();
    renderEnquiryRecipientRows();
    renderDashboard();
    renderAdminSection(state.admin.activeSection);
}

async function drawAdmin() {
    const settings = await loadSiteSettings();
    fillAdminSettings(settings);
    await refreshAdminData();
    renderAllAdminViews();
}

function buildProductsExportRows() {
    return state.admin.products.map((product) => {
        const segment = getAdminSegmentById(product.segment_id);
        const category = getAdminCategoryById(product.category_id);
        const image = getImageById(product.product_photo_image_id, state.admin.images);
        return {
            "Product ID": product.product_id || "",
            "Product Segment": segment?.segment_name || "",
            "Product Category": category?.category_name || "",
            "Product Name": product.product_name || "",
            "Description": product.description || "",
            "Product Photograph Name": image?.image_name || "",
            "Show on Home": product.show_on_home ? "Yes" : "No",
            "Home Tile Position": product.home_display_order || "",
            "Show on Prices & Enquiry": product.show_on_prices_enquiry ? "Yes" : "No",
            "Prices & Enquiry Display Order": product.prices_enquiry_display_order || "",
            "Active": product.active ? "Yes" : "No"
        };
    });
}

function buildPricingExportRows() {
    return state.admin.pricing.map((pricing) => {
        const product = getAdminProductById(pricing.product_id);
        const category = product ? getAdminCategoryById(product.category_id) : null;
        return {
            "Pricing ID": pricing.pricing_id || "",
            "Product ID": pricing.product_id || "",
            "Product Name": product?.product_name || "",
            "Category": category?.category_name || "",
            "Grade ID": pricing.grade_id || "",
            "Grade Name": pricing.grade_name || "",
            "Specification": pricing.specification || "",
            "Size / Thickness": pricing.size_thickness || "",
            "Unit": pricing.unit || "",
            "Rate": pricing.rate === "" ? "" : pricing.rate,
            "Rate Display": pricing.rate_display || "",
            "Price Validity Days": pricing.price_validity_days || "",
            "Rate Updated On": dateOnly(pricing.rate_updated_on),
            "Price Valid Till": priceValidTill(pricing),
            "Remarks": pricing.remarks || "",
            "Display Order": pricing.display_order || "",
            "Active": pricing.active ? "Yes" : "No"
        };
    });
}

function downloadProductsTemplate() {
    exportRowsToXlsx([{
        "Product ID": "",
        "Product Segment": "",
        "Product Category": "",
        "Product Name": "",
        "Description": "",
        "Product Photograph Name": "",
        "Show on Home": "",
        "Home Tile Position": "",
        "Show on Prices & Enquiry": "",
        "Prices & Enquiry Display Order": "",
        "Active": ""
    }], "bcspl-products-master-template.xlsx", "Products_Master");
}

function downloadPricingTemplate() {
    exportRowsToXlsx([{
        "Pricing ID": "",
        "Product ID": "",
        "Product Name": "",
        "Category": "",
        "Grade ID": "",
        "Grade Name": "",
        "Specification": "",
        "Size / Thickness": "",
        "Unit": "",
        "Rate": "",
        "Rate Display": "",
        "Price Validity Days": "",
        "Rate Updated On": "",
        "Price Valid Till": "",
        "Remarks": "",
        "Display Order": "",
        "Active": ""
    }], "bcspl-product-pricing-template.xlsx", "Product_Pricing");
}

function buildGradeExportRows() {
    return state.admin.grades.map((grade) => ({
        "Grade ID": grade.grade_id || "",
        "Product Segment": grade.segment_name || getAdminSegmentById(grade.segment_id)?.segment_name || "",
        "Product Category": grade.category_name || getAdminCategoryById(grade.category_id)?.category_name || "",
        "Product ID": grade.product_id || "",
        "Product Name": grade.product_name || getAdminProductById(grade.product_id)?.product_name || "",
        "Grade Name": grade.grade_name || "",
        "Display Order": grade.display_order || "",
        "Active": grade.active ? "Yes" : "No"
    }));
}

function downloadGradesTemplate() {
    exportRowsToXlsx([{
        "Grade ID": "", "Product Segment": "", "Product Category": "", "Product ID": "",
        "Product Name": "", "Grade Name": "", "Display Order": "", "Active": ""
    }], "bcspl-grade-master-template.xlsx", "Grade_Master");
}

function downloadErrorReport(rows) {
    if (!rows.length) return;
    const csv = ["Row,Error", ...rows.map((row) => `${row.row},"${String(row.reason || "").replace(/"/g, '""')}"`)].join("\n");
    download("bcspl-import-errors.csv", csv, "text/csv");
}

async function parseImportFile(file) {
    const extension = file.name.toLowerCase().split(".").pop();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = reject;
        reader.onload = (event) => {
            try {
                let rows = [];
                if ((extension === "xlsx" || extension === "xls") && window.XLSX) {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
                } else if (extension === "json") {
                    const parsed = JSON.parse(String(event.target.result || "[]"));
                    rows = Array.isArray(parsed) ? parsed : parsed.rows || [];
                } else if (extension === "txt") {
                    rows = parseCsv(String(event.target.result || ""), "\t");
                } else {
                    rows = parseCsv(String(event.target.result || ""), ",");
                }
                resolve(rows);
            } catch (error) {
                reject(error);
            }
        };
        if (extension === "xlsx" || extension === "xls") reader.readAsArrayBuffer(file);
        else reader.readAsText(file);
    });
}

async function importProductsMaster(file) {
    const rows = await parseImportFile(file);
    const segmentByName = new Map(state.admin.segments.map((segment) => [segment.segment_name.toLowerCase(), segment]));
    const imageByName = new Map(state.admin.images.filter((image) => image.image_type === "product_photo").map((image) => [image.image_name.toLowerCase(), image]));
    const productsById = new Map(state.admin.products.filter((product) => product.product_id).map((product) => [product.product_id, product]));
    const errors = [];
    const prepared = [];
    let inserts = 0;
    let updates = 0;

    rows.forEach((row, index) => {
        const rowNo = index + 2;
        const productId = String(row["Product ID"] || "").trim();
        const segmentName = String(row["Product Segment"] || "").trim();
        const categoryName = String(row["Product Category"] || "").trim();
        const productName = String(row["Product Name"] || "").trim();
        if (!productId && !segmentName && !categoryName && !productName) return;

        const segment = segmentByName.get(segmentName.toLowerCase());
        if (!segment) {
            errors.push({ row: rowNo, reason: "Invalid Product Segment" });
            return;
        }
        const category = state.admin.categories.find((item) => item.segment_id === segment.segment_id && item.category_name.toLowerCase() === categoryName.toLowerCase());
        if (!category) {
            errors.push({ row: rowNo, reason: "Invalid Product Category for the selected segment" });
            return;
        }
        if (productId && !productsById.has(productId)) {
            errors.push({ row: rowNo, reason: "Product ID provided but no matching record exists" });
            return;
        }
        const imageName = String(row["Product Photograph Name"] || "").trim();
        const image = imageName ? imageByName.get(imageName.toLowerCase()) : null;
        if (imageName && !image) {
            errors.push({ row: rowNo, reason: "Invalid Product Photograph Name" });
            return;
        }

        prepared.push({
            product_id: productId,
            segment_id: segment.segment_id,
            category_id: category.category_id,
            product_name: productName,
            description: String(row["Description"] || "").trim(),
            product_photo_image_id: image?.image_id || "",
            show_on_home: toBool(row["Show on Home"], true),
            home_display_order: row["Home Tile Position"] || "",
            show_on_prices_enquiry: toBool(row["Show on Prices & Enquiry"], true),
            prices_enquiry_display_order: row["Prices & Enquiry Display Order"] || "",
            active: toBool(row["Active"], true)
        });
        if (productId) updates++;
        else inserts++;
    });

    downloadErrorReport(errors);
    if (!prepared.length) {
        alert(`Import preview:\n\nNew: ${inserts}\nUpdated: ${updates}\nInvalid: ${errors.length}\n\nNo valid rows to write.`);
        return;
    }
    if (!confirm(`Import preview:\n\nNew: ${inserts}\nUpdated: ${updates}\nInvalid: ${errors.length}\n\nProceed with database write?`)) return;
    await BCSPLDataLayer.applyOrderedChanges("products", prepared, []);
    clearPublicMetadataCaches();
    await refreshAdminData();
    renderAllAdminViews();
    alert("Products master import completed.");
}

async function importProductPricing(file) {
    const rows = await parseImportFile(file);
    const pricingById = new Map(state.admin.pricing.filter((pricing) => pricing.pricing_id).map((pricing) => [pricing.pricing_id, pricing]));
    const errors = [];
    const prepared = [];
    let inserts = 0;
    let updates = 0;

    rows.forEach((row, index) => {
        const rowNo = index + 2;
        const pricingId = String(row["Pricing ID"] || "").trim();
        const productId = String(row["Product ID"] || "").trim();
        const productName = String(row["Product Name"] || "").trim();
        const categoryName = String(row["Category"] || "").trim();
        if (!pricingId && !productId && !productName && !categoryName) return;

        const product = productId ? getAdminProductById(productId) : state.admin.products.find((item) => {
            const category = getAdminCategoryById(item.category_id);
            return item.product_name.toLowerCase() === productName.toLowerCase() && category?.category_name.toLowerCase() === categoryName.toLowerCase();
        });
        if (!product) {
            errors.push({ row: rowNo, reason: "Product not found for Product ID/Product Name + Category" });
            return;
        }
        if (pricingId && !pricingById.has(pricingId)) {
            errors.push({ row: rowNo, reason: "Pricing ID provided but no matching record exists" });
            return;
        }
        const gradeId = String(row["Grade ID"] || "").trim();
        const gradeName = String(row["Grade Name"] || "").trim();
        let grade = gradeId ? state.admin.grades.find((item) => item.grade_id === gradeId) : null;
        if (!grade && gradeName) {
            const matches = state.admin.grades.filter((item) => item.product_id === product.product_id && item.active !== false && item.grade_name.toLowerCase() === gradeName.toLowerCase());
            if (matches.length !== 1) {
                errors.push({ row: rowNo, reason: matches.length ? "Ambiguous Grade Name for Product" : "Active Grade Name not found for Product" });
                return;
            }
            grade = matches[0];
        }
        if (!grade || grade.active === false || grade.product_id !== product.product_id) {
            errors.push({ row: rowNo, reason: "Grade ID is missing, inactive, or not assigned to the selected Product" });
            return;
        }
        const rateDisplay = String(row["Rate Display"] || "price_on_request").trim() || "price_on_request";
        if (!RATE_DISPLAY_OPTIONS.includes(rateDisplay)) {
            errors.push({ row: rowNo, reason: "Invalid Rate Display" });
            return;
        }
        prepared.push({
            pricing_id: pricingId,
            product_id: product.product_id,
            grade_id: grade.grade_id,
            specification: String(row["Specification"] || "").trim(),
            size_thickness: String(row["Size / Thickness"] || "").trim(),
            unit: String(row["Unit"] || "").trim(),
            rate: String(row["Rate"] || "").trim(),
            rate_display: rateDisplay,
            price_validity_days: String(row["Price Validity Days"] || "").trim(),
            remarks: String(row["Remarks"] || "").trim(),
            display_order: row["Display Order"],
            active: toBool(row["Active"], true),
            rate_updated_on: String(row["Rate Updated On"] || "").trim()
        });
        if (pricingId) updates++;
        else inserts++;
    });

    downloadErrorReport(errors);
    if (!prepared.length) {
        alert(`Import preview:\n\nNew: ${inserts}\nUpdated: ${updates}\nInvalid: ${errors.length}\n\nNo valid rows to write.`);
        return;
    }
    if (!confirm(`Import preview:\n\nNew: ${inserts}\nUpdated: ${updates}\nInvalid: ${errors.length}\n\nProceed with database write?`)) return;
    await BCSPLDataLayer.applyOrderedChanges("pricing", prepared, []);
    await refreshAdminData();
    renderAllAdminViews();
    alert("Product pricing import completed.");
}

async function importGradeMaster(file) {
    const rows = await parseImportFile(file);
    const existingById = new Map(state.admin.grades.filter((grade) => grade.grade_id).map((grade) => [grade.grade_id, grade]));
    const errors = [];
    const prepared = [];
    let inserts = 0;
    let updates = 0;
    rows.forEach((row, index) => {
        const rowNo = index + 2;
        const gradeId = String(row["Grade ID"] || "").trim();
        const productId = String(row["Product ID"] || "").trim();
        const productName = String(row["Product Name"] || "").trim();
        const gradeName = String(row["Grade Name"] || "").trim();
        if (!gradeId && !productId && !productName && !gradeName) return;
        const product = productId ? getAdminProductById(productId) : state.admin.products.find((item) => item.product_name.toLowerCase() === productName.toLowerCase());
        if (!product) { errors.push({ row: rowNo, reason: "Product not found" }); return; }
        if (!gradeName) { errors.push({ row: rowNo, reason: "Grade Name is required" }); return; }
        if (gradeId && !existingById.has(gradeId)) { errors.push({ row: rowNo, reason: "Grade ID provided but no matching record exists" }); return; }
        const duplicate = state.admin.grades.find((item) => item.product_id === product.product_id && item.grade_name.toLowerCase() === gradeName.toLowerCase() && item.grade_id !== gradeId);
        if (duplicate) { errors.push({ row: rowNo, reason: "Duplicate Grade Name for Product" }); return; }
        prepared.push({ grade_id: gradeId, product_id: product.product_id, grade_name: gradeName, display_order: row["Display Order"], active: toBool(row["Active"], true) });
        if (gradeId) updates++; else inserts++;
    });
    downloadErrorReport(errors);
    if (!prepared.length) { alert(`Import preview:\n\nNew: ${inserts}\nUpdated: ${updates}\nInvalid: ${errors.length}\n\nNo valid rows to write.`); return; }
    if (!confirm(`Import preview:\n\nNew: ${inserts}\nUpdated: ${updates}\nInvalid: ${errors.length}\n\nProceed with database write?`)) return;
    await BCSPLDataLayer.applyOrderedChanges("grades", prepared, []);
    await refreshAdminData();
    renderAllAdminViews();
    alert("Grade master import completed.");
}

async function admin() {
    const login = document.getElementById("loginBox");
    const panel = document.getElementById("adminPanel");
    const authCheck = document.getElementById("adminAuthCheck");
    if (!login || !panel) return;

    const emailInput = document.getElementById("uid");
    const passwordInput = document.getElementById("pwd");
    const loginButton = document.getElementById("loginBtn");

    async function isActiveAdmin(session) {
        if (!session?.user?.id) return false;
        try {
            const { data, error } = await supabaseClient.from("admin_users").select("*").eq("user_id", session.user.id).single();
            if (error) return false;
            return !!data && data.active !== false;
        } catch {
            return false;
        }
    }

    function showLogin() {
        panel.hidden = true;
        authCheck?.setAttribute("hidden", "");
        login.hidden = false;
    }

    async function showDashboard() {
        login.hidden = true;
        authCheck?.setAttribute("hidden", "");
        panel.hidden = false;
        await drawAdmin();
    }

    async function logout() {
        panel.hidden = true;
        login.hidden = true;
        if (authCheck) {
            authCheck.textContent = "Signing out...";
            authCheck.hidden = false;
        }
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error("Admin sign-out failed:", error);
        } finally {
            showLogin();
        }
    }

    document.getElementById("sidebarLogoutBtn")?.addEventListener("click", logout);

    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_OUT" || !session) {
            showLogin();
            return;
        }
        if (event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
            setTimeout(async () => {
                if (await isActiveAdmin(session)) {
                    if (panel.hidden) await showDashboard();
                } else {
                    await supabaseClient.auth.signOut();
                    showLogin();
                }
            }, 0);
        }
    });

    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (session && await isActiveAdmin(session)) await showDashboard();
        else {
            if (session) await supabaseClient.auth.signOut();
            showLogin();
        }
    } catch {
        showLogin();
    }

    if (!loginButton) return;
    loginButton.onclick = async () => {
        const email = emailInput?.value?.trim().toLowerCase() || "";
        const password = passwordInput?.value || "";
        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }
        loginButton.disabled = true;
        loginButton.textContent = "Signing In...";
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error || !(await isActiveAdmin(data.session))) {
                await supabaseClient.auth.signOut();
                alert("This account is not authorized to access the admin panel.");
                return;
            }
            if (passwordInput) passwordInput.value = "";
            await showDashboard();
        } catch {
            alert("An error occurred during login. Please try again.");
        } finally {
            loginButton.disabled = false;
            loginButton.textContent = "Login";
        }
    };
    passwordInput?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") loginButton.click();
    });
}

function bindAdmin() {
    if (!document.getElementById("adminPanel")) return;

    const on = (id, handler) => {
        const element = document.getElementById(id);
        if (element) element.onclick = handler;
    };
    const onOrdered = (id, action, fallbackMessage) => on(id, async () => {
        const button = document.getElementById(id);
        if (!button || button.disabled) return;
        button.disabled = true;
        try {
            await action();
        } catch (error) {
            console.error(error);
            alert(error?.message || fallbackMessage);
        } finally {
            button.disabled = false;
        }
    });

    on("closeEnquiryDetailsX", closeEnquiryDetails);
    on("closeEnquiryDetailsBtn", closeEnquiryDetails);
    document.getElementById("enquiryDetailsDialog")?.addEventListener("click", (event) => {
        if (event.target.id === "enquiryDetailsDialog") closeEnquiryDetails();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !document.getElementById("enquiryDetailsDialog")?.hidden) closeEnquiryDetails();
    });

    let enquirySearchTimer = null;
    document.getElementById("enquirySearchInput")?.addEventListener("input", () => {
        clearTimeout(enquirySearchTimer);
        enquirySearchTimer = setTimeout(renderEnquiryRows, 180);
    });
    ["enquiryDateFrom", "enquiryDateTo", "enquiryStatusFilter", "enquiryEmailFilter"].forEach((id) => {
        document.getElementById(id)?.addEventListener("change", renderEnquiryRows);
    });
    on("clearEnquiryFiltersBtn", () => {
        ["enquirySearchInput", "enquiryDateFrom", "enquiryDateTo", "enquiryStatusFilter", "enquiryEmailFilter"].forEach((id) => {
            const field = document.getElementById(id);
            if (field) field.value = "";
        });
        renderEnquiryRows();
        document.getElementById("enquirySearchInput")?.focus();
    });

    on("addSegmentBtn", addSegmentRow);
    onOrdered("deleteSelectedSegmentsBtn", () => deleteSelectedRows({ moduleKey: "segments", tbodyId: "segmentRows", label: "Segment", nameField: "segment_name", idField: "segment_id", save: saveSegments }), "Could not delete selected segments.");
    onOrdered("saveSegmentsBtn", saveSegments, "Could not save product segments.");
    on("clearSegmentsSelectionBtn", () => setModuleSelection("segments", false, renderSegmentRows));
    on("addCategoryBtn", addCategoryRow);
    on("deleteSelectedCategoriesBtn", () => deleteSelectedRows({ moduleKey: "categories", tbodyId: "categoryRows", label: "Category", nameField: "category_name", idField: "category_id", save: saveCategories }).catch((error) => alert(error?.message || "Could not delete selected categories.")));
    on("saveCategoriesBtn", () => saveCategories().catch((error) => { console.error(error); alert(error?.message || "Could not save product categories."); }));
    on("clearCategoriesSelectionBtn", () => setModuleSelection("categories", false, renderCategoryRows));
    on("addProductBtn", addProductRow);
    onOrdered("bulkDeleteProductsBtnTop", () => deleteSelectedRows({ moduleKey: "products", tbodyId: "productRows", label: "Product", nameField: "product_name", idField: "product_id", save: saveProducts }), "Could not delete selected products.");
    onOrdered("saveProductsBtn", saveProducts, "Could not save products.");
    on("clearProductsSelectionBtn", () => setModuleSelection("products", false, renderProductRows));
    on("addPricingBtn", addPricingRow);
    onOrdered("deleteSelectedPricingBtn", () => deleteSelectedRows({ moduleKey: "pricing", tbodyId: "pricingRows", label: "Pricing", nameField: "grade_name", idField: "pricing_id", save: savePricing }), "Could not delete selected pricing.");
    onOrdered("savePricingBtn", savePricing, "Could not save product pricing.");
    on("clearPricingSelectionBtn", () => setModuleSelection("pricing", false, renderPricingRows));
    on("bulkChangeRateDisplayBtn", () => {
        syncPricingFromInputs();
        const value = prompt("Enter Rate Display (show_price|price_on_request|coming_soon|out_of_stock):", "price_on_request");
        if (!value || !RATE_DISPLAY_OPTIONS.includes(value)) return;
        selectedRowIndexes("pricingRows").forEach((index) => {
            if (state.admin.pricing[index]) state.admin.pricing[index].rate_display = value;
        });
        renderPricingRows();
    });
    on("bulkChangeValidityBtn", () => {
        syncPricingFromInputs();
        const value = prompt("Enter Price Validity Days:", "7");
        if (!value) return;
        selectedRowIndexes("pricingRows").forEach((index) => {
            if (state.admin.pricing[index]) state.admin.pricing[index].price_validity_days = Number(value);
        });
        renderPricingRows();
    });
    on("bulkChangeUnitBtn", () => {
        syncPricingFromInputs();
        const value = prompt("Enter Unit:", "MT");
        if (!value) return;
        selectedRowIndexes("pricingRows").forEach((index) => {
            if (state.admin.pricing[index]) state.admin.pricing[index].unit = value;
        });
        renderPricingRows();
    });
    on("addGradeBtn", addGradeRow);
    onOrdered("deleteSelectedGradesBtn", () => deleteSelectedRows({ moduleKey: "grades", tbodyId: "gradeRows", label: "Grade", nameField: "grade_name", idField: "grade_id", save: saveGrades }), "Could not delete selected grades.");
    onOrdered("saveGradesBtn", saveGrades, "Could not save grades.");
    on("clearGradesSelectionBtn", () => setModuleSelection("grades", false, renderGradeRows));
    on("addEnquiryRecipientBtn", addRecipientRow);
    onOrdered("saveEnquiryRecipientsBtn", saveEnquiryRecipients, "Could not save enquiry recipients.");
    onOrdered("deleteSelectedRecipientsBtn", () => deleteSelectedRows({ moduleKey: "recipients", tbodyId: "enquiryRecipientRows", label: "Recipient", nameField: "email", idField: "id", save: saveEnquiryRecipients }), "Could not delete selected recipients.");
    on("clearRecipientsSelectionBtn", () => setModuleSelection("recipients", false, renderEnquiryRecipientRows));
    on("saveSettingsBtn", async () => {
        const ok = await saveSiteSettings();
        alert(ok ? "Settings saved." : "Could not save settings.");
    });
    on("downloadProductsTemplate", downloadProductsTemplate);
    on("downloadPricingTemplate", downloadPricingTemplate);
    on("downloadGradesTemplate", downloadGradesTemplate);
    on("exportProductsMaster", () => exportRowsToXlsx(buildProductsExportRows(), `bcspl-products-master-${new Date().toISOString().slice(0, 10)}.xlsx`, "Products_Master"));
    on("exportPricingRows", () => exportRowsToXlsx(buildPricingExportRows(), `bcspl-product-pricing-${new Date().toISOString().slice(0, 10)}.xlsx`, "Product_Pricing"));
    on("exportGradeRows", () => exportRowsToXlsx(buildGradeExportRows(), `bcspl-grade-master-${new Date().toISOString().slice(0, 10)}.xlsx`, "Grade_Master"));
    on("addSegmentPhotoBtn", () => addImageRow("segment_photo"));
    on("addSegmentIconBtn", () => addImageRow("segment_icon"));
    on("addProductPhotoBtn", () => addImageRow("product_photo"));
    on("saveSegmentPhotosBtn", () => saveSelectedImages("segment_photo").catch((e) => alert(e?.message || "Could not save images.")));
    on("saveSegmentIconsBtn", () => saveSelectedImages("segment_icon").catch((e) => alert(e?.message || "Could not save icons.")));
    on("saveProductPhotosBtn", () => saveSelectedImages("product_photo").catch((e) => alert(e?.message || "Could not save images.")));
    on("bulkDeleteSegmentPhotosBtn", () => bulkDeleteImages("segment_photo").catch((e) => alert(e?.message || "Could not delete images.")));
    on("clearSegmentPhotosSelectionBtn", () => setImageSelection("segment_photo", false));
    on("bulkDeleteSegmentIconsBtn", () => bulkDeleteImages("segment_icon").catch((e) => alert(e?.message || "Could not delete icons.")));
    on("clearSegmentIconsSelectionBtn", () => setImageSelection("segment_icon", false));
    on("bulkDeleteProductPhotosBtn", () => bulkDeleteImages("product_photo").catch((e) => alert(e?.message || "Could not delete images.")));
    on("clearProductPhotosSelectionBtn", () => setImageSelection("product_photo", false));
    on("dashboardSegmentsBtn", () => renderAdminSection("segmentsSection"));
    on("dashboardProductsBtn", () => renderAdminSection("productsSection"));
    on("dashboardPricingBtn", () => renderAdminSection("pricingSection"));
    on("dashboardEnquiriesBtn", () => renderAdminSection("enquiriesSection"));

    document.getElementById("selectAllSegments")?.addEventListener("change", (event) => {
        setModuleSelection("segments", event.target.checked, renderSegmentRows, visibleRowIndexes("segmentRows"));
    });
    document.getElementById("selectAllCategories")?.addEventListener("change", (event) => {
        setModuleSelection("categories", event.target.checked, renderCategoryRows, visibleRowIndexes("categoryRows"));
    });
    document.getElementById("selectAllProducts")?.addEventListener("change", (event) => {
        setModuleSelection("products", event.target.checked, renderProductRows, visibleRowIndexes("productRows"));
    });
    document.getElementById("selectAllPricing")?.addEventListener("change", (event) => {
        setModuleSelection("pricing", event.target.checked, renderPricingRows, visibleRowIndexes("pricingRows"));
    });
    document.getElementById("selectAllGrades")?.addEventListener("change", (event) => {
        setModuleSelection("grades", event.target.checked, renderGradeRows, visibleRowIndexes("gradeRows"));
    });
    document.getElementById("selectAllRecipients")?.addEventListener("change", (event) => {
        setModuleSelection("recipients", event.target.checked, renderEnquiryRecipientRows, visibleRowIndexes("enquiryRecipientRows"));
    });
    document.getElementById("selectAllSegmentPhotos")?.addEventListener("change", (event) => setImageSelection("segment_photo", event.target.checked, visibleRowIndexes("segmentPhotoRows")));
    document.getElementById("selectAllSegmentIcons")?.addEventListener("change", (event) => setImageSelection("segment_icon", event.target.checked, visibleRowIndexes("segmentIconRows")));
    document.getElementById("selectAllProductPhotos")?.addEventListener("change", (event) => setImageSelection("product_photo", event.target.checked, visibleRowIndexes("productPhotoRows")));

    document.querySelectorAll("#adminModuleNav [data-section]").forEach((button) => {
        button.onclick = () => renderAdminSection(button.dataset.section || "dashboardSection");
    });

    const productsImport = document.getElementById("importProductsMasterFile");
    if (productsImport) {
        productsImport.onchange = async (event) => {
            const file = event.target.files?.[0];
            if (file) await importProductsMaster(file).catch((error) => { console.error(error); alert("Products master import failed."); });
            event.target.value = "";
        };
    }
    const pricingImport = document.getElementById("importPricingFile");
    if (pricingImport) {
        pricingImport.onchange = async (event) => {
            const file = event.target.files?.[0];
            if (file) await importProductPricing(file).catch((error) => { console.error(error); alert("Product pricing import failed."); });
            event.target.value = "";
        };
    }
    const gradesImport = document.getElementById("importGradesFile");
    if (gradesImport) {
        gradesImport.onchange = async (event) => {
            const file = event.target.files?.[0];
            if (file) await importGradeMaster(file).catch((error) => { console.error(error); alert(error?.message || "Grade master import failed."); });
            event.target.value = "";
        };
    }
}

function alignInitialHashTarget() {
    const hash = String(window.location.hash || "").toLowerCase();
    if (hash !== "#about" && hash !== "#contact") return;
    const id = hash.slice(1);
    const element = document.getElementById(id);
    if (!element) return;
    const header = document.querySelector(".topbar");
    const headerHeight = header ? header.getBoundingClientRect().height : 76;
    const top = Math.max(0, element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8);
    window.scrollTo({ top, behavior: "auto" });
}

document.addEventListener("DOMContentLoaded", async () => {
    await renderBasics();
    renderProductsPage();
    renderHomeSearchChips();
    bindHomeSearch();

    await Promise.all([loadPublicSegmentsFromCache(), loadHomeProductsFromCache()]);
    renderHomeSegments();
    renderHomeSearchChips();
    bindHomeSearch();

    await loadFullPublicData();
    renderHomeSegments();
    renderHomeSearchChips();
    bindHomeSearch();
    renderProductsPage();
    applyProductsPageSegmentTarget();
    renderEnquiryPage();

    bindAdmin();
    admin();

    // Re-align cross-page #about / #contact after async catalogue and image layout settles.
    alignInitialHashTarget();
    window.setTimeout(alignInitialHashTarget, 180);
    window.setTimeout(alignInitialHashTarget, 700);
});

window.addEventListener("load", alignInitialHashTarget);

(function () {
    function setActiveNav(target) {
        const links = document.querySelectorAll(".menu a");
        links.forEach((link) => link.classList.remove("active"));
        let match = null;
        links.forEach((link) => {
            const href = link.getAttribute("href") || "";
            if (target === "contact" && href.includes("#contact")) match = link;
            else if (target === "about" && href.includes("#about")) match = link;
            else if (target === "products" && href.includes("products.html")) match = link;
            else if (target === "enquiry" && href.includes("enquiry.html")) match = link;
            else if (target === "home" && href === "index.html") match = link;
        });
        if (match) match.classList.add("active");
    }

    function scrollToAnchor(id, target) {
        const element = document.getElementById(id);
        const header = document.querySelector(".topbar");
        if (!element) return;
        const headerHeight = header ? header.offsetHeight : 76;
        const top = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveNav(target);
        try {
            history.replaceState(null, "", `#${id}`);
        } catch {}
    }

    document.addEventListener("click", (event) => {
        const anchor = event.target.closest("a");
        if (!anchor) return;
        const href = anchor.getAttribute("href") || "";
        if ((href.endsWith("#contact") || href === "#contact") && document.getElementById("contact")) {
            event.preventDefault();
            scrollToAnchor("contact", "contact");
        }
        if ((href.endsWith("#about") || href === "#about") && document.getElementById("about")) {
            event.preventDefault();
            scrollToAnchor("about", "about");
        }
    });

    const path = location.pathname.split("/").pop();
    if (path === "products.html") setActiveNav("products");
    else if (path === "enquiry.html") setActiveNav("enquiry");
    else setActiveNav("home");
})();


/* BCSPL Website v1.1 UX - Sprint 1: Mobile navigation */
(function initMobileNavigation(){
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.topbar .menu');
    const backdrop = document.querySelector('.menu-backdrop');
    if (!toggle || !menu || !backdrop) return;

    const setOpen = (open) => {
        document.body.classList.toggle('menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        backdrop.hidden = !open;
        if (open) {
            const current = menu.querySelector('a.active') || menu.querySelector('a');
            window.setTimeout(() => current?.focus(), 80);
        }
    };

    toggle.addEventListener('click', () => setOpen(!document.body.classList.contains('menu-open')));
    backdrop.addEventListener('click', () => setOpen(false));
    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1180) setOpen(false);
    });
})();
