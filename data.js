// Sanity config
const SANITY_PROJECT_ID = "your_project_id";
const SANITY_DATASET = "production";
const USE_SANITY = false; // flip to true once configured

// Fallback static data (same as before)
const STATIC_PRODUCTS = [ ... ];

// Sanity fetch
async function fetchSanityProducts() {
  const query = encodeURIComponent(`*[_type == "product" && inStock] | order(_createdAt desc) {
    _id, name, "slug": slug.current, price, category, description, sizes, colors,
    "imageUrl": images[0].asset->url, featured, badge
  }`);
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2025-01-01/data/query/${SANITY_DATASET}?query=${query}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Sanity fetch failed");
  const data = await res.json();
  return data.result.map(p => ({
    id: p.slug,
    name: p.name,
    price: p.price,
    category: p.category,
    desc: p.description,
    colors: p.colors || ["#111"],
    sizes: p.sizes || ["ONE SIZE"],
    imageUrl: p.imageUrl,
    badge: p.badge,
    icon: categoryToIcon(p.category)
  }));
}

function categoryToIcon(cat) {
  const map = { caps: "cap", sneakers: "sneaker", hoodies: "hoodie", tees: "tee", jackets: "jacket" };
  return map[cat.toLowerCase()] || "tee";
}

// Global products
let PRODUCTS = [...STATIC_PRODUCTS];

async function loadProducts() {
  if (!USE_SANITY) return PRODUCTS;
  try {
    PRODUCTS = await fetchSanityProducts();
  } catch (e) {
    console.warn("Sanity failed, using static data:", e);
  }
  return PRODUCTS;
}

function iconSvg(type, color) { ... same as before ... }

/* ============================================================
   DATA.JS — Products (static + optional Sanity)
   ============================================================ */

/* --- SANITY CONFIG --- */
const SANITY_PROJECT_ID = "REPLACE_WITH_YOUR_PROJECT_ID";
const SANITY_DATASET    = "production";
const USE_SANITY        = false; // ← flip to true once configured

const WHATSAPP_NUMBER   = "254104273995";

/* --- STATIC FALLBACK DATA --- */
const STATIC_PRODUCTS = [
  { id: "cap-001", name: "Zero Cap", price: 1200, category: "caps", badge: "NEW",
    desc: "Six-panel structured cap. Flat brim, tonal stitching, adjustable strap.",
    colors: ["#111111", "#e6e2d8", "#8a8a8a"], sizes: ["ONE SIZE"], icon: "cap" },
  { id: "cap-002", name: "BLNK Dad Cap", price: 1000, category: "caps",
    desc: "Unstructured cotton twill, curved brim, soft-washed finish.",
    colors: ["#2a2a2a", "#c8c2b4", "#4a5a3a"], sizes: ["ONE SIZE"], icon: "cap" },
  { id: "cap-003", name: "Trucker Snap", price: 1400, category: "caps",
    desc: "Mesh back, foam front, snap closure. Everyday trucker.",
    colors: ["#111111", "#d4cec2"], sizes: ["ONE SIZE"], icon: "cap" },
  { id: "sneaker-001", name: "Air Force 1", price: 2000, category: "sneakers", badge: "HOT",
    desc: "Classic silhouette, full-grain leather, Air cushioning.",
    colors: ["#ffffff", "#111111"], sizes: ["40","41","42","43","44","45"], icon: "sneaker" },
  { id: "sneaker-002", name: "Jordan 4 Retro", price: 3500, category: "sneakers",
    desc: "Iconic flight silhouette with visible Air unit and premium suede overlays.",
    colors: ["#111111", "#5a5a5a"], sizes: ["40","41","42","43","44","45"], icon: "sneaker" },
  { id: "sneaker-003", name: "Nike TN", price: 3600, category: "sneakers",
    desc: "Tuned Air cushioning, aggressive tread, statement colourways.",
    colors: ["#111111", "#e2722b"], sizes: ["41","42","43","44"], icon: "sneaker" },
  { id: "sneaker-004", name: "Air Max 97", price: 3300, category: "sneakers",
    desc: "Full-length Air, ripple design, water-ripple inspired upper.",
    colors: ["#e8e3d7", "#8a8a8a", "#4a5a3a"], sizes: ["41","42","43","44"], icon: "sneaker" },
  { id: "hoodie-001", name: "Zero Zip Hoodie", price: 3200, category: "hoodies", badge: "NEW",
    desc: "Heavyweight fleece, full-zip front, tonal hardware. Built to layer.",
    colors: ["#111111", "#2a2a2a", "#e6e2d8"], sizes: ["S","M","L","XL"], icon: "hoodie" },
  { id: "hoodie-002", name: "Raw Pullover", price: 2800, category: "hoodies",
    desc: "Mid-weight pullover hoodie. Kangaroo pocket, raw edges, no logo.",
    colors: ["#111111", "#8a8a8a", "#c8c2b4"], sizes: ["S","M","L","XL"], icon: "hoodie" },
  { id: "hoodie-003", name: "Block Hood", price: 3400, category: "hoodies",
    desc: "Oversized fit, dropped shoulders, ribbed cuffs and hem.",
    colors: ["#111111", "#d4cec2"], sizes: ["M","L","XL"], icon: "hoodie" },
  { id: "tee-001", name: "Raw Tee", price: 1500, category: "tees",
    desc: "260gsm combed cotton, boxy fit, garment-dyed.",
    colors: ["#111111", "#ffffff", "#c8c2b4"], sizes: ["S","M","L","XL"], icon: "tee" },
  { id: "tee-002", name: "Blank Tee", price: 1400, category: "tees",
    desc: "Everyday essential. Soft-washed, no logo, no rules.",
    colors: ["#ffffff", "#111111", "#8a8a8a"], sizes: ["S","M","L","XL"], icon: "tee" },
  { id: "jacket-001", name: "Block Jacket", price: 5500, category: "jackets",
    desc: "Technical shell, water-repellent finish, taped seams.",
    colors: ["#111111", "#1a3a5a"], sizes: ["S","M","L","XL"], icon: "jacket" },
  { id: "jacket-002", name: "Utility Overshirt", price: 4200, category: "jackets",
    desc: "Cotton-twill overshirt. Chest pockets, boxy cut.",
    colors: ["#4a5a3a", "#111111", "#c8c2b4"], sizes: ["S","M","L","XL"], icon: "jacket" }
];

let PRODUCTS = [...STATIC_PRODUCTS];

/* --- SANITY FETCH --- */
async function fetchSanityProducts() {
  const query = encodeURIComponent(`*[_type == "product" && inStock] | order(_createdAt desc) {
    _id, name, "slug": slug.current, price, category, description, sizes, colors, badge,
    "imageUrl": images[0].asset->url
  }`);

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2025-01-01/data/query/${SANITY_DATASET}?query=${query}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Sanity fetch failed");
  const data = await res.json();

  return (data.result || []).map(p => ({
    id: p.slug || p._id,
    name: p.name,
    price: p.price,
    category: p.category,
    desc: p.description || "",
    colors: (p.colors && p.colors.length) ? p.colors : ["#111111"],
    sizes: (p.sizes && p.sizes.length) ? p.sizes : ["ONE SIZE"],
    imageUrl: p.imageUrl || null,
    badge: p.badge || null,
    icon: categoryToIcon(p.category)
  }));
}

function categoryToIcon(cat) {
  const map = { caps: "cap", sneakers: "sneaker", hoodies: "hoodie", tees: "tee", jackets: "jacket" };
  return map[(cat || "").toLowerCase()] || "tee";
}

async function loadProducts() {
  if (!USE_SANITY) return PRODUCTS;
  try {
    const live = await fetchSanityProducts();
    if (live.length) PRODUCTS = live;
  } catch (err) {
    console.warn("[BLNK] Sanity failed, using static data:", err);
  }
  return PRODUCTS;
}

/* --- ICON SVGs (fallback when no image) --- */
function iconSvg(type, color) {
  const c = color || "#2a2a2a";
  const f = `fill="${c}"`;
  const icons = {
    cap:     `<svg viewBox="0 0 100 100"><path ${f} d="M20 60 C20 40 30 25 50 25 C70 25 80 40 80 60 L80 62 L20 62 Z"/><path ${f} d="M20 62 L12 62 C12 70 20 74 30 74 L80 74 L80 62 Z"/></svg>`,
    sneaker: `<svg viewBox="0 0 100 100"><path ${f} d="M10 65 L10 55 C10 50 15 48 20 48 L32 48 L40 35 C42 32 46 30 50 32 L58 38 C62 42 68 46 76 48 L86 52 C90 54 90 58 90 62 L90 68 C90 72 88 74 84 74 L16 74 C12 74 10 72 10 68 Z"/></svg>`,
    hoodie:  `<svg viewBox="0 0 100 100"><path ${f} d="M28 25 C28 18 34 14 42 14 L58 14 C66 14 72 18 72 25 L72 32 L82 38 L82 50 L76 50 L76 82 C76 86 72 88 68 88 L32 88 C28 88 24 86 24 82 L24 50 L18 50 L18 38 Z"/><path fill="rgba(0,0,0,0.25)" d="M42 14 C42 22 46 26 50 26 C54 26 58 22 58 14 Z"/></svg>`,
    tee:     `<svg viewBox="0 0 100 100"><path ${f} d="M30 22 L42 18 C44 24 48 26 50 26 C52 26 56 24 58 18 L70 22 L82 34 L74 44 L68 40 L68 84 L32 84 L32 40 L26 44 L18 34 Z"/></svg>`,
    jacket:  `<svg viewBox="0 0 100 100"><path ${f} d="M30 20 L42 16 L50 30 L58 16 L70 20 L80 32 L76 44 L70 42 L70 86 L30 86 L30 42 L24 44 L20 32 Z"/></svg>`
  };
  return icons[type] || icons.tee;
}

/* --- Product image renderer (uses real image if available) --- */
function productVisual(p, colorOverride) {
  if (p.imageUrl) return `<img src="${p.imageUrl}" alt="${p.name}" loading="lazy">`;
  return iconSvg(p.icon, colorOverride || p.colors[0]);
}