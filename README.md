# BLANX Store — V2

Static, no-build fashion storefront for BLANX. The V2 frontend is intentionally simple: HTML + CSS + browser JavaScript, deployed directly by Vercel.

## Structure

- `index.html` — homepage, shop, lookbook and about sections
- `assets/css/main.css` — global design system and responsive layout
- `assets/css/pages.css` — page-specific extension point
- `assets/js/data/products.js` — product catalogue and image paths
- `assets/js/pages/home.js` — product rendering, filtering, quick view, cart and search
- `assets/js/ui.js` — shared header, footer, search, cart drawer and modal
- `assets/js/cart.js` — local cart persistence
- `assets/Products/` — product photography, grouped by category
- `vercel.json` — Vercel static deployment configuration

## Product images

Image paths are case-sensitive and point to the files actually committed under `assets/Products/`.
Do not rename `Products` to `products` on Linux/Vercel. When adding a product, add its exact image path to `assets/js/data/products.js`.

The storefront also has a visual fallback, so a missing image will not break the product card or modal.

## V2 notes

- Category filters render from the product catalogue rather than duplicating product markup.
- Product cards are keyboard accessible.
- Search, modal, cart and navigation support Escape/mobile interactions.
- Cart items retain their product image path when added to the cart.
- WhatsApp checkout remains the current order flow.
- No secrets are stored in frontend JavaScript.

## Deploy

Vercel can deploy this repository as a static site with the project root as the output directory. The production source for V2 should be the `v2` branch until the release has been visually and functionally verified; merge it to `main` after approval.

## Important

This V2 repository does not currently contain the M-Pesa serverless API described in older documentation. Do not advertise M-Pesa as active until a real server-side payment implementation and persistent order storage are added.
