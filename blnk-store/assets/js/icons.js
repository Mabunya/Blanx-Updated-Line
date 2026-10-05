/* ============================================================
   ICONS — SVG placeholders used when a product has no image
   ============================================================ */
function iconSvg(type, color) {
  const f = `fill="${color || "#2a2a2a"}"`;
  const icons = {
    cap:     `<svg viewBox="0 0 100 100"><path ${f} d="M20 60 C20 40 30 25 50 25 C70 25 80 40 80 60 L80 62 L20 62 Z"/><path ${f} d="M20 62 L12 62 C12 70 20 74 30 74 L80 74 L80 62 Z"/></svg>`,
    sneaker: `<svg viewBox="0 0 100 100"><path ${f} d="M10 65 L10 55 C10 50 15 48 20 48 L32 48 L40 35 C42 32 46 30 50 32 L58 38 C62 42 68 46 76 48 L86 52 C90 54 90 58 90 62 L90 68 C90 72 88 74 84 74 L16 74 C12 74 10 72 10 68 Z"/></svg>`,
    hoodie:  `<svg viewBox="0 0 100 100"><path ${f} d="M28 25 C28 18 34 14 42 14 L58 14 C66 14 72 18 72 25 L72 32 L82 38 L82 50 L76 50 L76 82 C76 86 72 88 68 88 L32 88 C28 88 24 86 24 82 L24 50 L18 50 L18 38 Z"/><path fill="rgba(0,0,0,0.25)" d="M42 14 C42 22 46 26 50 26 C54 26 58 22 58 14 Z"/></svg>`,
    tee:     `<svg viewBox="0 0 100 100"><path ${f} d="M30 22 L42 18 C44 24 48 26 50 26 C52 26 56 24 58 18 L70 22 L82 34 L74 44 L68 40 L68 84 L32 84 L32 40 L26 44 L18 34 Z"/></svg>`,
    jacket:  `<svg viewBox="0 0 100 100"><path ${f} d="M30 20 L42 16 L50 30 L58 16 L70 20 L80 32 L76 44 L70 42 L70 86 L30 86 L30 42 L24 44 L20 32 Z"/></svg>`
  };
  return icons[type] || icons.tee;
}

/* Real image if the product has one, otherwise the icon in the chosen colour */
function productVisual(p, color) {
  if (p.imageUrl) {
    const src = /^(https?:|data:)/.test(p.imageUrl) ? p.imageUrl : BLANX.base + p.imageUrl;
    const icon = ["cap", "sneaker", "hoodie", "tee", "jacket"].includes(p.icon) ? p.icon : "tee";
    const placeholderColor = /^#[\da-f]{3,8}$/i.test(color || p.colors?.[0] || "") ? (color || p.colors[0]) : "#2a2a2a";
    return `<img src="${src}" alt="${p.name}" loading="lazy" data-placeholder-type="${icon}" data-placeholder-color="${placeholderColor}">`;
  }
  return iconSvg(p.icon, color || p.colors[0]);
}

document.addEventListener("error", event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.dataset.placeholderType) return;
  const placeholder = document.createElement("template");
  placeholder.innerHTML = iconSvg(image.dataset.placeholderType, image.dataset.placeholderColor);
  image.replaceWith(placeholder.content.firstElementChild);
}, true);
