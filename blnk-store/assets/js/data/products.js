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
      "assets/images/products/caps/9d115c69d0099dab31d28cd6daeccd5d.jpg",
      "assets/images/products/caps/b073d524df824854a15fc98b14b3a88f.jpg",
      "assets/images/products/caps/c6c872658d7377bf29bdc21617215a7a.jpg",
      "assets/images/products/caps/3497b9ce4b5c97b466f6f38ca73ad36f.jpg",
      "assets/images/products/caps/63542b8d01444beb8238beb5438da5e3.jpg",
      "assets/images/products/caps/b8b657954c3b733ccaf3a51f29d7dbdc.jpg"
    ]
  },
  sneakers: {
    icon: "sneaker", placeholder: "assets/images/products/sneaker-002-placeholder.svg",
    sizes: ["39", "40", "41", "42", "43", "44", "45"], colors: ["#f2efe9", "#111111", "#d9b57d"],
    names: ["Samba Low", "Retro 4", "Suede Runner", "Court Low", "Dunk Low", "Street Boot"],
    prices: [4200, 4800, 4300, 3900, 4500, 5200],
    images: [
      "assets/images/products/sneakers/39ea4631bb7fa46e99c1ad7a476b0fa2.jpg",
      "assets/images/products/sneakers/51d7599fa06122109e084de9bde12b90.jpg",
      "assets/images/products/sneakers/761b7b8f93874d2f5defb71c17e7fc94.jpg",
      "assets/images/products/sneakers/7be934838af44e6c1dab225791093700.jpg",
      "assets/images/products/sneakers/08fa55ed020625e92b392afa75a35967.jpg",
      "assets/images/products/sneakers/6068a8f7e1b3e5cade9009220ba051e1.jpg"
    ]
  },
  hoodies: {
    icon: "hoodie", placeholder: "assets/images/products/hoodie-002-placeholder.svg",
    sizes: ["S", "M", "L", "XL"], colors: ["#111111", "#d6d0c6", "#4d5a4a"],
    names: ["Zip Hoodie", "Pullover", "Heavy Hoodie", "Core Hoodie", "Studio Hoodie", "Box Hoodie"],
    prices: [3900, 3600, 4400, 3800, 4200, 4100],
    images: [
      "assets/images/products/hoodies/2670929391d1944c1d40dfb8dd4a3c43.jpg",
      "assets/images/products/hoodies/3a12665d1616c53134e47e4abfd7bbed.jpg",
      "assets/images/products/hoodies/92c7bb85372102e071e656c318e86e45.jpg",
      "assets/images/products/hoodies/a08b665f87ef021ce8bbaa23c17da95f.jpg",
      "assets/images/products/hoodies/a47fd40d3e6f5f4d6fc5990ce2821eb1.jpg",
      "assets/images/products/hoodies/b506004f34f998cb30a8522b13071af4.jpg"
    ]
  },
  tees: {
    icon: "tee", placeholder: "assets/images/products/tee-001-placeholder.svg",
    sizes: ["S", "M", "L", "XL"], colors: ["#ffffff", "#111111", "#c8c2b4"],
    names: ["Graphic Tee", "Bad Intentions Tee", "Motion Tee", "Heavy Tee", "Studio Tee", "Box Tee"],
    prices: [2100, 1900, 2000, 2300, 2200, 2400],
    images: [
      "assets/images/products/tees/6aa60be137cfa5470a55cbc01a1e7ce6.jpg",
      "assets/images/products/tees/c3a60bb9eb87f5f331887349118acc03.jpg",
      "assets/images/products/tees/3ebfdc39e91416d8747dcaa11e4d1c5b.jpg",
      "assets/images/products/tees/2f43594bd5c463337b4b08cfa4c296b1.jpg",
      "assets/images/products/tees/f4188909135c3cc1ce7087d37e3f838f.jpg",
      "assets/images/products/tees/8ae78d5bcb5ce5c8f009d5780d47ae58.jpg"
    ]
  },
  jackets: {
    icon: "jacket", placeholder: "assets/images/products/jacket-001-placeholder.svg",
    sizes: ["S", "M", "L", "XL"], colors: ["#111111", "#25364a", "#d9d4c8"],
    names: ["Varsity Leather", "Track Jacket", "Flight Jacket", "Field Jacket", "Utility Jacket", "Daily Jacket"],
    prices: [6200, 5400, 5800, 6900, 6400, 5200],
    images: [
      "assets/images/products/jackets/854356544e9405dc51da42fde1aa34b0.jpg",
      "assets/images/products/jackets/9437e29b555e0acf9b09c89aa2d9008f.jpg",
      "assets/images/products/jackets/f6179bb48918981b264bcdc867934093.jpg",
      "assets/images/products/jackets/ui.jpg",
      "assets/images/products/jackets/008fe03a197ce0b654d70fdfea8e5d2c.jpg",
      "assets/images/products/jackets/8c67c99f3fd3d807bd98b81416410a1c.jpg"
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
