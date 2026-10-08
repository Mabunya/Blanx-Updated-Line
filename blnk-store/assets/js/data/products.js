/* ============================================================
   STATIC PRODUCTS — used when Sanity is off or unreachable.
   Add a product by adding one name and price to its category.
   Shared sizes, colors, icons, descriptions, and placeholders are
   supplied automatically; replace the placeholder with imageUrl when
   a final product image is ready.
   ============================================================ */
const PRODUCT_CONFIG = {
  caps: {
    icon: "cap", placeholder: "assets/images/products/cap-002-placeholder.svg",
    sizes: ["ONE SIZE"], colors: ["#111111", "#d8d2c8", "#6f7a63"],
    names: ["Cap", "Dad Cap", "Five Panel", "Canvas Cap", "Washed Cap", "Cord Cap"],
    prices: [1800, 1600, 1900, 2100, 1700, 2000],
    images: [
      "assets/images/products/caps/1.jpg",
      "assets/images/products/caps/2.jpg",
      "assets/images/products/caps/3.jpg",
      "assets/images/products/caps/4.jpg",
      "assets/images/products/caps/5.jpg",
      "assets/images/products/caps/6.jpg"
    ]
  },
  sneakers: {
    icon: "sneaker", placeholder: "assets/images/products/sneaker-002-placeholder.svg",
    sizes: ["39", "40", "41", "42", "43", "44", "45"], colors: ["#f2efe9", "#111111", "#d9b57d"],
    names: ["Samba Low", "Retro 4", "Suede Runner", "Court Low", "Dunk Low", "Street Boot"],
    prices: [4200, 4800, 4300, 3900, 4500, 5200],
    images: [
      "assets/images/products/sneakers/r1.jpg",
      "assets/images/products/sneakers/r2.jpg",
      "assets/images/products/sneakers/r3.jpg",
      "assets/images/products/sneakers/r4.jpg",
      "assets/images/products/sneakers/r5.jpg",
      "assets/images/products/sneakers/r6.jpg"
    ]
  },
  hoodies: {
    icon: "hoodie", placeholder: "assets/images/products/hoodie-002-placeholder.svg",
    sizes: ["S", "M", "L", "XL"], colors: ["#111111", "#d6d0c6", "#4d5a4a"],
    names: ["Zip Hoodie", "Pullover", "Heavy Hoodie", "Core Hoodie", "Studio Hoodie", "Box Hoodie"],
    prices: [3900, 3600, 4400, 3800, 4200, 4100],
    images: [
      "assets/images/products/hoodies/j1.jpg",
      "assets/images/products/hoodies/j2.jpg",
      "assets/images/products/hoodies/j3.jpg",
      "assets/images/products/hoodies/j4.jpg",
      "assets/images/products/hoodies/j5.jpg",
      "assets/images/products/hoodies/j6.jpg"
    ]
  },
  tees: {
    icon: "tee", placeholder: "assets/images/products/tee-001-placeholder.svg",
    sizes: ["S", "M", "L", "XL"], colors: ["#ffffff", "#111111", "#c8c2b4"],
    names: ["Graphic Tee", "Bad Intentions Tee", "Motion Tee", "Heavy Tee", "Studio Tee", "Box Tee"],
    prices: [2100, 1900, 2000, 2300, 2200, 2400],
    images: [
      "assets/images/products/tees/t1.jpg",
      "assets/images/products/tees/t2.jpg",
      "assets/images/products/tees/t3.jpg",
      "assets/images/products/tees/t4.jpg",
      "assets/images/products/tees/t5.jpg",
      "assets/images/products/tees/t6.jpg"
    ]
  },
  jackets: {
    icon: "jacket", placeholder: "assets/images/products/jacket-001-placeholder.svg",
    sizes: ["S", "M", "L", "XL"], colors: ["#111111", "#25364a", "#d9d4c8"],
    names: ["Varsity Leather", "Track Jacket", "Flight Jacket", "Field Jacket", "Utility Jacket", "Daily Jacket"],
    prices: [6200, 5400, 5800, 6900, 6400, 5200],
    images: [
      "assets/images/products/jackets/a1.jpg",
      "assets/images/products/jackets/a2.jpg",
      "assets/images/products/jackets/a3.jpg",
      "assets/images/products/jackets/a4.jpg",
      "assets/images/products/jackets/a5.jpg",
      "assets/images/products/jackets/a6.jpg"
    ]
  }
};

const STATIC_PRODUCTS = Object.entries(PRODUCT_CONFIG).flatMap(([category, config]) =>
  config.names.map((name, index) => ({
    id: `${category.slice(0, -1)}-${String(index + 1).padStart(3, "0")}`,
    name: `BLANX ${name}`,
    price: config.prices[index],
    category,
    badge: index === 0 ? "NEW" : "",
    desc: `${name} made for clean everyday styling and easy rotation.`,
    colors: config.colors,
    sizes: config.sizes,
    imageUrl: config.images[index] || config.placeholder,
    icon: config.icon
  }))
);
