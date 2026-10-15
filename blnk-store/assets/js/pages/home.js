/* HOME — one product grid with category filters */
const homeCategories = ["caps", "sneakers", "hoodies", "tees", "jackets"];
const LOOKBOOK_VIDEOS = [];
const LOOKBOOK_SLIDE_LIMIT = 5;
let homeSort = "featured";
let homeSize = "";

function renderProductCard(p) {
  return `
    <article class="product" onclick="openProduct('${p.id}')">
      <div class="product-image">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        ${productVisual(p)}
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${money(p.price)}</div>
        <div class="product-colors">${p.colors.map(c => `<span class="color-dot" style="background:${c}"></span>`).join("")}</div>
      </div>
    </article>`;
}

function renderHomeGrid() {
  const selectedCategories = new Set(
    [...document.querySelectorAll('input[name="shopCategory"]:checked')].map(input => input.value)
  );
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const list = PRODUCTS.filter(product => {
    const productCategory = String(product.category || "").toLowerCase();
    const sizes = Array.isArray(product.sizes) ? product.sizes : [];
    return selectedCategories.has(productCategory)
      && (!homeSize || sizes.some(size => String(size).toLowerCase() === homeSize.toLowerCase()));
  });

  if (homeSort === "price-asc") list.sort((a, b) => Number(a.price) - Number(b.price));
  if (homeSort === "price-desc") list.sort((a, b) => Number(b.price) - Number(a.price));
  if (homeSort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));

  grid.innerHTML = list.map(renderProductCard).join("");

  const resultCountElement = document.getElementById("shopResultCount");
  const emptyState = document.getElementById("shopEmpty");
  if (resultCountElement) resultCountElement.textContent = `${list.length} ${list.length === 1 ? "piece" : "pieces"}`;
  if (emptyState) emptyState.hidden = list.length > 0;

  const categoryButtons = document.querySelectorAll(".shop-categories [data-category]");
  const allSelected = selectedCategories.size === homeCategories.length;
  categoryButtons.forEach(button => {
    const category = button.dataset.category;
    const active = category === "all"
      ? allSelected
      : selectedCategories.size === 1 && selectedCategories.has(category);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function setupShopFilters() {
  const panel = document.getElementById("shopFilterPanel");
  const toggle = document.querySelector(".shop-filter-toggle");
  const sizeSelect = document.getElementById("shopSize");
  const sortSelect = document.getElementById("shopSort");
  const clearButton = document.querySelector(".shop-filter-clear");
  const sizes = [...new Set(PRODUCTS.flatMap(product => Array.isArray(product.sizes) ? product.sizes : []))]
    .sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));

  const categoryFromHash = homeCategories.find(category => location.hash === `#${category}Section`);
  if (categoryFromHash) {
    panel.querySelectorAll('input[name="shopCategory"]').forEach(input => {
      input.checked = input.value === categoryFromHash;
    });
  }

  sizes.forEach(size => {
    const option = document.createElement("option");
    option.value = size;
    option.textContent = size;
    sizeSelect.append(option);
  });

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });
  panel.querySelectorAll('input[name="shopCategory"]').forEach(input => input.addEventListener("change", renderHomeGrid));
  document.querySelectorAll(".shop-categories [data-category]").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      panel.querySelectorAll('input[name="shopCategory"]').forEach(input => {
        input.checked = category === "all" || input.value === category;
      });
      renderHomeGrid();
    });
  });
  sizeSelect.addEventListener("change", () => {
    homeSize = sizeSelect.value;
    renderHomeGrid();
  });
  sortSelect.addEventListener("change", () => {
    homeSort = sortSelect.value;
    renderHomeGrid();
  });
  clearButton.addEventListener("click", () => {
    panel.querySelectorAll('input[name="shopCategory"]').forEach(input => { input.checked = true; });
    sizeSelect.value = "";
    sortSelect.value = "featured";
    homeSize = "";
    homeSort = "featured";
    renderHomeGrid();
  });
}

function renderLookbook() {
  const grid = document.getElementById("lookbookGrid");
  if (!grid) return;

  const slides = LOOKBOOK_VIDEOS.slice(0, LOOKBOOK_SLIDE_LIMIT);
  if (!slides.length) {
    grid.innerHTML = `
      <div class="lookbook-empty">
        <p class="lookbook-empty-kicker">BLANX / IN MOTION</p>
        <p>Campaign films are being styled. Check back soon.</p>
      </div>`;
    return;
  }

  grid.innerHTML = `
    <div class="lookbook-carousel" role="region" aria-roledescription="carousel" aria-label="Lookbook videos">
      <div class="lookbook-slides">
        ${slides.map((look, index) => {
    const pieces = (look.products || []).map(id => PRODUCTS.find(product => product.id === id)).filter(Boolean);
    const poster = look.poster ? ` poster="${BLANX.base}${look.poster}"` : "";
    return `
      <article class="look-card" role="group" aria-roledescription="slide" aria-label="${index + 1} of ${slides.length}" data-lookbook-slide="${index}"${index === 0 ? "" : " hidden"}>
        <div class="look-video-frame">
          <video controls playsinline preload="metadata"${poster} aria-label="${look.title}">
            <source src="${BLANX.base}${look.video}">
            Your browser does not support video playback.
          </video>
          <span class="look-video-index">BLANX FILM / ${String(index + 1).padStart(2, "0")} OF ${String(slides.length).padStart(2, "0")}</span>
        </div>
        <div class="look-card-copy">
          <h3>${look.title}</h3>
          ${look.caption ? `<p class="look-video-caption">${look.caption}</p>` : ""}
          ${pieces.length ? `
            <p class="look-shop-label">Shop this look</p>
            <div class="look-card-links" aria-label="Shop pieces in this look">
              ${pieces.map(product => `<a href="${BLANX.base}pages/product.html?id=${product.id}">${product.name}</a>`).join("")}
            </div>` : ""}
        </div>
      </article>`;
  }).join("")}
      </div>
      ${slides.length > 1 ? `
        <div class="lookbook-controls" aria-label="Lookbook slide controls">
          <button class="lookbook-arrow" type="button" data-lookbook-previous aria-label="Previous video">PREVIOUS</button>
          <div class="lookbook-pagination" aria-label="Choose a video">
            ${slides.map((look, index) => `
              <button class="lookbook-dot${index === 0 ? " active" : ""}" type="button" data-lookbook-go="${index}" aria-label="Show video ${index + 1}" aria-current="${index === 0 ? "true" : "false"}"></button>`).join("")}
          </div>
          <button class="lookbook-arrow" type="button" data-lookbook-next aria-label="Next video">NEXT</button>
        </div>` : ""}
    </div>`;

  if (slides.length < 2) return;

  let activeIndex = 0;
  const carousel = grid.querySelector(".lookbook-carousel");
  const slideElements = [...carousel.querySelectorAll("[data-lookbook-slide]")];
  const dots = [...carousel.querySelectorAll("[data-lookbook-go]")];

  function showSlide(index) {
    slideElements[activeIndex].querySelector("video").pause();
    activeIndex = (index + slideElements.length) % slideElements.length;
    slideElements.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeIndex;
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === activeIndex;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-current", String(active));
    });
  }

  carousel.querySelector("[data-lookbook-previous]").addEventListener("click", () => showSlide(activeIndex - 1));
  carousel.querySelector("[data-lookbook-next]").addEventListener("click", () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
}

function setupPageMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  const targets = document.querySelectorAll(
    ".section-title, .category-head, .product, .look-card:not([hidden]), .about-copy p, .footer-cta-inner, .service-item, .footer-column"
  );
  targets.forEach((target, index) => {
    const position = target.matches(".product, .look-card, .service-item, .footer-column")
      ? [...target.parentElement.children].indexOf(target)
      : index % 4;
    target.style.setProperty("--reveal-delay", `${Math.min(position, 4) * 85}ms`);
    target.classList.add("scroll-reveal");
    observer.observe(target);
  });

  document.body.classList.add("motion-ready");
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  setupShopFilters();
  renderHomeGrid();
  renderLookbook();
  setupPageMotion();
});
