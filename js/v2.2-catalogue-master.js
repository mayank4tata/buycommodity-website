/* BCSPL Website V2.2.0 - Unified Catalogue & Pricing Master
 * Loaded after js/app.js. V2.1.4 authentication and user management remain unchanged.
 */

const CATALOGUE_MASTER_HEADERS = [
    "Segment Name", "Segment Display Order", "Segment Active",
    "Category Name", "Category Display Order", "Category Active",
    "Product Name", "Product Description", "Product Active",
    "Show on Prices & Enquiry", "Product Display Order",
    "Show below Home Search", "Home Tile Position",
    "Grade Name", "Grade Display Order", "Grade Active",
    "Specification", "Size / Thickness", "Unit", "Rate", "Price Display",
    "Price Validity Days", "Rate Updated On", "Remarks", "Pricing Display Order", "Pricing Active",
    "Action",
    "Segment ID", "Category ID", "Product ID", "Grade ID", "Pricing ID",
    "Segment Photo ID", "Segment Icon ID", "Product Photo ID"
];

const CATALOGUE_VISIBLE_FIELDS = {
    segment_name: "Segment Name",
    segment_display_order: "Segment Display Order",
    segment_active: "Segment Active",
    category_name: "Category Name",
    category_display_order: "Category Display Order",
    category_active: "Category Active",
    product_name: "Product Name",
    product_description: "Product Description",
    product_active: "Product Active",
    show_on_prices_enquiry: "Show on Prices & Enquiry",
    product_display_order: "Product Display Order",
    show_on_home: "Show below Home Search",
    home_display_order: "Home Tile Position",
    grade_name: "Grade Name",
    grade_display_order: "Grade Display Order",
    grade_active: "Grade Active",
    specification: "Specification",
    size_thickness: "Size / Thickness",
    unit: "Unit",
    rate: "Rate",
    rate_display: "Price Display",
    price_validity_days: "Price Validity Days",
    rate_updated_on: "Rate Updated On",
    remarks: "Remarks",
    pricing_display_order: "Pricing Display Order",
    pricing_active: "Pricing Active",
    action: "Action"
};

const CATALOGUE_RATE_DISPLAY_LABELS = {
    show_price: "Show Price",
    price_on_request: "Price on Request",
    coming_soon: "Coming Soon",
    out_of_stock: "Out of Stock"
};

const CATALOGUE_IMPORT_STATUS_LABELS = {
    error: "Needs Attention",
    new: "New",
    update: "Updated",
    unchanged: "Unchanged",
    delete: "Delete",
    ignore: "Ignored"
};

state.admin.catalogueImport = {
    rows: [],
    sourceName: "",
    validated: false,
    filters: { status: "all", segment: "all", product: "", text: "" }
};

BCSPLDataLayer.importCatalogueMaster = async function importCatalogueMaster(rows) {
    const { data, error } = await supabaseClient.rpc("admin_import_catalogue_master_v2", { p_rows: rows });
    if (error) throw error;
    return data;
};

function catalogueText(value) {
    return String(value == null ? "" : value).trim().replace(/\s+/g, " ");
}

function catalogueKey(value) {
    return catalogueText(value).toLowerCase();
}

function catalogueBoolean(value, fallback = true) {
    if (typeof value === "boolean") return value;
    const text = catalogueKey(value);
    if (["yes", "y", "true", "1", "active", "show"].includes(text)) return true;
    if (["no", "n", "false", "0", "inactive", "hide"].includes(text)) return false;
    return fallback;
}

function catalogueYesNo(value) {
    return value === false ? "No" : "Yes";
}

function cataloguePositiveInteger(value) {
    if (value === "" || value == null) return null;
    const number = Number(value);
    return Number.isFinite(number) && number >= 1 && Math.trunc(number) === number ? number : null;
}

function catalogueNumber(value) {
    if (value === "" || value == null) return null;
    const clean = typeof value === "string" ? value.replace(/,/g, "").trim() : value;
    const number = Number(clean);
    return Number.isFinite(number) ? number : null;
}

function catalogueToday() {
    return new Date().toISOString().slice(0, 10);
}

function excelSerialToIso(value) {
    const serial = Number(value);
    if (!Number.isFinite(serial) || serial < 1000 || serial > 100000) return "";
    if (window.XLSX?.SSF?.parse_date_code) {
        const parsed = XLSX.SSF.parse_date_code(serial);
        if (parsed?.y && parsed?.m && parsed?.d) {
            return `${String(parsed.y).padStart(4, "0")}-${String(parsed.m).padStart(2, "0")}-${String(parsed.d).padStart(2, "0")}`;
        }
    }
    const epoch = new Date(Date.UTC(1899, 11, 30));
    epoch.setUTCDate(epoch.getUTCDate() + Math.trunc(serial));
    return epoch.toISOString().slice(0, 10);
}

function catalogueParseDate(value) {
    if (value == null || value === "") return { value: "", valid: true, original: value };
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return { value: value.toISOString().slice(0, 10), valid: true, original: value };
    }
    if (typeof value === "number") {
        const iso = excelSerialToIso(value);
        return iso ? { value: iso, valid: true, original: value } : { value: "", valid: false, original: value };
    }
    const text = catalogueText(value);
    if (!text) return { value: "", valid: true, original: value };
    const isoDateTime = text.match(/^(\d{4}-\d{2}-\d{2})[T\s]/);
    if (isoDateTime) {
        const parsed = catalogueParseDate(isoDateTime[1]);
        return parsed.valid ? { value: parsed.value, valid: true, original: value } : { value: "", valid: false, original: value };
    }
    if (/^\d+(\.\d+)?$/.test(text)) {
        const iso = excelSerialToIso(text);
        return iso ? { value: iso, valid: true, original: value } : { value: "", valid: false, original: value };
    }
    let match = text.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    let year, month, day;
    if (match) {
        [, year, month, day] = match;
    } else {
        match = text.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
        if (match) [, day, month, year] = match;
    }
    if (!match) return { value: "", valid: false, original: value };
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    const valid = date.getUTCFullYear() === Number(year) && date.getUTCMonth() === Number(month) - 1 && date.getUTCDate() === Number(day);
    return valid
        ? { value: `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, valid: true, original: value }
        : { value: "", valid: false, original: value };
}

function catalogueRateDisplay(value, rate) {
    const text = catalogueKey(value).replace(/[_-]+/g, " ");
    if (["show price", "show", "live", "price", "showprice"].includes(text)) return "show_price";
    if (["price on request", "por", "request", "priceonrequest"].includes(text)) return "price_on_request";
    if (["coming soon", "comingsoon"].includes(text)) return "coming_soon";
    if (["out of stock", "unavailable", "outofstock"].includes(text)) return "out_of_stock";
    return catalogueNumber(rate) != null ? "show_price" : "price_on_request";
}

function catalogueAction(value) {
    const text = catalogueKey(value);
    if (["delete", "remove"].includes(text)) return "delete";
    if (["ignore", "skip"].includes(text)) return "ignore";
    return "upsert";
}

function catalogueRowIdentity(row) {
    return [row.segment_name, row.category_name, row.product_name, row.grade_name, row.specification, row.size_thickness]
        .filter(Boolean).join(" / ") || `Excel row ${row.excel_row || "new"}`;
}

function catalogueError(row, field, problem, correction, value) {
    row.errors.push({ field, problem, correction, value });
}

function catalogueFormatError(row) {
    if (!row.errors?.length) return "";
    return row.errors.map((error) => {
        const valuePart = error.value !== undefined && error.value !== "" ? ` Entered value: “${String(error.value)}”.` : "";
        return `${error.problem}${valuePart} Correction: ${error.correction}`;
    }).join(" ");
}

function catalogueFindImageId(nameOrId, type, idValue = "") {
    if (idValue && state.admin.images.some((image) => image.image_id === idValue && image.image_type === type)) return idValue;
    const name = catalogueKey(nameOrId);
    if (!name) return "";
    return state.admin.images.find((image) => image.image_type === type && catalogueKey(image.image_name) === name)?.image_id || "";
}

function catalogueExistingMaps() {
    const segmentsById = new Map(state.admin.segments.map((item) => [item.segment_id, item]));
    const segmentsByName = new Map(state.admin.segments.map((item) => [catalogueKey(item.segment_name), item]));
    const categoriesById = new Map(state.admin.categories.map((item) => [item.category_id, item]));
    const categoriesByName = new Map(state.admin.categories.map((item) => [`${item.segment_id}|${catalogueKey(item.category_name)}`, item]));
    const productsById = new Map(state.admin.products.map((item) => [item.product_id, item]));
    const productsByName = new Map(state.admin.products.map((item) => [`${item.category_id}|${catalogueKey(item.product_name)}`, item]));
    const gradesById = new Map(state.admin.grades.map((item) => [item.grade_id, item]));
    const gradesByName = new Map(state.admin.grades.map((item) => [`${item.product_id}|${catalogueKey(item.grade_name)}`, item]));
    const pricingById = new Map(state.admin.pricing.map((item) => [item.pricing_id, item]));
    const pricingByNatural = new Map();
    state.admin.pricing.forEach((item) => {
        const key = `${item.product_id}|${item.grade_id}|${catalogueKey(item.specification)}|${catalogueKey(item.size_thickness)}|${catalogueKey(item.unit)}`;
        if (!pricingByNatural.has(key)) pricingByNatural.set(key, []);
        pricingByNatural.get(key).push(item);
    });
    return { segmentsById, segmentsByName, categoriesById, categoriesByName, productsById, productsByName, gradesById, gradesByName, pricingById, pricingByNatural };
}

function catalogueNormalizeRawRow(raw, index) {
    const dateResult = catalogueParseDate(raw["Rate Updated On"]);
    const row = {
        excel_row: Number(raw.__excel_row || index + 2),
        provided: {
            segment_active: Object.prototype.hasOwnProperty.call(raw, "Segment Active") && raw["Segment Active"] !== "",
            category_active: Object.prototype.hasOwnProperty.call(raw, "Category Active") && raw["Category Active"] !== "",
            product_description: Object.prototype.hasOwnProperty.call(raw, "Product Description") || Object.prototype.hasOwnProperty.call(raw, "Description"),
            product_active: Object.prototype.hasOwnProperty.call(raw, "Product Active") && raw["Product Active"] !== "",
            show_on_prices_enquiry: Object.prototype.hasOwnProperty.call(raw, "Show on Prices & Enquiry") && raw["Show on Prices & Enquiry"] !== "",
            show_on_home: (Object.prototype.hasOwnProperty.call(raw, "Show below Home Search") || Object.prototype.hasOwnProperty.call(raw, "Show on Home")) && (raw["Show below Home Search"] !== "" || raw["Show on Home"] !== ""),
            grade_active: Object.prototype.hasOwnProperty.call(raw, "Grade Active") && raw["Grade Active"] !== "",
            pricing_active: (Object.prototype.hasOwnProperty.call(raw, "Pricing Active") || Object.prototype.hasOwnProperty.call(raw, "Active")) && (raw["Pricing Active"] !== "" || raw["Active"] !== "")
        },
        selected: false,
        errors: [],
        issue: "",
        status: "unchanged",
        action: catalogueAction(raw["Action"]),
        segment_id: catalogueText(raw["Segment ID"]),
        segment_name: catalogueText(raw["Segment Name"] || raw["Product Segment"]),
        segment_display_order: raw["Segment Display Order"],
        segment_active: catalogueBoolean(raw["Segment Active"], true),
        segment_photo_image_id: catalogueText(raw["Segment Photo ID"]),
        segment_icon_image_id: catalogueText(raw["Segment Icon ID"]),
        category_id: catalogueText(raw["Category ID"]),
        category_name: catalogueText(raw["Category Name"] || raw["Product Category"] || raw["Category"]),
        category_display_order: raw["Category Display Order"],
        category_active: catalogueBoolean(raw["Category Active"], true),
        product_id: catalogueText(raw["Product ID"]),
        product_name: catalogueText(raw["Product Name"]),
        product_description: catalogueText(raw["Product Description"] || raw["Description"]),
        product_active: catalogueBoolean(raw["Product Active"], true),
        product_photo_image_id: catalogueText(raw["Product Photo ID"]),
        show_on_prices_enquiry: catalogueBoolean(raw["Show on Prices & Enquiry"], true),
        product_display_order: raw["Product Display Order"] ?? raw["Prices & Enquiry Display Order"],
        show_on_home: catalogueBoolean(raw["Show below Home Search"] ?? raw["Show on Home"], false),
        home_display_order: raw["Home Tile Position"],
        grade_id: catalogueText(raw["Grade ID"]),
        grade_name: catalogueText(raw["Grade Name"]),
        grade_display_order: raw["Grade Display Order"] ?? raw["Grade Order"],
        grade_active: catalogueBoolean(raw["Grade Active"], true),
        pricing_id: catalogueText(raw["Pricing ID"]),
        specification: catalogueText(raw["Specification"]),
        size_thickness: catalogueText(raw["Size / Thickness"]),
        unit: catalogueText(raw["Unit"]),
        rate: raw["Rate"] === "" || raw["Rate"] == null ? "" : raw["Rate"],
        rate_display: catalogueRateDisplay(raw["Price Display"] ?? raw["Rate Display"], raw["Rate"]),
        price_validity_days: raw["Price Validity Days"] === "" || raw["Price Validity Days"] == null ? 1 : raw["Price Validity Days"],
        rate_updated_on: dateResult.value,
        raw_rate_updated_on: dateResult.original,
        date_valid: dateResult.valid,
        remarks: catalogueText(raw["Remarks"]),
        pricing_display_order: raw["Pricing Display Order"] ?? raw["Display Order"],
        pricing_active: catalogueBoolean(raw["Pricing Active"] ?? raw["Active"], true)
    };
    row.snapshot = structuredClone(row);
    return row;
}

function catalogueRowHasContent(row) {
    return Boolean(row.segment_name || row.category_name || row.product_name || row.grade_name || row.pricing_id || row.specification || row.size_thickness || row.rate !== "");
}

function catalogueIsPricingRow(row) {
    return Boolean(row.pricing_id || row.specification || row.size_thickness || row.unit || row.rate !== "" || row.remarks || row.pricing_display_order);
}

function catalogueCompare(a, b) {
    if (typeof a === "boolean" || typeof b === "boolean") return Boolean(a) === Boolean(b);
    if ((a === "" || a == null) && (b === "" || b == null)) return true;
    if (!Number.isNaN(Number(a)) && !Number.isNaN(Number(b)) && String(a).trim() !== "" && String(b).trim() !== "") return Number(a) === Number(b);
    return catalogueText(a) === catalogueText(b);
}

function catalogueHydrateLegacyReferences(row, maps) {
    let pricing = row.pricing_id ? maps.pricingById.get(row.pricing_id) : null;
    if (pricing) {
        row.product_id ||= pricing.product_id || "";
        row.grade_id ||= pricing.grade_id || "";
    }

    // Legacy pricing exports may omit Product ID on newly added rate rows while
    // retaining Product Name + Category. Resolve a unique existing product first
    // so the user does not have to re-enter Segment/Category IDs or hierarchy data.
    if (!row.product_id && row.product_name) {
        const productNameKey = catalogueKey(row.product_name);
        const categoryNameKey = catalogueKey(row.category_name);
        const productMatches = state.admin.products.filter((candidate) => {
            if (catalogueKey(candidate.product_name) !== productNameKey) return false;
            if (!categoryNameKey) return true;
            const candidateCategory = maps.categoriesById.get(candidate.category_id);
            return catalogueKey(candidateCategory?.category_name) === categoryNameKey;
        });
        if (productMatches.length === 1) row.product_id = productMatches[0].product_id;
    }

    let grade = row.grade_id ? maps.gradesById.get(row.grade_id) : null;
    if (grade) {
        row.product_id ||= grade.product_id || "";
        row.grade_name ||= grade.grade_name || "";
        if (!cataloguePositiveInteger(row.grade_display_order)) row.grade_display_order = grade.display_order || 1;
        if (!row.provided?.grade_active) row.grade_active = grade.active !== false;
    }

    let product = row.product_id ? maps.productsById.get(row.product_id) : null;
    if (product) {
        row.category_id ||= product.category_id || "";
        row.segment_id ||= product.segment_id || "";
        row.product_name ||= product.product_name || "";
        if (!row.provided?.product_description && !row.product_description) row.product_description = product.description || "";
        if (!row.provided?.product_active) row.product_active = product.active !== false;
        if (!row.provided?.show_on_prices_enquiry) row.show_on_prices_enquiry = product.show_on_prices_enquiry === true;
        if (!cataloguePositiveInteger(row.product_display_order) && product.show_on_prices_enquiry) row.product_display_order = product.prices_enquiry_display_order || 1;
        if (!row.provided?.show_on_home) row.show_on_home = product.show_on_home === true;
        if (!cataloguePositiveInteger(row.home_display_order) && product.show_on_home) row.home_display_order = product.home_display_order || 1;
        row.product_photo_image_id ||= product.product_photo_image_id || "";
    }

    // A legacy row with a blank Grade ID may still refer to an existing grade.
    // Match only within the resolved product; otherwise it remains a new grade.
    if (!grade && row.product_id && row.grade_name) {
        grade = maps.gradesByName.get(`${row.product_id}|${catalogueKey(row.grade_name)}`) || null;
        if (grade) {
            row.grade_id = grade.grade_id;
            if (!cataloguePositiveInteger(row.grade_display_order)) row.grade_display_order = grade.display_order || 1;
            if (!row.provided?.grade_active) row.grade_active = grade.active !== false;
        }
    }

    // Category-only legacy rows can also be resolved when the category name is unique.
    if (!row.category_id && row.category_name) {
        const categoryMatches = state.admin.categories.filter((candidate) => catalogueKey(candidate.category_name) === catalogueKey(row.category_name));
        if (categoryMatches.length === 1) row.category_id = categoryMatches[0].category_id;
    }

    let category = row.category_id ? maps.categoriesById.get(row.category_id) : null;
    if (category) {
        row.segment_id ||= category.segment_id || "";
        row.category_name ||= category.category_name || "";
        if (!cataloguePositiveInteger(row.category_display_order)) row.category_display_order = category.display_order || 1;
        if (!row.provided?.category_active) row.category_active = category.active !== false;
    }
    let segment = row.segment_id ? maps.segmentsById.get(row.segment_id) : null;
    if (segment) {
        row.segment_name ||= segment.segment_name || "";
        if (!cataloguePositiveInteger(row.segment_display_order)) row.segment_display_order = segment.display_order || 1;
        if (!row.provided?.segment_active) row.segment_active = segment.active !== false;
        row.segment_photo_image_id ||= segment.segment_photo_image_id || "";
        row.segment_icon_image_id ||= segment.segment_icon_image_id || "";
    }
    if (pricing) {
        if (!row.specification) row.specification = pricing.specification || "";
        if (!row.size_thickness) row.size_thickness = pricing.size_thickness || "";
        if (!row.unit) row.unit = pricing.unit || "";
        if (row.rate === "" || row.rate == null) row.rate = pricing.rate == null ? "" : pricing.rate;
        if (!row.rate_display) row.rate_display = pricing.rate_display || "price_on_request";
        if (!cataloguePositiveInteger(row.price_validity_days)) row.price_validity_days = pricing.price_validity_days || 1;
        if (!row.rate_updated_on && row.date_valid) row.rate_updated_on = dateOnly(pricing.rate_updated_on);
        if (!row.remarks) row.remarks = pricing.remarks || "";
        if (!cataloguePositiveInteger(row.pricing_display_order)) row.pricing_display_order = pricing.display_order || 1;
        if (!row.provided?.pricing_active) row.pricing_active = pricing.active !== false;
    }
}

function catalogueValidateRow(row, maps) {
    catalogueHydrateLegacyReferences(row, maps);
    row.errors = [];
    row.issue = "";
    if (row.action === "ignore") {
        row.status = "ignore";
        return row;
    }

    if (!row.segment_name && !row.segment_id) {
        catalogueError(row, "segment_name", "A Product Segment has not been identified for this row.", "Enter the Segment Name, such as Mild Steel (MS).", row.segment_name);
    }
    let segment = row.segment_id ? maps.segmentsById.get(row.segment_id) : maps.segmentsByName.get(catalogueKey(row.segment_name));
    if (row.segment_id && !segment) catalogueError(row, "segment_id", "The hidden Segment ID does not exist in the database.", "Download a fresh Current Master and copy this row again, or clear the hidden ID and retain the correct Segment Name.", row.segment_id);
    if (segment) {
        row.segment_id = segment.segment_id;
        if (!row.segment_name) row.segment_name = segment.segment_name;
        row.segment_photo_image_id ||= segment.segment_photo_image_id || "";
        row.segment_icon_image_id ||= segment.segment_icon_image_id || "";
    }
    const segmentOrder = cataloguePositiveInteger(row.segment_display_order);
    if (!segmentOrder) catalogueError(row, "segment_display_order", `Segment Display Order is missing or invalid for “${row.segment_name || "this segment"}”.`, "Enter a positive whole number. Enter 1 for the segment you want to appear first, 2 for the next, and so on.", row.segment_display_order);
    else row.segment_display_order = segmentOrder;

    const requiresCategory = Boolean(row.category_name || row.category_id || row.product_name || row.product_id || row.grade_name || catalogueIsPricingRow(row));
    let category = null;
    if (requiresCategory) {
        if (!row.category_name && !row.category_id) catalogueError(row, "category_name", `The Category is blank for ${catalogueRowIdentity(row)}.`, "Enter the Category Name that sits under the selected Segment.", row.category_name);
        category = row.category_id ? maps.categoriesById.get(row.category_id) : (segment ? maps.categoriesByName.get(`${segment.segment_id}|${catalogueKey(row.category_name)}`) : null);
        if (row.category_id && !category) catalogueError(row, "category_id", "The hidden Category ID does not exist in the database.", "Download a fresh Current Master, or clear the hidden Category ID and retain the correct Segment and Category names.", row.category_id);
        if (category && segment && category.segment_id !== segment.segment_id) catalogueError(row, "category_name", `“${category.category_name}” is not assigned to Segment “${row.segment_name}”.`, "Select the correct Segment and Category combination.", row.category_name);
        if (category) {
            row.category_id = category.category_id;
            if (!row.category_name) row.category_name = category.category_name;
        }
        const categoryOrder = cataloguePositiveInteger(row.category_display_order);
        if (!categoryOrder) catalogueError(row, "category_display_order", `Category Display Order is missing or invalid for “${row.category_name || "this category"}”.`, "Enter a positive whole number showing its position within the selected Segment.", row.category_display_order);
        else row.category_display_order = categoryOrder;
    }

    const requiresProduct = Boolean(row.product_name || row.product_id || row.grade_name || row.grade_id || catalogueIsPricingRow(row));
    let product = null;
    if (requiresProduct) {
        if (!row.product_name && !row.product_id) catalogueError(row, "product_name", `The Product Name is blank for ${catalogueRowIdentity(row)}.`, "Enter the commercial Product Name, such as HR Sheets or HR Coils.", row.product_name);
        product = row.product_id ? maps.productsById.get(row.product_id) : (category ? maps.productsByName.get(`${category.category_id}|${catalogueKey(row.product_name)}`) : null);
        if (row.product_id && !product) catalogueError(row, "product_id", "The hidden Product ID does not exist in the database.", "Download a fresh Current Master, or clear the hidden Product ID and retain the correct hierarchy names.", row.product_id);
        if (product && category && product.category_id !== category.category_id) catalogueError(row, "product_name", `Product “${product.product_name}” is not assigned to Category “${row.category_name}”.`, "Select the correct Segment, Category and Product combination.", row.product_name);
        if (product) {
            row.product_id = product.product_id;
            if (!row.product_name) row.product_name = product.product_name;
            row.product_photo_image_id ||= product.product_photo_image_id || "";
        }
        if (row.show_on_prices_enquiry) {
            const order = cataloguePositiveInteger(row.product_display_order);
            if (!order) catalogueError(row, "product_display_order", `Product Display Order is required because “${row.product_name}” is visible on Prices & Enquiry.`, "Enter a positive whole number. Enter 1 for the product to be shown first.", row.product_display_order);
            else row.product_display_order = order;
        } else row.product_display_order = "";
        if (row.show_on_home) {
            if (!row.show_on_prices_enquiry) catalogueError(row, "show_on_home", `“${row.product_name}” is marked for the Home page but hidden from Prices & Enquiry.`, "Set Show on Prices & Enquiry to Yes, or set Show below Home Search to No.", "Yes");
            const order = cataloguePositiveInteger(row.home_display_order);
            if (!order || order > 8) catalogueError(row, "home_display_order", `Home Tile Position is invalid for “${row.product_name}”.`, "Enter a whole number from 1 to 8.", row.home_display_order);
            else row.home_display_order = order;
        } else row.home_display_order = "";
    }

    const requiresGrade = Boolean(row.grade_name || row.grade_id || catalogueIsPricingRow(row));
    let grade = null;
    if (requiresGrade) {
        if (!row.grade_name && !row.grade_id) catalogueError(row, "grade_name", `The Grade Name is blank for ${catalogueRowIdentity(row)}.`, "Enter the grade used for this price row, such as IS 2062 E250.", row.grade_name);
        grade = row.grade_id ? maps.gradesById.get(row.grade_id) : (product ? maps.gradesByName.get(`${product.product_id}|${catalogueKey(row.grade_name)}`) : null);
        if (row.grade_id && !grade) catalogueError(row, "grade_id", "The hidden Grade ID does not exist in the database.", "Download a fresh Current Master, or clear the hidden Grade ID and retain the correct Product and Grade names.", row.grade_id);
        if (grade && product && grade.product_id !== product.product_id) catalogueError(row, "grade_name", `Grade “${grade.grade_name}” is not assigned to Product “${row.product_name}”.`, "Select or enter a Grade assigned to the selected Product.", row.grade_name);
        if (grade) {
            row.grade_id = grade.grade_id;
            if (!row.grade_name) row.grade_name = grade.grade_name;
        }
        const gradeOrder = cataloguePositiveInteger(row.grade_display_order);
        if (!gradeOrder) catalogueError(row, "grade_display_order", `Grade Display Order is missing or invalid for “${row.grade_name || "this grade"}”.`, "Enter a positive whole number showing its position within the selected Product.", row.grade_display_order);
        else row.grade_display_order = gradeOrder;
    }

    const isPricing = catalogueIsPricingRow(row);
    let pricing = null;
    if (isPricing) {
        if (row.pricing_id) {
            pricing = maps.pricingById.get(row.pricing_id);
            if (!pricing) catalogueError(row, "pricing_id", "The hidden Pricing ID does not exist in the database.", "Download a fresh Current Master, or clear the hidden Pricing ID to create a new price row.", row.pricing_id);
        } else if (product && grade) {
            const naturalKey = `${product.product_id}|${grade.grade_id}|${catalogueKey(row.specification)}|${catalogueKey(row.size_thickness)}|${catalogueKey(row.unit)}`;
            const matches = maps.pricingByNatural.get(naturalKey) || [];
            if (matches.length === 1) {
                pricing = matches[0];
                row.pricing_id = pricing.pricing_id;
            } else if (matches.length > 1) {
                catalogueError(row, "pricing_id", `More than one existing price row matches ${catalogueRowIdentity(row)}.`, "Download the Current Master and preserve the hidden Pricing ID so the system knows exactly which row to update.", "");
            }
        }
        if (row.action === "delete") {
            if (!row.pricing_id) catalogueError(row, "action", "Delete was selected for a row that has no existing Pricing ID.", "Use Remove from Upload for a new row. Delete Existing is available only for a saved pricing row.", "Delete");
        } else {
            const pricingOrder = cataloguePositiveInteger(row.pricing_display_order);
            if (!pricingOrder) catalogueError(row, "pricing_display_order", `Pricing Display Order is missing or invalid for ${catalogueRowIdentity(row)}.`, "Enter a positive whole number showing where this rate appears within the Product.", row.pricing_display_order);
            else row.pricing_display_order = pricingOrder;
            const validity = cataloguePositiveInteger(row.price_validity_days);
            if (!validity) catalogueError(row, "price_validity_days", `Price Validity Days is invalid for ${catalogueRowIdentity(row)}.`, "Enter a positive whole number. The default is 1 day.", row.price_validity_days);
            else row.price_validity_days = validity;
            if (!row.date_valid) catalogueError(row, "rate_updated_on", `Rate Updated On is not a complete date for ${catalogueRowIdentity(row)}.`, "Enter DD-MM-YYYY, DD/MM/YYYY or YYYY-MM-DD. Example: 24-07-2026. You may also clear it and the upload date will be used.", row.raw_rate_updated_on);
            if (!row.rate_updated_on) row.rate_updated_on = catalogueToday();
            row.rate = row.rate === "" ? "" : catalogueNumber(row.rate);
            if (row.rate_display === "show_price") {
                if (row.rate == null || row.rate === "") catalogueError(row, "rate", `A live price is selected but Rate is blank for ${catalogueRowIdentity(row)}.`, "Enter the numeric rate, or change Price Display to Price on Request.", row.rate);
                if (!row.unit) catalogueError(row, "unit", `A live price is selected but Unit is blank for ${catalogueRowIdentity(row)}.`, "Select a unit such as MT, Kg, Piece, Metre, Sheet or Coil.", row.unit);
            }
        }
    } else if (row.action === "delete") {
        catalogueError(row, "action", "Delete Existing is available only for pricing records in this master.", "Set the hierarchy record to Active = No, or use the Advanced Catalogue Tools after checking dependencies.", "Delete");
    }

    row.segment_record = segment || null;
    row.category_record = category || null;
    row.product_record = product || null;
    row.grade_record = grade || null;
    row.pricing_record = pricing || null;

    if (row.errors.length) {
        row.status = "error";
        row.issue = catalogueFormatError(row);
        return row;
    }
    if (row.action === "delete") {
        row.status = "delete";
        row.issue = `This will permanently delete the existing pricing row after final confirmation. Omitting a row from Excel never deletes it.`;
        return row;
    }

    const hasNew = (!segment && row.segment_name) || (requiresCategory && !category) || (requiresProduct && !product) || (requiresGrade && !grade) || (isPricing && !pricing);
    if (hasNew) {
        row.status = "new";
        row.issue = "Ready to create the missing hierarchy and/or pricing record in one transaction.";
        return row;
    }

    let changed = false;
    if (segment) changed ||= !catalogueCompare(row.segment_name, segment.segment_name) || !catalogueCompare(row.segment_display_order, segment.display_order) || row.segment_active !== (segment.active !== false);
    if (category) changed ||= !catalogueCompare(row.category_name, category.category_name) || !catalogueCompare(row.category_display_order, category.display_order || 1) || row.category_active !== (category.active !== false);
    if (product) changed ||= !catalogueCompare(row.product_name, product.product_name) || !catalogueCompare(row.product_description, product.description) || row.product_active !== (product.active !== false) || row.show_on_prices_enquiry !== (product.show_on_prices_enquiry === true) || !catalogueCompare(row.product_display_order, product.prices_enquiry_display_order) || row.show_on_home !== (product.show_on_home === true) || !catalogueCompare(row.home_display_order, product.home_display_order);
    if (grade) changed ||= !catalogueCompare(row.grade_name, grade.grade_name) || !catalogueCompare(row.grade_display_order, grade.display_order) || row.grade_active !== (grade.active !== false);
    if (pricing) changed ||= !catalogueCompare(row.specification, pricing.specification) || !catalogueCompare(row.size_thickness, pricing.size_thickness) || !catalogueCompare(row.unit, pricing.unit) || !catalogueCompare(row.rate, pricing.rate) || row.rate_display !== pricing.rate_display || !catalogueCompare(row.price_validity_days, pricing.price_validity_days || 1) || !catalogueCompare(row.rate_updated_on, dateOnly(pricing.rate_updated_on)) || !catalogueCompare(row.remarks, pricing.remarks) || !catalogueCompare(row.pricing_display_order, pricing.display_order) || row.pricing_active !== (pricing.active !== false);
    row.status = changed ? "update" : "unchanged";
    row.issue = changed ? "Existing record will be updated." : "No database change detected.";
    return row;
}

function catalogueValidateConsistency(rows) {
    const groups = [
        { key: (r) => catalogueKey(r.segment_name), fields: ["segment_display_order", "segment_active"], label: "Segment" },
        { key: (r) => `${catalogueKey(r.segment_name)}|${catalogueKey(r.category_name)}`, fields: ["category_display_order", "category_active"], label: "Category" },
        { key: (r) => `${catalogueKey(r.segment_name)}|${catalogueKey(r.category_name)}|${catalogueKey(r.product_name)}`, fields: ["product_description", "product_active", "show_on_prices_enquiry", "product_display_order", "show_on_home", "home_display_order"], label: "Product" },
        { key: (r) => `${catalogueKey(r.segment_name)}|${catalogueKey(r.category_name)}|${catalogueKey(r.product_name)}|${catalogueKey(r.grade_name)}`, fields: ["grade_display_order", "grade_active"], label: "Grade" }
    ];
    groups.forEach((group) => {
        const seen = new Map();
        rows.filter((row) => row.action !== "ignore" && row.status !== "error").forEach((row) => {
            const key = group.key(row);
            if (!key || key.endsWith("|")) return;
            if (!seen.has(key)) {
                seen.set(key, row);
                return;
            }
            const first = seen.get(key);
            group.fields.forEach((field) => {
                if (!catalogueCompare(first[field], row[field])) {
                    const label = CATALOGUE_VISIBLE_FIELDS[field] || field;
                    const message = `${group.label} information conflicts between Excel rows ${first.excel_row} and ${row.excel_row}: ${label} is “${first[field]}” in one row and “${row[field]}” in the other.`;
                    const correction = `Use one consistent ${label} for every repeated ${group.label} record.`;
                    catalogueError(first, field, message, correction, first[field]);
                    catalogueError(row, field, message, correction, row[field]);
                }
            });
        });
    });
    rows.forEach((row) => {
        if (row.errors?.length) {
            row.status = "error";
            row.issue = catalogueFormatError(row);
        }
    });
}

function catalogueValidateOrderCollisions(rows) {
    const configs = [
        {
            label: "Segment Display Order", field: "segment_display_order",
            entityKey: (row) => row.segment_id || catalogueKey(row.segment_name),
            parentKey: () => "all-segments", entityLabel: (row) => row.segment_name,
            applies: (row) => Boolean(row.segment_name && row.segment_active)
        },
        {
            label: "Category Display Order", field: "category_display_order",
            entityKey: (row) => row.category_id || `${catalogueKey(row.segment_name)}|${catalogueKey(row.category_name)}`,
            parentKey: (row) => row.segment_id || catalogueKey(row.segment_name), entityLabel: (row) => row.category_name,
            applies: (row) => Boolean(row.category_name && row.category_active)
        },
        {
            label: "Product Display Order", field: "product_display_order",
            entityKey: (row) => row.product_id || `${catalogueKey(row.segment_name)}|${catalogueKey(row.category_name)}|${catalogueKey(row.product_name)}`,
            parentKey: () => "prices-page", entityLabel: (row) => row.product_name,
            applies: (row) => Boolean(row.product_name && row.product_active && row.show_on_prices_enquiry)
        },
        {
            label: "Home Tile Position", field: "home_display_order",
            entityKey: (row) => row.product_id || `${catalogueKey(row.segment_name)}|${catalogueKey(row.category_name)}|${catalogueKey(row.product_name)}`,
            parentKey: () => "home-page", entityLabel: (row) => row.product_name,
            applies: (row) => Boolean(row.product_name && row.product_active && row.show_on_home)
        },
        {
            label: "Grade Display Order", field: "grade_display_order",
            entityKey: (row) => row.grade_id || `${catalogueKey(row.product_name)}|${catalogueKey(row.grade_name)}`,
            parentKey: (row) => row.product_id || `${catalogueKey(row.segment_name)}|${catalogueKey(row.category_name)}|${catalogueKey(row.product_name)}`,
            entityLabel: (row) => row.grade_name,
            applies: (row) => Boolean(row.grade_name && row.grade_active)
        },
        {
            label: "Pricing Display Order", field: "pricing_display_order",
            entityKey: (row) => row.pricing_id || `${catalogueKey(row.product_name)}|${catalogueKey(row.grade_name)}|${catalogueKey(row.specification)}|${catalogueKey(row.size_thickness)}|${catalogueKey(row.unit)}`,
            parentKey: (row) => row.product_id || `${catalogueKey(row.segment_name)}|${catalogueKey(row.category_name)}|${catalogueKey(row.product_name)}`,
            entityLabel: (row) => [row.grade_name, row.specification, row.size_thickness].filter(Boolean).join(" / ") || "Price row",
            applies: (row) => Boolean(catalogueIsPricingRow(row) && row.pricing_active && row.action !== "delete")
        }
    ];

    configs.forEach((config) => {
        const entities = new Map();
        rows.filter((row) => row.action !== "ignore" && row.status !== "error" && config.applies(row)).forEach((row) => {
            const order = cataloguePositiveInteger(row[config.field]);
            const entityKey = config.entityKey(row);
            if (!order || !entityKey) return;
            if (!entities.has(entityKey)) entities.set(entityKey, { order, parent: config.parentKey(row), label: config.entityLabel(row), rows: [] });
            entities.get(entityKey).rows.push(row);
        });
        const occupied = new Map();
        entities.forEach((entity, entityKey) => {
            const slot = `${entity.parent}|${entity.order}`;
            if (!occupied.has(slot)) {
                occupied.set(slot, { entityKey, entity });
                return;
            }
            const first = occupied.get(slot);
            if (first.entityKey === entityKey) return;
            const message = `${config.label} ${entity.order} is assigned to both “${first.entity.label}” and “${entity.label}”.`;
            const correction = `Enter different positive whole numbers. The record with the lower number appears first.`;
            [...first.entity.rows, ...entity.rows].forEach((row) => catalogueError(row, config.field, message, correction, entity.order));
        });
    });

    rows.forEach((row) => {
        if (row.errors?.length) {
            row.status = "error";
            row.issue = catalogueFormatError(row);
        }
    });
}

function validateCatalogueRows(rows = state.admin.catalogueImport.rows) {
    const maps = catalogueExistingMaps();
    rows.forEach((row) => catalogueValidateRow(row, maps));
    catalogueValidateConsistency(rows);
    catalogueValidateOrderCollisions(rows);
    state.admin.catalogueImport.validated = true;
    updateCatalogueSummary();
    renderCatalogueReview();
    return rows;
}

function catalogueExcelRow(row) {
    return {
        "Segment Name": row.segment_name || "",
        "Segment Display Order": row.segment_display_order || "",
        "Segment Active": catalogueYesNo(row.segment_active),
        "Category Name": row.category_name || "",
        "Category Display Order": row.category_display_order || "",
        "Category Active": catalogueYesNo(row.category_active),
        "Product Name": row.product_name || "",
        "Product Description": row.product_description || "",
        "Product Active": catalogueYesNo(row.product_active),
        "Show on Prices & Enquiry": catalogueYesNo(row.show_on_prices_enquiry),
        "Product Display Order": row.product_display_order || "",
        "Show below Home Search": catalogueYesNo(row.show_on_home),
        "Home Tile Position": row.home_display_order || "",
        "Grade Name": row.grade_name || "",
        "Grade Display Order": row.grade_display_order || "",
        "Grade Active": catalogueYesNo(row.grade_active),
        "Specification": row.specification || "",
        "Size / Thickness": row.size_thickness || "",
        "Unit": row.unit || "",
        "Rate": row.rate === "" || row.rate == null ? "" : row.rate,
        "Price Display": CATALOGUE_RATE_DISPLAY_LABELS[row.rate_display] || "Price on Request",
        "Price Validity Days": row.price_validity_days || 1,
        "Rate Updated On": row.rate_updated_on || "",
        "Remarks": row.remarks || "",
        "Pricing Display Order": row.pricing_display_order || "",
        "Pricing Active": catalogueYesNo(row.pricing_active),
        "Action": row.action === "delete" ? "Delete" : row.action === "ignore" ? "Ignore" : "Upsert",
        "Segment ID": row.segment_id || "",
        "Category ID": row.category_id || "",
        "Product ID": row.product_id || "",
        "Grade ID": row.grade_id || "",
        "Pricing ID": row.pricing_id || "",
        "Segment Photo ID": row.segment_photo_image_id || "",
        "Segment Icon ID": row.segment_icon_image_id || "",
        "Product Photo ID": row.product_photo_image_id || ""
    };
}

function buildCatalogueMasterRows() {
    const rows = [];
    const segments = [...state.admin.segments].sort((a, b) => Number(a.display_order || 9999) - Number(b.display_order || 9999) || String(a.segment_name).localeCompare(String(b.segment_name)));
    segments.forEach((segment) => {
        const categories = state.admin.categories.filter((category) => category.segment_id === segment.segment_id).sort((a, b) => Number(a.display_order || 9999) - Number(b.display_order || 9999) || String(a.category_name).localeCompare(String(b.category_name)));
        if (!categories.length) {
            rows.push(catalogueExcelRow(catalogueNormalizeRawRow({
                "Segment ID": segment.segment_id, "Segment Name": segment.segment_name, "Segment Display Order": segment.display_order,
                "Segment Active": catalogueYesNo(segment.active), "Segment Photo ID": segment.segment_photo_image_id || "", "Segment Icon ID": segment.segment_icon_image_id || ""
            }, rows.length)));
            return;
        }
        categories.forEach((category) => {
            const products = state.admin.products.filter((product) => product.category_id === category.category_id).sort((a, b) => Number(a.prices_enquiry_display_order || 9999) - Number(b.prices_enquiry_display_order || 9999) || String(a.product_name).localeCompare(String(b.product_name)));
            const base = {
                "Segment ID": segment.segment_id, "Segment Name": segment.segment_name, "Segment Display Order": segment.display_order, "Segment Active": catalogueYesNo(segment.active), "Segment Photo ID": segment.segment_photo_image_id || "", "Segment Icon ID": segment.segment_icon_image_id || "",
                "Category ID": category.category_id, "Category Name": category.category_name, "Category Display Order": category.display_order || 1, "Category Active": catalogueYesNo(category.active)
            };
            if (!products.length) {
                rows.push(catalogueExcelRow(catalogueNormalizeRawRow(base, rows.length)));
                return;
            }
            products.forEach((product) => {
                const productBase = {
                    ...base,
                    "Product ID": product.product_id, "Product Name": product.product_name, "Product Description": product.description || "", "Product Active": catalogueYesNo(product.active), "Product Photo ID": product.product_photo_image_id || "",
                    "Show on Prices & Enquiry": catalogueYesNo(product.show_on_prices_enquiry), "Product Display Order": product.prices_enquiry_display_order || "", "Show below Home Search": catalogueYesNo(product.show_on_home), "Home Tile Position": product.home_display_order || ""
                };
                const grades = state.admin.grades.filter((grade) => grade.product_id === product.product_id).sort((a, b) => Number(a.display_order || 9999) - Number(b.display_order || 9999) || String(a.grade_name).localeCompare(String(b.grade_name)));
                if (!grades.length) {
                    rows.push(catalogueExcelRow(catalogueNormalizeRawRow(productBase, rows.length)));
                    return;
                }
                grades.forEach((grade) => {
                    const gradeBase = { ...productBase, "Grade ID": grade.grade_id, "Grade Name": grade.grade_name, "Grade Display Order": grade.display_order, "Grade Active": catalogueYesNo(grade.active) };
                    const pricingRows = state.admin.pricing.filter((pricing) => pricing.product_id === product.product_id && pricing.grade_id === grade.grade_id).sort((a, b) => Number(a.display_order || 9999) - Number(b.display_order || 9999));
                    if (!pricingRows.length) {
                        rows.push(catalogueExcelRow(catalogueNormalizeRawRow(gradeBase, rows.length)));
                        return;
                    }
                    pricingRows.forEach((pricing) => rows.push(catalogueExcelRow(catalogueNormalizeRawRow({
                        ...gradeBase,
                        "Pricing ID": pricing.pricing_id, "Specification": pricing.specification || "", "Size / Thickness": pricing.size_thickness || "", "Unit": pricing.unit || "", "Rate": pricing.rate == null ? "" : pricing.rate,
                        "Price Display": CATALOGUE_RATE_DISPLAY_LABELS[pricing.rate_display] || "Price on Request", "Price Validity Days": pricing.price_validity_days || 1, "Rate Updated On": dateOnly(pricing.rate_updated_on), "Remarks": pricing.remarks || "", "Pricing Display Order": pricing.display_order, "Pricing Active": catalogueYesNo(pricing.active)
                    }, rows.length))));
                });
            });
        });
    });
    return rows;
}

function catalogueInstructionsRows() {
    return [
        ["BCSPL Catalogue & Pricing Master — V2.2.0"],
        ["Purpose", "Manage Segment, Category, Product, Grade and Pricing from one workbook."],
        ["Normal workflow", "Download Current Master → edit existing rows or add new rows → upload → review/edit in HTML → Revalidate → Save All Valid Changes."],
        ["Display order", "Display order is controlled by you. Use positive whole numbers. Lower numbers appear first."],
        ["Price validity", "New price rows default to 1 day. You may enter another positive whole number."],
        ["New records", "Leave hidden System ID columns blank. Enter the hierarchy names and display orders; the database creates the missing records."],
        ["Existing records", "Do not unhide or change System ID columns. They allow safe updates even when a name changes."],
        ["Deletion", "Omitting a row never deletes it. Use Action = Delete only for an existing pricing row, then confirm in the HTML review."],
        ["Dates", "Use DD-MM-YYYY, DD/MM/YYYY or YYYY-MM-DD. Excel dates are converted automatically. Blank uses the upload date."],
        ["Price Display", "Use Show Price, Price on Request, Coming Soon or Out of Stock."],
        ["Active fields", "Use Yes or No."],
        ["Important", "Repeated Segment, Category, Product or Grade details must be consistent across all rows."],
        ["System columns", "Columns to the far right are hidden and protected for database matching. Do not delete them from an exported master."],
        ["Support", "The upload review explains the affected product/grade, what is wrong, and how to correct it." ]
    ];
}

function makeCatalogueWorkbook(rows, fileName) {
    if (!window.XLSX) {
        alert("Excel library not loaded. Please refresh the page and try again.");
        return;
    }
    const workbook = XLSX.utils.book_new();
    const instructionSheet = XLSX.utils.aoa_to_sheet(catalogueInstructionsRows());
    instructionSheet["!cols"] = [{ wch: 24 }, { wch: 105 }];
    instructionSheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }];
    const masterSheet = XLSX.utils.json_to_sheet(rows.length ? rows : [Object.fromEntries(CATALOGUE_MASTER_HEADERS.map((header) => [header, ""]))], { header: CATALOGUE_MASTER_HEADERS });
    masterSheet["!autofilter"] = { ref: `A1:${XLSX.utils.encode_col(CATALOGUE_MASTER_HEADERS.length - 1)}${Math.max(2, rows.length + 1)}` };
    masterSheet["!freeze"] = { xSplit: 0, ySplit: 1, topLeftCell: "A2", activePane: "bottomLeft", state: "frozen" };
    masterSheet["!cols"] = CATALOGUE_MASTER_HEADERS.map((header) => {
        const hidden = / ID$/.test(header);
        const widths = {
            "Segment Name": 22, "Category Name": 22, "Product Name": 26, "Product Description": 38, "Grade Name": 24,
            "Specification": 25, "Size / Thickness": 24, "Remarks": 32, "Rate Updated On": 17, "Price Display": 20,
            "Show on Prices & Enquiry": 24, "Show below Home Search": 24
        };
        return { wch: widths[header] || (hidden ? 38 : 16), hidden };
    });
    const referenceRows = [
        ["Yes / No", "Price Display", "Unit", "Action"],
        ["Yes", "Show Price", "MT", "Upsert"],
        ["No", "Price on Request", "Kg", "Delete"],
        ["", "Coming Soon", "Piece", "Ignore"],
        ["", "Out of Stock", "Metre", ""],
        ["", "", "Sheet", ""],
        ["", "", "Coil", ""]
    ];
    const referenceSheet = XLSX.utils.aoa_to_sheet(referenceRows);
    referenceSheet["!cols"] = [{ wch: 18 }, { wch: 24 }, { wch: 18 }, { wch: 18 }];
    XLSX.utils.book_append_sheet(workbook, instructionSheet, "Instructions");
    XLSX.utils.book_append_sheet(workbook, masterSheet, "Catalogue_Pricing_Master");
    XLSX.utils.book_append_sheet(workbook, referenceSheet, "Reference_Lists");
    if (!workbook.Workbook) workbook.Workbook = {};
    workbook.Workbook.Sheets = workbook.SheetNames.map((name, index) => ({ name, Hidden: index === 2 ? 1 : 0 }));
    XLSX.writeFile(workbook, fileName);
}

function downloadCurrentCatalogueMaster() {
    const rows = buildCatalogueMasterRows();
    if (!rows.length) {
        alert("No catalogue records are available to export.");
        return;
    }
    makeCatalogueWorkbook(rows, `bcspl-catalogue-pricing-master-${catalogueToday()}.xlsx`);
}

function downloadBlankCatalogueTemplate() {
    const blank = catalogueExcelRow(catalogueNormalizeRawRow({
        "Segment Active": "Yes", "Category Active": "Yes", "Product Active": "Yes", "Show on Prices & Enquiry": "Yes",
        "Show below Home Search": "No", "Grade Active": "Yes", "Price Display": "Price on Request", "Price Validity Days": 1,
        "Pricing Active": "Yes", "Action": "Upsert"
    }, 0));
    makeCatalogueWorkbook([blank], "bcspl-catalogue-pricing-master-template-v2.2.0.xlsx");
}

async function parseCatalogueMasterFile(file) {
    if (!window.XLSX) throw new Error("Excel library did not load. Refresh the page and try again.");
    const extension = file.name.toLowerCase().split(".").pop();
    const buffer = await file.arrayBuffer();
    let rawRows = [];
    if (["xlsx", "xls"].includes(extension)) {
        const workbook = XLSX.read(new Uint8Array(buffer), { type: "array", cellDates: true });
        const sheetName = workbook.SheetNames.find((name) => catalogueKey(name).includes("catalogue") && catalogueKey(name).includes("pricing"))
            || workbook.SheetNames.find((name) => !catalogueKey(name).includes("instruction") && !catalogueKey(name).includes("reference"))
            || workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        rawRows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: true });
    } else {
        const text = new TextDecoder().decode(buffer);
        const workbook = XLSX.read(text, { type: "string" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        rawRows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: true });
    }
    if (!Array.isArray(rawRows) || !rawRows.length) throw new Error("The selected workbook does not contain any data rows in Catalogue_Pricing_Master.");
    return rawRows.map((raw, index) => catalogueNormalizeRawRow(raw, index)).filter(catalogueRowHasContent);
}

function catalogueStatusPill(status) {
    return `<span class="catalogue-result-pill ${escapeHtml(status)}">${escapeHtml(CATALOGUE_IMPORT_STATUS_LABELS[status] || status)}</span>`;
}

function catalogueInput(rowIndex, field, type = "text", options = "") {
    const row = state.admin.catalogueImport.rows[rowIndex];
    const value = row?.[field];
    const hasError = row?.errors?.some((error) => error.field === field);
    const cls = hasError ? "catalogue-input-error" : "";
    if (type === "checkbox") return `<input class="${cls}" type="checkbox" data-catalogue-field="${field}" ${value === true ? "checked" : ""}>`;
    if (type === "select") return `<select class="${cls}" data-catalogue-field="${field}">${options}</select>`;
    if (type === "textarea") return `<textarea class="${cls}" data-catalogue-field="${field}">${escapeHtml(value || "")}</textarea>`;
    const inputType = type === "number" ? "number" : type === "date" ? "date" : "text";
    const step = field === "rate" ? ' step="0.01"' : type === "number" ? ' step="1" min="1"' : "";
    return `<input class="${cls}" type="${inputType}" data-catalogue-field="${field}" value="${escapeHtml(value ?? "")}"${step}>`;
}

function catalogueSelectOptions(values, selected, labels = {}) {
    return values.map((value) => `<option value="${escapeHtml(value)}" ${String(selected) === String(value) ? "selected" : ""}>${escapeHtml(labels[value] || value)}</option>`).join("");
}

function catalogueVisibleRows() {
    const filters = state.admin.catalogueImport.filters;
    return state.admin.catalogueImport.rows.map((row, index) => ({ row, index })).filter(({ row }) => {
        if (filters.status !== "all" && row.status !== filters.status) return false;
        if (filters.segment !== "all" && catalogueKey(row.segment_name) !== filters.segment) return false;
        if (filters.product && !catalogueKey(row.product_name).includes(catalogueKey(filters.product))) return false;
        const search = catalogueKey(filters.text);
        if (search && !catalogueKey([row.segment_name, row.category_name, row.product_name, row.grade_name, row.specification, row.size_thickness, row.remarks].join(" ")).includes(search)) return false;
        return true;
    });
}

function renderCatalogueReview() {
    const tbody = document.getElementById("catalogueReviewRows");
    if (!tbody) return;
    const visible = catalogueVisibleRows();
    if (!state.admin.catalogueImport.rows.length) {
        tbody.innerHTML = '<tr><td colspan="32" class="catalogue-empty-state">No workbook uploaded.</td></tr>';
        return;
    }
    if (!visible.length) {
        tbody.innerHTML = '<tr><td colspan="32" class="catalogue-empty-state">No rows match the selected filters.</td></tr>';
        return;
    }
    tbody.innerHTML = visible.map(({ row, index }) => {
        const booleanOptions = catalogueSelectOptions([true, false], row.segment_active, { true: "Yes", false: "No" });
        const categoryBooleanOptions = catalogueSelectOptions([true, false], row.category_active, { true: "Yes", false: "No" });
        const productBooleanOptions = catalogueSelectOptions([true, false], row.product_active, { true: "Yes", false: "No" });
        const pricesBooleanOptions = catalogueSelectOptions([true, false], row.show_on_prices_enquiry, { true: "Yes", false: "No" });
        const homeBooleanOptions = catalogueSelectOptions([true, false], row.show_on_home, { true: "Yes", false: "No" });
        const gradeBooleanOptions = catalogueSelectOptions([true, false], row.grade_active, { true: "Yes", false: "No" });
        const pricingBooleanOptions = catalogueSelectOptions([true, false], row.pricing_active, { true: "Yes", false: "No" });
        const rateOptions = catalogueSelectOptions(Object.keys(CATALOGUE_RATE_DISPLAY_LABELS), row.rate_display, CATALOGUE_RATE_DISPLAY_LABELS);
        const actionOptions = catalogueSelectOptions(["upsert", "delete", "ignore"], row.action, { upsert: "Upsert", delete: "Delete Existing Price", ignore: "Ignore Row" });
        return `<tr data-catalogue-index="${index}" class="catalogue-row-${escapeHtml(row.status)}">
            <td><input type="checkbox" data-catalogue-select ${row.selected ? "checked" : ""}></td>
            <td>${escapeHtml(row.excel_row || index + 2)}</td>
            <td>${catalogueStatusPill(row.status)}</td>
            <td>${catalogueInput(index, "segment_name")}</td>
            <td>${catalogueInput(index, "segment_display_order", "number")}</td>
            <td>${catalogueInput(index, "segment_active", "select", booleanOptions)}</td>
            <td>${catalogueInput(index, "category_name")}</td>
            <td>${catalogueInput(index, "category_display_order", "number")}</td>
            <td>${catalogueInput(index, "category_active", "select", categoryBooleanOptions)}</td>
            <td>${catalogueInput(index, "product_name")}</td>
            <td>${catalogueInput(index, "product_description", "textarea")}</td>
            <td>${catalogueInput(index, "product_active", "select", productBooleanOptions)}</td>
            <td>${catalogueInput(index, "show_on_prices_enquiry", "select", pricesBooleanOptions)}</td>
            <td>${catalogueInput(index, "product_display_order", "number")}</td>
            <td>${catalogueInput(index, "show_on_home", "select", homeBooleanOptions)}</td>
            <td>${catalogueInput(index, "home_display_order", "number")}</td>
            <td>${catalogueInput(index, "grade_name")}</td>
            <td>${catalogueInput(index, "grade_display_order", "number")}</td>
            <td>${catalogueInput(index, "grade_active", "select", gradeBooleanOptions)}</td>
            <td>${catalogueInput(index, "specification")}</td>
            <td>${catalogueInput(index, "size_thickness")}</td>
            <td>${catalogueInput(index, "unit")}</td>
            <td>${catalogueInput(index, "rate", "number")}</td>
            <td>${catalogueInput(index, "rate_display", "select", rateOptions)}</td>
            <td>${catalogueInput(index, "price_validity_days", "number")}</td>
            <td>${catalogueInput(index, "rate_updated_on", "date")}</td>
            <td>${catalogueInput(index, "remarks", "textarea")}</td>
            <td>${catalogueInput(index, "pricing_display_order", "number")}</td>
            <td>${catalogueInput(index, "pricing_active", "select", pricingBooleanOptions)}</td>
            <td>${catalogueInput(index, "action", "select", actionOptions)}</td>
            <td class="catalogue-issue-cell">${escapeHtml(row.issue || "Not validated")}</td>
            <td class="catalogue-actions-cell"><div class="catalogue-row-actions"><button type="button" data-catalogue-action="validate">Save / Validate Row</button><button type="button" data-catalogue-action="cancel">Cancel Row Changes</button><button type="button" class="danger" data-catalogue-action="remove">Remove from Upload</button></div></td>
        </tr>`;
    }).join("");
    const selectAll = document.getElementById("selectAllCatalogueRows");
    if (selectAll) {
        const selected = visible.filter(({ row }) => row.selected).length;
        selectAll.checked = visible.length > 0 && selected === visible.length;
        selectAll.indeterminate = selected > 0 && selected < visible.length;
    }
}

function updateCatalogueSummary() {
    const rows = state.admin.catalogueImport.rows;
    const counts = { error: 0, new: 0, update: 0, unchanged: 0, delete: 0, ignore: 0 };
    rows.forEach((row) => { counts[row.status] = (counts[row.status] || 0) + 1; });
    const hierarchyNew = rows.filter((row) => row.status === "new" && (!row.segment_id || (row.category_name && !row.category_id) || (row.product_name && !row.product_id) || (row.grade_name && !row.grade_id))).length;
    const newPrices = rows.filter((row) => row.status === "new" && catalogueIsPricingRow(row) && !row.pricing_id).length;
    const set = (id, value) => { const element = document.getElementById(id); if (element) element.textContent = String(value); };
    set("catalogueSummaryHierarchy", hierarchyNew);
    set("catalogueSummaryNewPricing", newPrices);
    set("catalogueSummaryUpdates", counts.update);
    set("catalogueSummaryUnchanged", counts.unchanged);
    set("catalogueSummaryDeletes", counts.delete);
    set("catalogueSummaryErrors", counts.error);
    const status = document.getElementById("catalogueImportStatus");
    if (status) status.textContent = !rows.length ? "No upload" : counts.error ? `${counts.error} row(s) need attention` : state.admin.catalogueImport.validated ? "Ready to save" : "Not validated";
    populateCatalogueSegmentFilter();
}

function setCatalogueMessage(message, type = "") {
    const element = document.getElementById("catalogueReviewMessage");
    if (!element) return;
    element.textContent = message;
    element.className = `catalogue-review-message${type ? ` is-${type}` : ""}`;
}

function populateCatalogueSegmentFilter() {
    const select = document.getElementById("catalogueReviewSegmentFilter");
    if (!select) return;
    const selected = state.admin.catalogueImport.filters.segment;
    const names = [...new Set(state.admin.catalogueImport.rows.map((row) => row.segment_name).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    select.innerHTML = '<option value="all">All segments</option>' + names.map((name) => `<option value="${escapeHtml(catalogueKey(name))}">${escapeHtml(name)}</option>`).join("");
    select.value = names.some((name) => catalogueKey(name) === selected) ? selected : "all";
}

function syncCatalogueRowFromElement(target) {
    const tr = target.closest("tr[data-catalogue-index]");
    const index = Number(tr?.dataset.catalogueIndex);
    const field = target.dataset.catalogueField;
    const row = state.admin.catalogueImport.rows[index];
    if (!row || !field) return;
    let value = target.type === "checkbox" ? target.checked : target.value;
    if (["segment_active", "category_active", "product_active", "show_on_prices_enquiry", "show_on_home", "grade_active", "pricing_active"].includes(field)) value = String(value) === "true";
    row[field] = value;
    if (field === "rate_updated_on") { row.date_valid = true; row.raw_rate_updated_on = value; }
    state.admin.catalogueImport.validated = false;
    row.status = row.action === "ignore" ? "ignore" : "update";
    row.issue = "Row changed in the review window. Select Save / Validate Row or Revalidate before final save.";
    updateCatalogueSummary();
}

function addCatalogueReviewRow() {
    const rows = state.admin.catalogueImport.rows;
    const raw = {
        "Segment Active": "Yes", "Category Active": "Yes", "Product Active": "Yes", "Show on Prices & Enquiry": "Yes", "Show below Home Search": "No",
        "Grade Active": "Yes", "Price Display": "Price on Request", "Price Validity Days": 1, "Rate Updated On": catalogueToday(), "Pricing Active": "Yes", "Action": "Upsert"
    };
    const row = catalogueNormalizeRawRow(raw, rows.length);
    row.excel_row = `New ${rows.length + 1}`;
    row.status = "new";
    row.issue = "Enter the required hierarchy and display-order fields, then validate this row.";
    row.snapshot = structuredClone(row);
    rows.unshift(row);
    state.admin.catalogueImport.sourceName ||= "Manual HTML entry";
    state.admin.catalogueImport.validated = false;
    document.getElementById("catalogueImportFileBar")?.removeAttribute("hidden");
    const name = document.getElementById("catalogueImportFileName"); if (name) name.textContent = state.admin.catalogueImport.sourceName;
    updateCatalogueSummary();
    renderCatalogueReview();
}

function removeCatalogueIndexes(indexes) {
    if (!indexes.length) return;
    indexes.sort((a, b) => b - a).forEach((index) => state.admin.catalogueImport.rows.splice(index, 1));
    state.admin.catalogueImport.validated = false;
    updateCatalogueSummary();
    renderCatalogueReview();
}

function cancelCatalogueUpload() {
    if (state.admin.catalogueImport.rows.length && !confirm("Cancel this complete upload and discard all review edits?")) return;
    state.admin.catalogueImport = { rows: [], sourceName: "", validated: false, filters: { status: "all", segment: "all", product: "", text: "" } };
    document.getElementById("catalogueImportFileBar")?.setAttribute("hidden", "");
    updateCatalogueSummary();
    renderCatalogueReview();
    setCatalogueMessage("Download the current master or upload a revised workbook to begin.");
}

function cataloguePayloadRow(row) {
    return {
        excel_row: String(row.excel_row), action: row.action,
        segment_id: row.segment_id || "", segment_name: row.segment_name, segment_display_order: Number(row.segment_display_order), segment_active: row.segment_active, segment_photo_image_id: row.segment_photo_image_id || "", segment_icon_image_id: row.segment_icon_image_id || "",
        category_id: row.category_id || "", category_name: row.category_name || "", category_display_order: row.category_name ? Number(row.category_display_order) : null, category_active: row.category_active,
        product_id: row.product_id || "", product_name: row.product_name || "", product_description: row.product_description || "", product_active: row.product_active, product_photo_image_id: row.product_photo_image_id || "", show_on_prices_enquiry: row.show_on_prices_enquiry, product_display_order: row.show_on_prices_enquiry ? Number(row.product_display_order) : null, show_on_home: row.show_on_home, home_display_order: row.show_on_home ? Number(row.home_display_order) : null,
        grade_id: row.grade_id || "", grade_name: row.grade_name || "", grade_display_order: row.grade_name ? Number(row.grade_display_order) : null, grade_active: row.grade_active,
        pricing_id: row.pricing_id || "", specification: row.specification || "", size_thickness: row.size_thickness || "", unit: row.unit || "", rate: row.rate === "" || row.rate == null ? null : Number(row.rate), rate_display: row.rate_display, price_validity_days: Number(row.price_validity_days || 1), rate_updated_on: row.rate_updated_on || catalogueToday(), remarks: row.remarks || "", pricing_display_order: catalogueIsPricingRow(row) ? Number(row.pricing_display_order) : null, pricing_active: row.pricing_active
    };
}

async function saveCatalogueMaster() {
    const rows = state.admin.catalogueImport.rows;
    if (!rows.length) {
        setCatalogueMessage("Upload a revised master or add a row before saving.", "error");
        return;
    }
    validateCatalogueRows(rows);
    const errors = rows.filter((row) => row.status === "error");
    if (errors.length) {
        setCatalogueMessage(`${errors.length} row(s) still need attention. Use the Result filter “Needs Attention”, correct the highlighted fields, and Revalidate. No database changes were made.`, "error");
        return;
    }
    const changes = rows.filter((row) => ["new", "update", "delete"].includes(row.status) && row.action !== "ignore");
    if (!changes.length) {
        setCatalogueMessage("The upload is valid, but no database changes were detected.");
        return;
    }
    const deletes = changes.filter((row) => row.status === "delete").length;
    const message = `Apply ${changes.length} catalogue change(s)${deletes ? `, including ${deletes} permanent pricing deletion(s)` : ""}?\n\nAll changes are processed in one transaction. If any database step fails, the complete import is rolled back.`;
    if (!confirm(message)) return;
    const button = document.getElementById("saveCatalogueMasterBtn");
    if (button) { button.disabled = true; button.textContent = "Saving..."; }
    setCatalogueMessage("Validating and saving the complete catalogue transaction...");
    try {
        const result = await BCSPLDataLayer.importCatalogueMaster(changes.map(cataloguePayloadRow));
        clearPublicMetadataCaches();
        await refreshAdminData();
        renderAllAdminViews();
        const ref = result?.audit_id ? ` Audit reference: ${result.audit_id}.` : "";
        setCatalogueMessage(`Catalogue & Pricing Master saved successfully. ${result?.rows_processed || changes.length} change(s) processed.${ref}`, "success");
        state.admin.catalogueImport.rows = [];
        state.admin.catalogueImport.validated = false;
        document.getElementById("catalogueImportFileBar")?.setAttribute("hidden", "");
        updateCatalogueSummary();
        renderCatalogueReview();
    } catch (error) {
        console.error("Catalogue master import failed", error);
        const detail = error?.details || error?.hint || error?.message || "Unknown database error";
        setCatalogueMessage(`The complete import was rolled back. Database message: ${detail}. Review the affected record, correct it in the HTML grid, and Revalidate before trying again.`, "error");
    } finally {
        if (button) { button.disabled = false; button.textContent = "Save All Valid Changes"; }
    }
}

function downloadCatalogueErrorReport() {
    const rows = state.admin.catalogueImport.rows.filter((row) => row.status === "error");
    if (!rows.length) {
        alert("There are no validation errors to download.");
        return;
    }
    const data = rows.map((row) => ({ ...catalogueExcelRow(row), "Excel Row": row.excel_row, "Issue": row.issue, "How to Correct": row.errors.map((error) => error.correction).join(" | ") }));
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    sheet["!autofilter"] = { ref: sheet["!ref"] };
    sheet["!cols"] = Object.keys(data[0]).map((header) => ({ wch: header === "Issue" || header === "How to Correct" ? 70 : 18, hidden: / ID$/.test(header) }));
    XLSX.utils.book_append_sheet(workbook, sheet, "Errors_to_Correct");
    XLSX.writeFile(workbook, `bcspl-catalogue-import-errors-${catalogueToday()}.xlsx`);
}

function bindCatalogueMaster() {
    document.getElementById("dashboardCatalogueBtn")?.addEventListener("click", () => renderAdminSection("catalogueMasterSection"));
    document.getElementById("downloadCatalogueMasterBtn")?.addEventListener("click", downloadCurrentCatalogueMaster);
    document.getElementById("downloadCatalogueTemplateBtn")?.addEventListener("click", downloadBlankCatalogueTemplate);
    document.getElementById("addCatalogueReviewRowBtn")?.addEventListener("click", addCatalogueReviewRow);
    document.getElementById("revalidateCatalogueBtn")?.addEventListener("click", () => {
        if (!state.admin.catalogueImport.rows.length) return setCatalogueMessage("Upload a workbook or add a row first.", "error");
        validateCatalogueRows();
        const errors = state.admin.catalogueImport.rows.filter((row) => row.status === "error").length;
        setCatalogueMessage(errors ? `${errors} row(s) need correction. Filter by Needs Attention to work through them.` : "All rows are valid and ready for final save.", errors ? "error" : "success");
    });
    document.getElementById("saveCatalogueMasterBtn")?.addEventListener("click", saveCatalogueMaster);
    document.getElementById("cancelCatalogueUploadBtn")?.addEventListener("click", cancelCatalogueUpload);
    document.getElementById("downloadCatalogueErrorsBtn")?.addEventListener("click", downloadCatalogueErrorReport);
    document.getElementById("clearCatalogueReviewFiltersBtn")?.addEventListener("click", () => {
        state.admin.catalogueImport.filters = { status: "all", segment: "all", product: "", text: "" };
        ["catalogueReviewStatusFilter", "catalogueReviewSegmentFilter"].forEach((id) => { const el = document.getElementById(id); if (el) el.value = "all"; });
        ["catalogueReviewProductFilter", "catalogueReviewTextFilter"].forEach((id) => { const el = document.getElementById(id); if (el) el.value = ""; });
        renderCatalogueReview();
    });

    const fileInput = document.getElementById("importCatalogueMasterFile");
    if (fileInput) fileInput.addEventListener("change", async (event) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;
        setCatalogueMessage(`Reading ${file.name}...`);
        try {
            const rows = await parseCatalogueMasterFile(file);
            if (!rows.length) throw new Error("No usable catalogue rows were found in the workbook.");
            state.admin.catalogueImport.rows = rows;
            state.admin.catalogueImport.sourceName = file.name;
            state.admin.catalogueImport.validated = false;
            state.admin.catalogueImport.filters = { status: "all", segment: "all", product: "", text: "" };
            document.getElementById("catalogueImportFileBar")?.removeAttribute("hidden");
            const name = document.getElementById("catalogueImportFileName"); if (name) name.textContent = file.name;
            validateCatalogueRows(rows);
            const errors = rows.filter((row) => row.status === "error").length;
            setCatalogueMessage(errors ? `${file.name} loaded. ${errors} row(s) need attention. Correct them directly below and Revalidate.` : `${file.name} loaded and validated. Review the changes below before final save.`, errors ? "error" : "success");
        } catch (error) {
            console.error(error);
            setCatalogueMessage(`Could not read the workbook: ${error?.message || "Unknown file error"}. Download the V2.2.0 template and retain the Catalogue_Pricing_Master sheet headers.`, "error");
        }
    });

    const tbody = document.getElementById("catalogueReviewRows");
    tbody?.addEventListener("input", (event) => { if (event.target.matches("[data-catalogue-field]")) syncCatalogueRowFromElement(event.target); });
    tbody?.addEventListener("change", (event) => {
        const target = event.target;
        if (target.matches("[data-catalogue-field]")) {
            syncCatalogueRowFromElement(target);
            renderCatalogueReview();
        }
        if (target.matches("[data-catalogue-select]")) {
            const index = Number(target.closest("tr")?.dataset.catalogueIndex);
            if (state.admin.catalogueImport.rows[index]) state.admin.catalogueImport.rows[index].selected = target.checked;
        }
    });
    tbody?.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-catalogue-action]");
        if (!button) return;
        const index = Number(button.closest("tr")?.dataset.catalogueIndex);
        const row = state.admin.catalogueImport.rows[index];
        if (!row) return;
        if (button.dataset.catalogueAction === "validate") {
            catalogueValidateRow(row, catalogueExistingMaps());
            catalogueValidateConsistency(state.admin.catalogueImport.rows);
            catalogueValidateOrderCollisions(state.admin.catalogueImport.rows);
            row.snapshot = structuredClone(row);
            updateCatalogueSummary(); renderCatalogueReview();
            setCatalogueMessage(row.status === "error" ? `Excel row ${row.excel_row} still needs attention. Read the Issue / Correction column.` : `Excel row ${row.excel_row} is valid and ready for the final save.`, row.status === "error" ? "error" : "success");
        } else if (button.dataset.catalogueAction === "cancel") {
            state.admin.catalogueImport.rows[index] = structuredClone(row.snapshot || row);
            updateCatalogueSummary(); renderCatalogueReview();
        } else if (button.dataset.catalogueAction === "remove") {
            if (confirm(`Remove Excel row ${row.excel_row} from this upload review? This does not delete anything from the database.`)) removeCatalogueIndexes([index]);
        }
    });

    document.getElementById("selectAllCatalogueRows")?.addEventListener("change", (event) => {
        catalogueVisibleRows().forEach(({ row }) => { row.selected = event.target.checked; });
        renderCatalogueReview();
    });
    document.getElementById("deleteSelectedCatalogueRowsBtn")?.addEventListener("click", () => {
        const indexes = state.admin.catalogueImport.rows.map((row, index) => row.selected ? index : -1).filter((index) => index >= 0);
        if (!indexes.length) return alert("Select one or more upload rows first.");
        if (confirm(`Remove ${indexes.length} selected row(s) from this upload? This does not delete database records.`)) removeCatalogueIndexes(indexes);
    });

    const filterBindings = [
        ["catalogueReviewStatusFilter", "status"], ["catalogueReviewSegmentFilter", "segment"], ["catalogueReviewProductFilter", "product"], ["catalogueReviewTextFilter", "text"]
    ];
    filterBindings.forEach(([id, key]) => {
        const element = document.getElementById(id);
        element?.addEventListener(id.includes("Filter") && element.tagName === "INPUT" ? "input" : "change", () => {
            state.admin.catalogueImport.filters[key] = element.value;
            renderCatalogueReview();
        });
    });

    updateCatalogueSummary();
    renderCatalogueReview();
}

document.addEventListener("DOMContentLoaded", bindCatalogueMaster);
