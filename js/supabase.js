// Buy Commodity - Supabase Connection

const SUPABASE_URL = "https://yxbxnfcmhgdthxwrifof.supabase.co";

const SUPABASE_ANON_KEY =
"sb_publishable_K05tyY7tCL_1MUH6PdPDRg_juzNCjv-";

const SUPABASE_STORAGE_BUCKET = "bcspl-images";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

function todayDateText() {
    return new Date().toISOString().slice(0, 10);
}

function toPositiveInteger(value, fallback = 1) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? Math.trunc(number) : fallback;
}

function trimText(value) {
    return String(value || "").trim();
}

function lowerTrim(value) {
    return trimText(value).toLowerCase();
}

function assertRequired(value, label) {
    if (!trimText(value)) throw new Error(`${label} is required.`);
}

function ensureUniqueName(rows, key, value, currentId, label) {
    const target = lowerTrim(value);
    const duplicate = (rows || []).find((row) => lowerTrim(row?.[key]) === target && String(row?.[`${label.toLowerCase()}_id`] || row?.id || "") !== String(currentId || ""));
    if (duplicate) throw new Error(`${label} with the same name already exists.`);
}

function buildStoragePath(imageType, fileName) {
    const safeName = String(fileName || "image")
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9._-]/g, "")
        .toLowerCase();
    return `${imageType}/${Date.now()}-${safeName}`;
}

async function listReferenceCountForImage(imageId) {
    if (!imageId) return 0;
    const [segmentPhoto, segmentIcon, productPhoto] = await Promise.all([
        supabaseClient.from("product_segments").select("segment_id", { count: "exact", head: true }).eq("segment_photo_image_id", imageId),
        supabaseClient.from("product_segments").select("segment_id", { count: "exact", head: true }).eq("segment_icon_image_id", imageId),
        supabaseClient.from("products").select("product_id", { count: "exact", head: true }).eq("product_photo_image_id", imageId)
    ]);

    [segmentPhoto, segmentIcon, productPhoto].forEach((result) => {
        if (result.error) throw result.error;
    });

    return Number(segmentPhoto.count || 0) + Number(segmentIcon.count || 0) + Number(productPhoto.count || 0);
}

const BCSPLDataLayer = {
    storageBucket: SUPABASE_STORAGE_BUCKET,

    async applyOrderedChanges(module, upserts = [], deletes = []) {
        const { data, error } = await supabaseClient.rpc("admin_apply_ordered_changes_v1", {
            p_module: module,
            p_upserts: upserts,
            p_deletes: deletes
        });
        if (error) throw error;
        return data;
    },

    async fetchGradeMaster({ includeInactive = false } = {}) {
        let query = supabaseClient
            .from("grade_master")
            .select("grade_id, product_id, grade_name, display_order, active, products!inner(product_name, category_id, segment_id, product_categories!inner(category_name), product_segments!inner(segment_name))")
            .order("display_order", { ascending: true })
            .order("grade_name", { ascending: true })
            .order("grade_id", { ascending: true });

        if (!includeInactive) query = query.eq("active", true);
        const { data, error } = await query;
        if (error) throw error;
        return (data || []).map((row) => ({
            grade_id: row.grade_id,
            product_id: row.product_id,
            grade_name: row.grade_name,
            display_order: row.display_order,
            active: row.active,
            product_name: row.products?.product_name || "",
            category_id: row.products?.category_id || "",
            category_name: row.products?.product_categories?.category_name || "",
            segment_id: row.products?.segment_id || "",
            segment_name: row.products?.product_segments?.segment_name || ""
        }));
    },

    async saveGradeMasterItem(grade) {
        const productId = grade?.product_id || "";
        const gradeName = trimText(grade?.grade_name);
        const displayOrder = toPositiveInteger(grade?.display_order, 1);

        assertRequired(productId, "Product");
        assertRequired(gradeName, "Grade Name");

        const rows = await this.fetchGradeMaster({ includeInactive: true });
        const duplicate = rows.find((row) =>
            String(row.product_id) === String(productId) &&
            lowerTrim(row.grade_name) === lowerTrim(gradeName) &&
            String(row.grade_id) !== String(grade?.grade_id || "")
        );
        if (duplicate) throw new Error("Grade Name already exists for the selected Product.");

        const payload = {
            product_id: productId,
            grade_name: gradeName,
            display_order: displayOrder,
            active: grade?.active !== false
        };

        if (grade?.grade_id) {
            const { error } = await supabaseClient.from("grade_master").update(payload).eq("grade_id", grade.grade_id);
            if (error) throw error;
            return;
        }

        const { error } = await supabaseClient.from("grade_master").insert([payload]);
        if (error) throw error;
    },

    async deleteGradeMasterItem(gradeId) {
        const { error } = await supabaseClient.from("grade_master").delete().eq("grade_id", gradeId);
        if (error) throw error;
    },

    async fetchSegments({ includeInactive = false } = {}) {
        let query = supabaseClient
            .from("product_segments")
            .select("segment_id, segment_name, description, segment_photo_image_id, segment_icon_image_id, display_order, active")
            .order("display_order", { ascending: true })
            .order("segment_name", { ascending: true })
            .order("segment_id", { ascending: true });

        if (!includeInactive) query = query.eq("active", true);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    async fetchPublicSegments() {
        return this.fetchSegments({ includeInactive: false });
    },

    async saveSegment(segment) {
        const segmentName = trimText(segment?.segment_name);
        assertRequired(segmentName, "Segment Name");

        const rows = await this.fetchSegments({ includeInactive: true });
        ensureUniqueName(rows, "segment_name", segmentName, segment?.segment_id, "Segment");

        const payload = {
            segment_name: segmentName,
            description: trimText(segment?.description),
            segment_photo_image_id: segment?.segment_photo_image_id || null,
            segment_icon_image_id: segment?.segment_icon_image_id || null,
            display_order: toPositiveInteger(segment?.display_order, 1),
            active: segment?.active !== false
        };

        if (segment?.segment_id) {
            const { error } = await supabaseClient.from("product_segments").update(payload).eq("segment_id", segment.segment_id);
            if (error) throw error;
            return;
        }

        const { error } = await supabaseClient.from("product_segments").insert([payload]);
        if (error) throw error;
    },

    async deleteSegment(segmentId) {
        const { error } = await supabaseClient.from("product_segments").delete().eq("segment_id", segmentId);
        if (error) throw error;
    },

    async fetchCategories({ includeInactive = false } = {}) {
        let query = supabaseClient
            .from("product_categories")
            .select("category_id, segment_id, category_name, active")
            .order("category_name", { ascending: true });

        if (!includeInactive) query = query.eq("active", true);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    async saveCategory(category) {
        const categoryName = trimText(category?.category_name);
        const segmentId = category?.segment_id || "";

        assertRequired(segmentId, "Product Segment");
        assertRequired(categoryName, "Category Name");

        const rows = await this.fetchCategories({ includeInactive: true });
        const duplicate = rows.find((row) =>
            String(row.segment_id || "") === String(segmentId) &&
            lowerTrim(row.category_name) === lowerTrim(categoryName) &&
            String(row.category_id || "") !== String(category?.category_id || "")
        );
        if (duplicate) throw new Error("Category with the same name already exists in this segment.");

        const payload = {
            segment_id: segmentId,
            category_name: categoryName,
            active: category?.active !== false
        };

        if (category?.category_id) {
            const { error } = await supabaseClient.from("product_categories").update(payload).eq("category_id", category.category_id);
            if (error) throw error;
            return;
        }

        const { error } = await supabaseClient.from("product_categories").insert([payload]);
        if (error) throw error;
    },

    async deleteCategory(categoryId) {
        const { error } = await supabaseClient.from("product_categories").delete().eq("category_id", categoryId);
        if (error) throw error;
    },

    async fetchProducts({ includeInactive = false } = {}) {
        let query = supabaseClient
            .from("products")
            .select("product_id, segment_id, category_id, product_name, description, product_photo_image_id, show_on_home, home_display_order, show_on_prices_enquiry, prices_enquiry_display_order, active")
            .order("product_name", { ascending: true });

        if (!includeInactive) query = query.eq("active", true);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    async fetchPublicHomeProducts() {
        const { data, error } = await supabaseClient
            .from("products")
            .select("product_id, segment_id, category_id, product_name, description, product_photo_image_id, show_on_home, home_display_order, show_on_prices_enquiry, prices_enquiry_display_order, active")
            .eq("active", true)
            .eq("show_on_home", true)
            .eq("show_on_prices_enquiry", true)
            .order("home_display_order", { ascending: true })
            .order("product_name", { ascending: true })
            .order("product_id", { ascending: true })
            .limit(8);
        if (error) throw error;
        return data || [];
    },

    async fetchPublicPricesProducts() {
        const { data, error } = await supabaseClient
            .from("products")
            .select("product_id, segment_id, category_id, product_name, description, product_photo_image_id, show_on_home, home_display_order, show_on_prices_enquiry, prices_enquiry_display_order, active")
            .eq("active", true)
            .eq("show_on_prices_enquiry", true)
            .order("prices_enquiry_display_order", { ascending: true })
            .order("product_name", { ascending: true })
            .order("product_id", { ascending: true });
        if (error) throw error;
        return data || [];
    },

    async saveProduct(product) {
        const productName = trimText(product?.product_name);
        const segmentId = product?.segment_id || "";
        const categoryId = product?.category_id || "";

        assertRequired(segmentId, "Product Segment");
        assertRequired(categoryId, "Product Category");
        assertRequired(productName, "Product Name");

        const rows = await this.fetchProducts({ includeInactive: true });
        const duplicate = rows.find((row) =>
            String(row.segment_id || "") === String(segmentId) &&
            String(row.category_id || "") === String(categoryId) &&
            lowerTrim(row.product_name) === lowerTrim(productName) &&
            String(row.product_id || "") !== String(product?.product_id || "")
        );
        if (duplicate) throw new Error("Product with the same name already exists in this category.");

        const showOnHome = product?.show_on_home === true;
        const showOnPrices = product?.show_on_prices_enquiry === true;
        const homeOrder = showOnHome ? Number(product?.home_display_order) : null;
        const pricesOrder = showOnPrices ? Number(product?.prices_enquiry_display_order) : null;

        if (showOnHome && !showOnPrices) {
            throw new Error("A product shown below Home Search must also be visible on Prices & Enquiry.");
        }
        if (showOnHome && (!Number.isFinite(homeOrder) || homeOrder < 1 || homeOrder > 8)) {
            throw new Error("Home Tile Position must be between 1 and 8.");
        }

        const payload = {
            segment_id: segmentId,
            category_id: categoryId,
            product_name: productName,
            description: trimText(product?.description),
            product_photo_image_id: product?.product_photo_image_id || null,
            show_on_home: showOnHome,
            home_display_order: showOnHome ? toPositiveInteger(homeOrder, 1) : null,
            show_on_prices_enquiry: showOnPrices,
            prices_enquiry_display_order: showOnPrices ? toPositiveInteger(pricesOrder, 1) : null,
            active: product?.active !== false
        };

        if (product?.product_id) {
            const { error } = await supabaseClient.from("products").update(payload).eq("product_id", product.product_id);
            if (error) {
                if (String(error.message || "").toLowerCase().includes("home") && String(error.message || "").toLowerCase().includes("unique")) {
                    throw new Error("This Home Tile Position is already assigned to another product.");
                }
                throw error;
            }
            return;
        }

        const { error } = await supabaseClient.from("products").insert([payload]);
        if (error) {
            if (String(error.message || "").toLowerCase().includes("home") && String(error.message || "").toLowerCase().includes("unique")) {
                throw new Error("This Home Tile Position is already assigned to another product.");
            }
            throw error;
        }
    },

    async countProductsBySegment(segmentId) {
        const { count, error } = await supabaseClient.from("products").select("product_id", { count: "exact", head: true }).eq("segment_id", segmentId);
        if (error) throw error;
        return Number(count || 0);
    },

    async countProductsByCategory(categoryId) {
        const { count, error } = await supabaseClient.from("products").select("product_id", { count: "exact", head: true }).eq("category_id", categoryId);
        if (error) throw error;
        return Number(count || 0);
    },

    async countPricingRowsByProduct(productId) {
        const { count, error } = await supabaseClient.from("product_pricing").select("pricing_id", { count: "exact", head: true }).eq("product_id", productId);
        if (error) throw error;
        return Number(count || 0);
    },

    async deleteProduct(productId) {
        const { error } = await supabaseClient.from("products").delete().eq("product_id", productId);
        if (error) throw error;
    },

    async fetchProductPricing({ includeInactive = false } = {}) {
        let query = supabaseClient
            .from("product_pricing")
            .select("pricing_id, product_id, grade_id, specification, size_thickness, unit, rate, rate_display, price_validity_days, rate_updated_on, remarks, display_order, active, grade_master!inner(grade_id, grade_name, product_id, active)")
            .order("display_order", { ascending: true })
            .order("rate_updated_on", { ascending: false })
            .order("pricing_id", { ascending: true });

        if (!includeInactive) query = query.eq("active", true).eq("grade_master.active", true);
        const { data, error } = await query;
        if (error) throw error;
        return (data || []).map((row) => ({
            ...row,
            grade_id: row.grade_id,
            grade_name: row.grade_master?.grade_name || "",
            grade_product_id: row.grade_master?.product_id || "",
            grade_active: row.grade_master?.active !== false,
            grade_master: undefined
        }));
    },

    async saveProductPricing(pricing) {
        const productId = pricing?.product_id || "";
        const gradeId = pricing?.grade_id || "";
        const rateDisplay = trimText(pricing?.rate_display) || "price_on_request";

        assertRequired(productId, "Product");
        assertRequired(gradeId, "Grade");

        const grades = await this.fetchGradeMaster({ includeInactive: true });
        const selectedGrade = grades.find((grade) => String(grade.grade_id) === String(gradeId));
        if (!selectedGrade || selectedGrade.active === false || String(selectedGrade.product_id) !== String(productId)) {
            throw new Error("Select an active Grade assigned to the selected Product.");
        }

        const payload = {
            product_id: productId,
            grade_id: gradeId,
            specification: trimText(pricing?.specification),
            size_thickness: trimText(pricing?.size_thickness),
            unit: trimText(pricing?.unit) || null,
            rate: pricing?.rate === "" || pricing?.rate == null ? null : Number(pricing.rate),
            rate_display: rateDisplay,
            price_validity_days: pricing?.price_validity_days === "" || pricing?.price_validity_days == null ? null : toPositiveInteger(pricing.price_validity_days, 1),
            remarks: trimText(pricing?.remarks),
            display_order: toPositiveInteger(pricing?.display_order, 1),
            active: pricing?.active !== false
        };

        if (rateDisplay === "show_price") {
            if (payload.rate == null || Number.isNaN(payload.rate)) throw new Error("Rate is required for live prices.");
            if (!payload.unit) throw new Error("Unit is required for live prices.");
            if (!payload.price_validity_days) throw new Error("Price Validity is required for live prices.");
            payload.rate_updated_on = todayDateText();
        } else if (pricing?.rate_updated_on) {
            payload.rate_updated_on = pricing.rate_updated_on;
        }

        if (pricing?.pricing_id) {
            const { error } = await supabaseClient.from("product_pricing").update(payload).eq("pricing_id", pricing.pricing_id);
            if (error) throw error;
            return;
        }

        const { error } = await supabaseClient.from("product_pricing").insert([payload]);
        if (error) throw error;
    },

    async deleteProductPricing(pricingId) {
        const { error } = await supabaseClient.from("product_pricing").delete().eq("pricing_id", pricingId);
        if (error) throw error;
    },

    async fetchImageLibrary({ includeInactive = true, imageType = "" } = {}) {
        let query = supabaseClient
            .from("image_library")
            .select("image_id, image_name, image_type, source_type, file_path, mime_type, active")
            .order("image_name", { ascending: true });

        if (!includeInactive) query = query.eq("active", true);
        if (imageType) query = query.eq("image_type", imageType);

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    async fetchActiveImages() {
        return this.fetchImageLibrary({ includeInactive: false });
    },

    getStoragePublicUrl(filePath) {
        const { data } = supabaseClient.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(filePath);
        return data?.publicUrl || "";
    },

    async uploadImageBinary(file, imageType) {
        if (!file) throw new Error("Select a file to upload.");
        const storagePath = buildStoragePath(imageType, file.name);
        const { error } = await supabaseClient.storage.from(SUPABASE_STORAGE_BUCKET).upload(storagePath, file, {
            upsert: true,
            cacheControl: "3600",
            contentType: file.type || "application/octet-stream"
        });
        if (error) throw error;
        return {
            source_type: "storage",
            file_path: storagePath,
            mime_type: file.type || "application/octet-stream"
        };
    },

    async saveImageLibraryItem(item, file) {
        const imageName = trimText(item?.image_name);
        const imageType = trimText(item?.image_type);
        assertRequired(imageName, "Image Name");
        assertRequired(imageType, "Image Type");

        let sourceType = trimText(item?.source_type) || "local";
        let filePath = trimText(item?.file_path);
        let mimeType = trimText(item?.mime_type);

        if (file) {
            const uploaded = await this.uploadImageBinary(file, imageType);
            sourceType = uploaded.source_type;
            filePath = uploaded.file_path;
            mimeType = uploaded.mime_type;
        }

        if (!filePath) throw new Error("Image file path is required.");

        const payload = {
            image_name: imageName,
            image_type: imageType,
            source_type: sourceType,
            file_path: filePath,
            mime_type: mimeType || null,
            active: item?.active !== false
        };

        if (item?.image_id) {
            const { error } = await supabaseClient.from("image_library").update(payload).eq("image_id", item.image_id);
            if (error) throw error;
            return;
        }

        const { error } = await supabaseClient.from("image_library").insert([payload]);
        if (error) throw error;
    },

    async deleteImageLibraryItem(imageId) {
        const rows = await this.fetchImageLibrary({ includeInactive: true });
        const row = rows.find((item) => String(item.image_id) === String(imageId));
        if (!row) return;

        const referenceCount = await listReferenceCountForImage(imageId);
        if (referenceCount > 0) throw new Error("This image is currently in use and cannot be deleted.");

        const { error } = await supabaseClient.from("image_library").delete().eq("image_id", imageId);
        if (error) throw error;

        if (row.source_type === "storage" && row.file_path) {
            await supabaseClient.storage.from(SUPABASE_STORAGE_BUCKET).remove([row.file_path]);
        }
    },

    async fetchSiteSettings() {
        const { data, error } = await supabaseClient
            .from("site_settings")
            .select("*")
            .order("id", { ascending: true })
            .limit(1)
            .maybeSingle();
        if (error) throw error;
        return data;
    },

    async saveSiteSettings(payload) {
        const { data: existingRow, error: lookupError } = await supabaseClient
            .from("site_settings")
            .select("id")
            .order("id", { ascending: true })
            .limit(1)
            .maybeSingle();
        if (lookupError) throw lookupError;

        if (existingRow) {
            const { error } = await supabaseClient.from("site_settings").update(payload).eq("id", existingRow.id);
            if (error) throw error;
            return;
        }

        const { error } = await supabaseClient.from("site_settings").insert([payload]);
        if (error) throw error;
    },

    async fetchEnquiryRecipients({ includeInactive = false } = {}) {
        let query = supabaseClient
            .from("enquiry_email_recipients")
            .select("*")
            .order("display_order", { ascending: true })
            .order("email", { ascending: true })
            .order("id", { ascending: true });
        if (!includeInactive) query = query.eq("active", true);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    async saveEnquiryRecipient(item) {
        const email = trimText(item?.email).toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid recipient email address.");
        const payload = {
            display_name: trimText(item?.display_name),
            email,
            display_order: toPositiveInteger(item?.display_order, 1),
            active: item?.active !== false,
            updated_at: new Date().toISOString()
        };
        if (item?.id) {
            const { error } = await supabaseClient.from("enquiry_email_recipients").update(payload).eq("id", item.id);
            if (error) throw error;
            return;
        }
        const { error } = await supabaseClient.from("enquiry_email_recipients").insert([payload]);
        if (error) throw error;
    },

    async deleteEnquiryRecipient(id) {
        const { error } = await supabaseClient.from("enquiry_email_recipients").delete().eq("id", id);
        if (error) throw error;
    },

    async submitWebsiteEnquiry(payload) {
        const { data, error } = await supabaseClient.functions.invoke("submit-enquiry", { body: payload });
        if (error) throw error;
        if (!data?.success) throw new Error(data?.error || "Could not submit enquiry.");
        return data;
    },

    async fetchEnquiries() {
        const { data: enquiries, error } = await supabaseClient
            .from("enquiries")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) throw error;

        const enquiryIds = (enquiries || []).map((enquiry) => enquiry.id);
        if (!enquiryIds.length) return [];

        const { data: rows, error: rowsError } = await supabaseClient
            .from("enquiry_products")
            .select("*")
            .in("enquiry_id", enquiryIds);
        if (rowsError) throw rowsError;

        return (enquiries || []).map((enquiry) => ({
            ...enquiry,
            selected_products: (rows || []).filter((row) => row.enquiry_id === enquiry.id)
        }));
    },

    async updateEnquiryStatus(id, status) {
        const { error } = await supabaseClient
            .from("enquiries")
            .update({ status, updated_at: new Date().toISOString() })
            .eq("id", id);
        if (error) throw error;
    }
};

window.BCSPLDataLayer = BCSPLDataLayer;
