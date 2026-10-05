/* ============================================================
   CONFIG — the one place for site-wide settings
   ============================================================ */
const BLANX = {
  whatsapp: "254104273995",
  sanity: {
    enabled: false,                       // flip to true once Sanity is set up
    projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
    dataset: "production"
  },
  // pages/ lives one level down, so links and assets need a prefix there
  base: location.pathname.includes("/pages/") ? "../" : ""
};

const WHATSAPP_NUMBER = BLANX.whatsapp;
const money = n => `KES ${Number(n).toLocaleString()}`;
const swatch = c => `<i class="swatch" style="background:${c}"></i>`;
