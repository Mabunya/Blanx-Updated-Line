/* ============================================================
   STORE — loads products (Sanity first, static fallback)
   ============================================================ */
let PRODUCTS = [...STATIC_PRODUCTS];

function categoryToIcon(cat) {
  const map = { caps: "cap", sneakers: "sneaker", hoodies: "hoodie", tees: "tee", jackets: "jacket" };
  return map[(cat || "").toLowerCase()] || "tee";
}

async function fetchSanityProducts() {
  const { projectId, dataset } = BLANX.sanity;
  const query = encodeURIComponent(`*[_type == "product" && inStock] | order(_createdAt desc) {
    _id, name, "slug": slug.current, price, category, description, sizes, colors, badge,
    "imageUrl": images[0].asset->url
  }`);
  const url = `https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}?query=${query}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Sanity fetch failed");
  const data = await res.json();

  return (data.result || []).map(p => ({
    id: p.slug || p._id,
    name: p.name,
    price: p.price,
    category: p.category,
    desc: p.description || "",
    colors: p.colors && p.colors.length ? p.colors : ["#111111"],
    sizes: p.sizes && p.sizes.length ? p.sizes : ["ONE SIZE"],
    imageUrl: p.imageUrl || null,
    badge: p.badge || null,
    icon: categoryToIcon(p.category)
  }));
}

async function loadProducts() {
  if (!BLANX.sanity.enabled) return PRODUCTS;
  try {
    const live = await fetchSanityProducts();
    if (live.length) PRODUCTS = live;
  } catch (err) {
    console.warn("[BLANX] Sanity failed, using static data:", err);
  }
  return PRODUCTS;
}
