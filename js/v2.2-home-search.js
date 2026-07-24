/* BCSPL Website V2.2.0 - Search shows matching live pricing on the Home page. */

renderHomeSearchChips = function renderHomeSearchChipsV220() {
    const chips = document.getElementById("homeSearchChips");
    if (!chips) return;
    const values = [...state.public.homeProducts]
        .filter((product) => product.show_on_home === true && product.show_on_prices_enquiry === true)
        .sort((a, b) => Number(a.home_display_order || 9999) - Number(b.home_display_order || 9999)
            || String(a.product_name || "").localeCompare(String(b.product_name || "")))
        .slice(0, 8);
    chips.innerHTML = values.map((product) => `<button class="home-shortcut-chip" type="button" data-home-search-term="${escapeHtml(product.product_name)}">${escapeHtml(product.product_name)}</button>`).join("");
};

renderSearchResults = function renderSearchResultsV220(query) {
    const container = document.getElementById("homeSearchResults");
    if (!container) return;
    const text = String(query || "").trim().toLowerCase();
    if (!text) {
        container.className = "hero-search-results";
        container.innerHTML = "";
        return;
    }
    const terms = text.split(/\s+/).filter(Boolean);
    const scored = searchableItems()
        .map((item) => ({ item, score: terms.reduce((score, term) => score + (item.searchText.includes(term) ? 1 : 0), item.searchText.includes(text) ? 3 : 0) }))
        .filter((entry) => entry.score > 0 && entry.item.productId)
        .sort((a, b) => b.score - a.score || a.item.productName.localeCompare(b.item.productName));
    const groups = new Map();
    scored.forEach(({ item, score }) => {
        if (!groups.has(item.productId)) groups.set(item.productId, { product: item, score, prices: [] });
        groups.get(item.productId).prices.push(item);
        groups.get(item.productId).score = Math.max(groups.get(item.productId).score, score);
    });
    const matches = [...groups.values()].sort((a, b) => b.score - a.score || a.product.productName.localeCompare(b.product.productName));
    container.className = "hero-search-results active";
    if (!matches.length) {
        container.innerHTML = `<div class="search-no-result">No matching published price was found for “${escapeHtml(query)}”. Try a broader term such as HR, CR, coil, sheet or grade, or <a href="enquiry.html?search=${encodeURIComponent(query)}">send an enquiry</a>.</div>`;
        return;
    }
    container.innerHTML = matches.map((group) => {
        const product = group.product;
        const priceRows = group.prices.map((item) => {
            const combinedSpec = [item.specification, item.sizeThickness].filter(Boolean).join(" • ") || "As required";
            return `<div class="home-search-price-line"><span>${escapeHtml(item.grade || "As required")}</span><span>${escapeHtml(combinedSpec)}</span><b>${escapeHtml(item.rateText || "Price on Request")}</b></div>`;
        }).join("");
        return `<article class="home-search-product-group">
            <div class="home-search-product-image">${product.imageUrl ? `<img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.productName)}" loading="lazy">` : ""}</div>
            <div><div class="home-search-product-head"><div><small>${escapeHtml([product.segmentName, product.categoryName].filter(Boolean).join(" • "))}</small><h4>${escapeHtml(product.productName)}</h4></div><a href="enquiry.html?product_id=${encodeURIComponent(product.productId)}&search=${encodeURIComponent(query)}">View all rates</a></div><div class="home-search-prices">${priceRows}</div><a class="home-search-more-link" href="enquiry.html?product_id=${encodeURIComponent(product.productId)}&search=${encodeURIComponent(query)}">Select a rate and create enquiry →</a></div>
        </article>`;
    }).join("") + `<div class="home-search-all-results"><a href="enquiry.html?search=${encodeURIComponent(query)}">Open all matching products and prices →</a></div>`;
};

bindHomeSearch = function bindHomeSearchV220() {
    const input = document.getElementById("homeSearch");
    if (!input || input.dataset.v220Bound === "true") return;
    input.dataset.v220Bound = "true";
    const run = () => renderSearchResults(input.value);
    document.getElementById("homeSearchBtn")?.addEventListener("click", run);
    document.getElementById("homeSearchClear")?.addEventListener("click", () => {
        input.value = "";
        renderSearchResults("");
        input.focus();
    });
    input.addEventListener("input", () => input.value.trim().length >= 2 ? run() : renderSearchResults(""));
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") { event.preventDefault(); run(); }
    });
    document.getElementById("homeSearchChips")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-home-search-term]");
        if (!button) return;
        input.value = button.dataset.homeSearchTerm || "";
        run();
        input.focus();
    });
};
