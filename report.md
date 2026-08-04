# Report — What To Do, By Criticality

> **Purpose:** A prioritized, actionable roadmap for improving **Arenguade Tila
> Cafe & Restaurant** (see `context.md` for the full app context).
>
> **Priority legend**
> - 🔴 **CRITICAL** — blocks launch / is broken / is a security or data risk → do first
> - 🟠 **HIGH** — big user or business value, low risk → do next
> - 🟡 **MEDIUM** — important polish / capability → schedule
> - 🟢 **LOW** — nice-to-have, cleanup, future
>
> Each item has **why**, **what**, and (where useful) **how** so it can be picked up
> without re-analysis.

---

## Phase 0 — Foundation & Quick Wins (do first, low effort, high impact)

> Phase 0 is deliberately **"do first regardless of severity"** — these are small,
> safe, high-value wins. Some (C3, C4) are labeled HIGH rather than CRITICAL because
> they're improvements, not blockers, but they're cheap enough to do immediately.

### 🔴 C1. Wire up the reservation backend reliably
- **Why:** The only real conversion path is `POST /api/reservation` → `:3001`. Without a
  working backend the site "works" but silently loses bookings.
- **What:** Verify server on port 3001 accepts reservations; confirm CORS/proxy works;
  add a clear error state if the API is unreachable. (See F3.)

### 🔴 C2. Secure the admin key flow
- **Why:** `prompt()` + `sessionStorage` is weak; the key is visible in DevTools and
  there's no logout or expiry. Admin data can be read by anyone with the key.
- **What:** Replace with a real login screen (see A1–A5). Minimum viable step: stop
  using `prompt()`; add a styled login overlay, key rotation guidance, and a Logout
  button that clears `sessionStorage`.

### 🟠 C3. Make all public forms honest
- **Why:** Contact, Rate Us, and Newsletter forms currently fake success
  (`innerHTML` swap / `alert`). Users think their message was sent when nothing
  happened — a trust and data-loss issue.
- **What:** Either (a) POST them to backend endpoints (preferred), or (b) clearly
  label them as "coming soon". Never fake success.

### 🟠 C4. Escape user data in admin cards (XSS hygiene)
- **Why:** `admin.html` builds cards with template literals using raw `r.name`,
  `r.notes`, etc. If the API ever returns untrusted/attacker-controlled data, this
  becomes stored XSS.
- **What:** Add a small `esc()` helper (HTML-escape) applied to every interpolated
  reservation field.

---

## Phase 1 — Authentication (A1–A6)

### 🔴 A1. Real login page/overlay for admin
- **Why:** `prompt()` is ugly, unstyled, un-loggable, and not testable.
- **What:** Build a branded login overlay matching the navy/gold theme (logo,
  password field with show/hide, error shake, Enter-to-submit, loading state).
  On success store a session token; on 403 show "Invalid key".

### 🟠 A2. Logout + session lifecycle
- **Why:** Staff need a way to sign out (shared computers).
- **What:** Navbar "Logout" button clears `sessionStorage`/`localStorage`, returns to
  login. Consider session expiry (e.g. token TTL checked on each fetch).

### 🟠 A3. Server-side auth enforcement (backend)
- **Why:** Client-side hiding isn't security; the API must reject unauthenticated
  calls.
- **What:** On `:3001`, require `x-api-key` (or a Bearer token) for all
  `/api/admin/*` routes; return 401/403 with JSON `{error}` consistently; never
  ship the key in the frontend bundle.

### 🟡 A4. Rate limiting & brute-force protection (backend)
- **Why:** Prevent key guessing/abuse.
- **What:** Rate-limit login attempts (e.g. 5/min/IP) and API calls; small
  backoff on failure.

### 🟡 A5. Role-based access (optional, future)
- **Why:** Maybe managers vs. staff see different things.
- **What:** Extend token payload with a `role` field; gate endpoints (e.g.
  delete = admin only).

### 🟢 A6. Admin audit log
- **Why:** Know who changed/ deleted what.
- **What:** Record `{who, action, id, timestamp}` on status updates/deletes;
  show recent activity on the dashboard.

---

## Phase 2 — Admin Dashboard: Attractive & Interactive (D1–D12)

### 🟠 D1. Sidebar navigation + page structure
- **Why:** Currently one flat page. A sidebar (Dashboard / Reservations / Menu /
  Events / Customers / Settings) signals a real product and scales as features grow.
- **What:** Collapsible dark sidebar (gold accents), active-state highlight, mobile
  drawer. Content area renders the active view. Keep the current reservations view
  as the default Dashboard/Reservations tab.

### 🟠 D2. Upgrade stat cards into an interactive overview
- **Why:** Static numbers underuse the space.
- **What:** Add: mini trend sparkline (SVG), today/new-today counter, quick-filter
  click-through (click "Pending" → filtered list), and a "view all" link. Add
  `cancelled` stat (currently counted but not shown in the stat row).

### 🟡 D3. Reservation search & filters
- **Why:** As reservations grow, scrolling cards doesn't scale.
- **What:** Debounced search box (name, phone, date), combined with status pills;
  date-range filter; sort by newest/oldest/date. Show "X of Y" count.

### 🟡 D4. Pagination / infinite scroll
- **Why:** Performance and sanity with many bookings.
- **What:** Page at 12–24 cards server-side (or virtualize client-side); keep
  counts in the API response.

### 🟡 D5. Detail view / drawer per reservation
- **Why:** Cards truncate info (long notes, occasion, history).
- **What:** Click a card → slide-in drawer with full details, status timeline
  (created → updated → confirmed), and quick actions.

### 🟡 D6. Bulk actions
- **Why:** Speed up routine work.
- **What:** Checkboxes per card + "Select all"; bulk confirm/cancel/delete with
  confirmation modal (replace `confirm()`).

### 🟡 D7. Keyboard shortcuts & toast upgrades
- **Why:** Power-user feel.
- **What:** `R` refresh, `1/2/3` filters, `Esc` close drawer; toasts with types
  (success/error/info), stacking, and auto-dismiss.

### 🟡 D8. Empty, loading & error states that are beautiful
- **Why:** These states currently show raw text.
- **What:** Animated skeleton cards on load; illustrated empty state; error state
  with "Retry" button; disable actions during in-flight requests (button spinners).

### 🟢 D9. CSV export
- **Why:** Staff may want reservations in Excel.
- **What:** "Export CSV" button (respects current filter) using a Blob download —
  no library needed.

### 🟢 D10. Menu management
- **Why:** `menuData` is hard-coded in `index.html`; staff can't edit the menu.
- **What:** Admin "Menu" tab → CRUD for categories/items (name, Amharic name,
  description, price, image). Serve via API; `index.html` fetches and renders from
  the API (falling back to bundled data).

### 🟢 D11. Charts & insights (future)
- **Why:** Management visibility.
- **What:** Weekly bookings bar chart, busiest day/hour, average guests per party —
  lightweight canvas/SVG charts or a small chart lib if already present.

### 🟢 D12. Mobile/tablet admin polish
- **Why:** Staff may manage from phones.
- **What:** Ensure grid → single column, sticky action bar, touch-friendly
  controls.

---

## Phase 3 — Forms: Clean & Attractive (F1–F9)

### 🟠 F1. Consistent form system across the site
- **Why:** Each form has its own inline styles (`.premium-input` is even defined
  inside `<style>` in the middle of the reservation form).
- **What:** Extract shared form CSS (inputs, labels, errors, buttons) into the
  main `<style>`; add labels (not just placeholders), `autocomplete`, proper
  `name` attributes.

### 🟠 F2. Real client-side validation with inline errors
- **Why:** `required` alone gives inconsistent browser bubbles.
- **What:** Validate on submit + on blur: name (min 2 chars), phone (Ethiopian
  format +251 9XXXXXXXX), date (not in the past), guests (1–30), email format for
  contact/newsletter. Show per-field error messages with red/gold styling and
  focus the first invalid field.

### 🟠 F3. Success / error / loading states on every submit
- **Why:** Currently: reservation form swaps to thank-you HTML; others fake it.
- **What:** Disable button + spinner while submitting; on success show a designed
  confirmation (icon, message, "Make another booking" reset); on failure keep the
  form filled and show an error banner with Retry.

### 🟡 F4. Reservation form UX improvements
- **Why:** Good conversion lever.
- **What:** Date picker constrained to opening days/times; guest-stepper UI;
  occasion as a nicer select/radio; live summary ("Thursday, 7:00 PM · 4 guests").

### 🟡 F5. Anti-spam on public forms
- **Why:** Public POST endpoints get spam.
- **What:** Honeypot field (hidden input, reject if filled) — zero friction, no
  captcha needed for a local restaurant.

### 🟡 F6. Rate-Us upgrade
- **Why:** Currently stars + fake submit.
- **What:** POST to API (`/api/review`); store rating + comment + optional
  name/visit date; show recent reviews (testimonial slider could source from this).

### 🟡 F7. Contact form wired to email
- **Why:** Contact messages should reach staff.
- **What:** POST `/api/contact` → server sends email/SMS (or stores + notifies);
  show real success/error states.

### 🟢 F8. Newsletter subscription persistence
- **Why:** Building a subscriber list.
- **What:** POST `/api/subscribe` (email validation + honeypot), store list, show
  "Welcome to the family!" state.

### 🟢 F9. Accessibility pass on forms
- **Why:** Legal/UX baseline.
- **What:** Real `<label for>`, `aria-required`, `aria-invalid` + `aria-describedby`
  error links, focus management after submit, `prefers-reduced-motion` respect.

---

## Phase 4 — Clean & Attractive: Site-Wide Plan (S1–S10)

### 🟠 S1. Adopt one design system
- **Why:** CSS is duplicated between `index.html` and `admin.html`, with inline
  `<style>` blocks scattered in forms.
- **What:** Centralize: color tokens (navy/gold/white/gray), radius, spacing,
  button styles, input styles, card styles. If both pages must stay standalone,
  mirror the token block into both files via one shared snippet.

### 🟠 S2. Replace fake/remote images with curated local assets
- **Why:** `pollinations.ai` images are AI placeholders; `picsum`/remote URLs can
  break or feel generic; hero relies on `/bg%20image.jpg`.
- **What:** Add a `public/images/` folder with real hero/about/menu imagery; add
  `onerror` fallbacks so a missing image never shows a broken icon.

### 🟡 S3. Loading the menu from the API (single source of truth)
- **Why:** `menuData` is hard-coded; admin menu editing (D10) needs a shared source.
- **What:** `GET /api/menu` → JSON; `index.html` fetches with the hard-coded data as
  offline fallback; cache with a version stamp.

### 🟡 S4. Performance pass
- **What:** `loading="lazy"` on below-fold images (menu grid already does),
  `decoding="async"`, preload hero image, defer non-critical JS, reduce re-renders
  of the wheel canvas, and consider `content-visibility` for below-fold sections.

### 🟡 S5. SEO & sharing metadata
- **Why:** The site has a title/description but no OG/Twitter tags or structured data.
- **What:** Add Open Graph + Twitter cards, JSON-LD `Restaurant` schema (name,
  address, hours, phone, geo), canonical URL.

### 🟡 S6. Accessibility baseline
- **What:** Landmarks (`header/nav/main/footer`), skip-link, visible focus styles,
  heading order, alt text audit, color-contrast check on gold-on-navy text,
  `aria-live` for wheel result and toast regions.

### 🟡 S7. Mobile & responsive audit
- **Why:** Hero, nav drawer, menu grid, forms, and admin grid each have bespoke
  breakpoints.
- **What:** Test at 360 / 768 / 1024 / 1440; fix the 2-col menu grid on tiny
  screens (already special-cased at 480px); ensure the wheel scales on small
  screens.

### 🟢 S8. Dead-code & repo cleanup
- **What:** Delete root `fix-*.cjs` / `remove-*.cjs` / `test*.js` patch scripts
  (keep history in git), remove empty `src/App.tsx` stub or make it mount the Silk
  background, trim unused deps, write a real README pointing to `context.md`.

### 🟢 S9. Multi-language toggle (Amharic / English)
- **Why:** Bilingual brand; guests may prefer Amharic.
- **What:** `i18n` strings dict + toggle in nav; start with key sections (nav,
  hero, reservation form, menu categories).

### 🟢 S10. Micro-interactions & delight
- **Why:** "Attractive and interactive" is the ask.
- **What:** Button press states, card hover lifts (already present), wheel spin
  confetti on win, animated number count-up on stats, subtle gold shimmer on the
  hero CTA, page-transition fade on `navigateTo`.

---

## Suggested execution order (dependencies)

1. **C1–C4** (backend reliability, admin key hygiene, honest forms, escaping) —
   small, safe, high value.
2. **A1–A4** (real login, logout, server enforcement, rate limiting) — unblocks
   safe admin work.
3. **F1–F5** (form system, validation, states, reservation UX, anti-spam) —
   improves the main conversion path.
4. **D1–D8** (admin sidebar, overview, search, pagination, detail drawer, bulk
   actions, shortcuts, states) — the "attractive & interactive" admin ask.
5. **S1–S4 + D10** (design system, local images, API menu, performance, menu
   management) — foundation + admin value.
6. **S5–S10, F6–F9, D11–D12, A5–A6** (SEO/a11y/mobile, extra form features,
   insights, roles/audit) — polish and future.

---

## Effort estimate (rough)

| Phase | Effort | Notes |
|-------|--------|-------|
| Phase 0 (C1–C4) | ½ day | Mostly small edits |
| Phase 1 (A1–A4) | 1–2 days | Needs backend work for A3/A4 |
| Phase 2 (D1–D8 core) | 2–3 days | D10 menu management adds ~1–2 days |
| Phase 3 (F1–F5) | 1–2 days | F6–F9 add ~1 day + backend |
| Phase 4 (S1–S10) | 2–4 days | Ongoing polish; image curation needs assets |

**Total:** roughly **1–2 weeks** for a single developer to complete the priority
(Critical + High + Medium) items, with backend support assumed on `:3001`.
