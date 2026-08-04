# Context — Arenguade Tila Cafe & Restaurant

> **What this file is:** A living description of what this application is, how it is
> built, and how its parts fit together. Read this before changing anything.

---

## 1. What the application is

**Arenguade Tila (አረንጓዴ ጥላ — "Green Shadow") Cafe & Restaurant** is the public web
presence for an Ethiopian restaurant & cafe in Addis Ababa
(3rd floor, ሀይለማርያም ህንፃ / Hailemariam Building, Kenenisa Avenue).

It is a **two-page, vanilla-HTML/JS application** (plus an unused React scaffold):

| Page | File | Audience | Purpose |
|------|------|----------|---------|
| Customer site | `index.html` | Guests | Showcase brand, menu, events, rewards (spin wheel), reservations, contact, ratings |
| Admin dashboard | `admin.html` | Staff | View, filter, update, and delete table reservations |

The site is **visually premium**: a navy/black theme with gold accents
(`#D4AF37`), Playfair Display + Noto Serif Ethiopic + Poppins fonts, glassmorphism
cards, scroll-reveal animations, and an interactive canvas spin wheel. Copy is
bilingual (English with Amharic brand text and menu names).

---

## 2. Tech stack

- **Build/dev:** Vite 6, Node, `npm run dev` → `http://localhost:3000` (port 3000)
- **Frontend:** Plain HTML + CSS + vanilla JS (the real app lives in `index.html` /
  `admin.html`)
- **React scaffold (mostly unused):** React 19 + Vite template in `src/`
  - `src/App.tsx` renders an empty `<div>` — a leftover template stub
  - `src/Silk.jsx` / `src/SilkMount.jsx` — a Three.js silk-shader animated
    background component, wired to mount on `#silk-container` (not currently used by
    the customer page)
- **API proxy:** `vite.config.ts` proxies `/api` → `http://localhost:3001`
- **Backend:** Not in this repo — a separate server (Express + Gemini API per
  `package.json` / AI Studio metadata) is expected on port 3001, exposing
  `/api/reservation` and `/api/admin/reservations`. `metadata.json` declares
  `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` and `npm run clean` removes a generated
  `server.js`, which supports that the backend is AI Studio-generated.
- **One-off patch scripts at the repo root:** a history of `fix-*.cjs` /
  `remove-*.cjs` Node scripts used earlier to patch `index.html`. These are
  **patch leftovers**, not part of the runtime app.

---

## 3. Customer site (`index.html`) — how it works

### 3.1 Navigation model
The site is a **single HTML page with JS "view switching"** instead of real routes:

- Sections are wrapped in `<div class="page-view" id="view-*">` blocks
- `navigateTo(viewId)` (in the inline `<script>`) hides/shows page-views and
  smooth-scrolls; `view-full-menu` shows a separate `#full-menu-page`
- Nav links + hero CTA + footer links all call `navigateTo(...)`
- There are also direct scroll-target sections (`#about`, `#hero`) and a mobile
  hamburger menu (`toggleMenu`)

### 3.2 Sections present
1. **Hero** — full-screen, background image `/bg%20image.jpg`, headline, CTA
2. **About** — image grid + story + badge row
3. **Signature Experience** — 3 cards (coffee, injera, dining)
4. **Featured Menu** — tabbed grid populated by JS (`menuTabs` + `menuGrid`)
5. **Weekly Events** — populated by JS into `#weeklyEvents`
6. **Rewards** — "Tag & Win" card + **Spin & Win canvas wheel** (`#wheel`)
7. **Reservations** — `#resForm` form; submits to `POST /api/reservation`
8. **Contact** — info + map directions + a message form (client-side only, no API call)
9. **Rate Us** — star-rating form (`hoverRating` / `setRating` / `renderStars`), client-side only
10. **Full Menu page** — `#full-menu-page` with tabs + grid from `menuData`
11. **Footer** — links, hours, newsletter form (client-side only)

### 3.3 Data
- **Menu data** is hard-coded in JS as `menuData` — a dictionary keyed by Amharic
  category names (e.g. `የፆም ምሳ` — fasting lunch) with `{n, d, p}` items
  (name, description, price in ETB). Tabs are generated from `Object.keys(menuData)`.
- **Events** data is a hard-coded JS array of weekly events.
- **Images** are generated on the fly from `image.pollinations.ai` prompts
  (menu items, about grid) — no local image assets (except the hero bg).

### 3.4 The Spin Wheel
- Canvas `#wheel` drawn by `drawWheel()`
- `spinWheel()` computes a target rotation (`wheelDeg`), animates via CSS
  `transform: rotate(...)` with a 4.5s cubic-bezier transition
- Tick + win sounds via Web Audio API (`initAudio`, `scheduleTickSound`,
  `scheduleWinSound`)
- Result shown in `#spinResult`; button disabled while `spinning`

### 3.5 Forms (current behavior — **client-side only for most**)
| Form | Target | What happens |
|------|--------|--------------|
| Reservation `#resForm` | `POST /api/reservation` | JSON post with name/phone/date/time/guests/occasion/notes; success replaces form with a thank-you block |
| Contact message | — | `preventDefault()` + inline "Message Sent!" HTML swap. **No data sent** |
| Rate Us | — | `preventDefault()` + inline "Thank You!". **No data sent** |
| Newsletter (footer) | — | `alert('Subscribed!')` + reset. **No data sent** |

---

## 4. Admin dashboard (`admin.html`) — how it works

### 4.1 Auth (current — **weak**)
- Reads `admin_key` from `sessionStorage`
- If absent, shows a `prompt()` for the **Admin API Key**, stores it in
  `sessionStorage`
- Every request sends the key as header `x-api-key`
- Server is expected to reject with **403** for invalid keys

### 4.2 Data & actions
- `GET /api/admin/reservations` (with `x-api-key`) → `{data: [...]}` or array;
  newest first
- **Status flow:** `pending → confirmed → cancelled` (select + Save button →
  `PUT /api/admin/reservations/:id`)
- **Delete** → `DELETE /api/admin/reservations/:id` (with `confirm()` dialog)
- **Filter buttons** (All / Pending / Confirmed / Cancelled) re-render the grid
- **Stats cards** (Total / Pending / Confirmed) update from `allData`

### 4.3 UI affordances
- Sticky navbar with logo + "Refresh Data" button
- Stat cards, filter pills, responsive card grid
- Each card: name, status badge, phone, date · time, guests, occasion, notes box,
  timestamp, status select, Save + Delete buttons
- Toast notifications (`showToast`), loading spinner, empty-state panel
- Glassmorphism styling consistent with the customer site's navy/gold theme

---

## 5. Key technical observations & known gaps

1. **Auth is a bare `prompt()` + header key** — no login page, no logout, no roles,
   no session expiry, key visible to anyone inspecting the page.
2. **Admin dashboard is functional but flat** — one screen, no sidebar/navigation,
   no search, no pagination, no export, no per-reservation detail view, no activity
   log, no charts. It lists reservations and lets you change status — that's all.
3. **Forms are inconsistent** — only the reservation form actually POSTs; contact,
   rating, and newsletter forms fake success on the client. No validation UX,
   no success/error styling, no loading state.
4. **`prompt()` and `confirm()`** are used for critical flows — poor UX, no
   accessibility.
5. **XSS hygiene** — admin card rendering uses template literals with raw
   `r.name`, `r.notes` etc. If the API returns untrusted data, this is injectable.
6. **No local assets** — everything is remote (`pollinations.ai`, picsum) or
   expected at `/bg%20image.jpg`.
7. **React scaffold is dead weight** — `src/App.tsx` is an empty stub; only
   `Silk.jsx`/`SilkMount.jsx` are functional, and not wired into the customer page.
8. **Root patch scripts (`fix-*.cjs` etc.)** are leftovers from iterative editing —
   noise in the repo (note: `index.html` is large; some CSS-only blocks like the
   gallery/lightbox styles may be unused — worth a verification pass before removal).
9. **No README for this app** — the existing README is the generic AI Studio
   template.
10. **No backend in repo** — everything depends on an external `:3001` server;
   the admin page shows a fallback error when it's unreachable.

---

## 6. What the app is "about" (the idea)

- **Brand story:** *"More Than a Meal — An Experience."* Authentic Ethiopian
  cuisine, traditional coffee ceremony, live events, and warm hospitality in a
  premium, modern setting.
- **Business goals reflected in the site:**
  - Drive **table reservations** (the only fully wired conversion path)
  - Showcase **menu & events** (bilingual, attractive)
  - Grow social presence via **"Tag & Win"** (#ArenguadeTila)
  - Engage customers with **Spin & Win** rewards and **Rate Us** feedback
  - Let staff **manage reservations** from an admin dashboard

In short: a **marketing site + reservation funnel + lightweight back-office tool**
for a single restaurant location.
