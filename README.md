# BLANX Store

Static multi-page store (no build step) + Vercel serverless functions for M-Pesa.

## Folder map

```
blnk-store/
├── index.html                 Home: hero, product grid, lookbook, about
├── pages/
│   ├── product.html           Single product  (?id=hoodie-001)
│   ├── cart.html              Full cart page
│   └── checkout.html          Details form → M-Pesa STK push or WhatsApp
├── assets/
│   ├── css/
│   │   ├── main.css           Tokens, header/footer, buttons, home, drawer, modal
│   │   └── pages.css          Product / cart / checkout styles
│   ├── js/
│   │   ├── config.js          WhatsApp number, Sanity on/off  ← site settings
│   │   ├── data/products.js   Static product list             ← add products here
│   │   ├── data/store.js      Loads Sanity, falls back to static
│   │   ├── icons.js           SVG placeholders + image renderer
│   │   ├── cart.js            Cart state + quick WhatsApp order
│   │   ├── ui.js              Header, footer, drawer, modal, search (injected on every page)
│   │   └── pages/             One small script per page
│   └── images/                products/  lookbook/  brand/
├── api/
│   ├── mpesa/                 stkpush.js · callback.js · status.js
│   └── _lib/                  daraja.js (helpers) · store.js (orders)
├── sanity/schema/             Copy into your Sanity Studio
├── .env.example               → copy to .env.local
├── package.json · vercel.json · .gitignore
```

Header, footer, cart drawer, quick-view modal and search are injected by `ui.js`,
so the four HTML files only hold their own content.

## Run it

- Front end only: open `index.html` (M-Pesa won't work this way).
- Everything: `npm i -g vercel`, then `vercel dev` → http://localhost:3000

## Common jobs

| I want to… | Go to |
|---|---|
| Add / edit a product | `assets/js/data/products.js` (or Sanity once enabled) |
| Use my own product photo | Put it in `assets/images/products/`, then `imageUrl: "assets/images/products/x.jpg"` |
| Change WhatsApp number | `assets/js/config.js` |
| Change header/footer/nav links | `layoutTop()` / `layoutBottom()` in `assets/js/ui.js` |
| Change colours, fonts | `:root` in `assets/css/main.css` |
| Add a new page | New file in `pages/`, copy `cart.html`, add `<script>` in `assets/js/pages/` |
| Turn on Sanity | `config.js`: set `projectId`, `enabled: true`; add your site URL to Sanity CORS |

## M-Pesa (Daraja sandbox)

1. https://developer.safaricom.co.ke → create a **Lipa Na M-Pesa Sandbox** app.
2. Copy `.env.example` to `.env.local`, fill in key, secret, passkey (shortcode `174379`).
3. Daraja can't reach localhost: run `npx ngrok http 3000` and put the ngrok URL in `DARAJA_CALLBACK_URL`.
4. Test with phone `254708374149`.
5. On Vercel, add the same variables under Settings → Environment Variables.

**Before going live:** `api/_lib/store.js` keeps orders in memory, which Vercel doesn't share between
function instances, so a callback can miss the order. Replace the bodies with Vercel KV
(`npm i @vercel/kv`, then `kv.set` / `kv.get` using the same function names).

## Deploy

Push to GitHub → import in Vercel → Framework "Other", output directory `.` → deploy.
