# AGENTS.md

Guidance for agentic coding assistants working in this repository. Read this file before changing code. `README.md` is the long-form human documentation; this file is the fast, task-oriented contract.

---

## 1. Project at a Glance

| Attribute | Value |
|---|---|
| Project | **BlackDiamondEA** — marketing + manual order-intake site for the *BlackDiamond Special EA* (MT4 forex robot) |
| Live site | https://blackdiamondeaspecial.vercel.app/ |
| Framework | Next.js `16.1.1` (App Router) |
| UI runtime | React `19.2.3`, React DOM `19.2.3` |
| Language | **JavaScript / JSX only** — no TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui (`new-york`, JS), Radix primitives, lucide-react |
| Auth | Firebase Authentication (email/password + Google popup), client SDK only |
| Persistence | **Google Sheets** (no database) via `googleapis` service account |
| Email | EmailJS (browser) for the contact form only |
| Payments | **No gateway/SDK** — manual instructions for 7 methods |
| Hosting | Vercel |
| Package manager | pnpm (primary). `pnpm-lock.yaml` and `package-lock.json` both exist |
| Tests / typecheck / CI | **None** |

**Business scope:** product presentation, Firebase accounts with email verification, a free-EA download funnel, checkout that records orders in Google Sheets, a reseller/affiliate portal backed by an external PHP API, and embedded Myfxbook market widgets.

---

## 2. Commands

Run from the repository root.

| Task | Command | Notes |
|---|---|---|
| Install | `pnpm install` | Node.js **20.9+** required by Next.js 16 |
| Dev server | `pnpm dev` | http://localhost:3000 |
| Production build | `pnpm build` | Must pass before finishing a task |
| Production serve | `pnpm start` | Requires a successful build |
| Lint | `pnpm lint` | Runs `eslint` over the repo (flat config) |
| Tests | *not available* | Do not claim tests pass; there is no test runner |
| Typecheck | *not available* | Project is JS/JSX only |

Verification before reporting completion:

```bash
pnpm lint
pnpm build
```

If a command cannot run (missing env, offline install), say so explicitly.

---

## 3. Non-Negotiable Rules

1. **Never commit, print, or copy secret values.** `.env.local` is gitignored and contains Firebase, EmailJS, and Google service-account credentials. Refer to variables by name only.
2. **Keep `src/lib/googleSheet.js` server-only.** It starts with `import "server-only"` and must never be imported by a client component. Service-account credentials must never reach the browser.
3. **Do not prefix server secrets with `NEXT_PUBLIC_`.** Only Firebase Web config and EmailJS public identifiers may be public.
4. **Stay in JS/JSX.** Do not introduce TypeScript, `.ts`/`.tsx` files, or a `tsconfig.json` unless the user explicitly asks for a migration.
5. **Use the path alias** `@/*` → `src/*`. Do not add long relative import chains.
6. **Server Components by default.** Add `"use client"` only when a component needs hooks, state, browser APIs, Firebase auth state, or event handlers.
7. **Match existing patterns** — shadcn/ui components in `src/components/ui`, `cn()` from `@/lib/utils`, Tailwind tokens (`bg-primary`, `text-nav-text`, `bg-section-bg`, etc.), and the existing folder layout.
8. **Do not modify `public/` assets unless required.** It contains 172 files (~11 MB) of screenshots, logos, and testimonial images.
9. **Do not delete unfamiliar code or commented blocks without checking.** Several large sections are intentionally disabled/legacy. See [Landmines](#9-known-issues--landmines).
10. **Do not add dependencies casually.** Check whether an existing dependency already solves the problem; explain any new dependency before adding it.
11. **Update `README.md` and this file** when behavior, routes, env vars, scripts, or the data schema change.
12. **No marketing/claim changes without evidence.** Prices, performance claims, and plan features are business content copied from source; do not invent numbers.

---

## 4. Repository Map

```text
.
├── public/                      # 172 static files (~11 MB): logos, backtests, 99 testimonials,
│                                # Myfxbook screenshots, partner/payment images
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.js            # Root layout: fonts, ThemeProvider, header/footer, global widgets,
│   │   │                        # Histats script; OrdersNotification is commented out
│   │   ├── page.js              # Home composition
│   │   ├── globals.css          # Tailwind import, theme tokens, keyframes, utilities
│   │   ├── api/
│   │   │   ├── users/route.js   # GET (all users) / POST (mirror user into Sheets)
│   │   │   └── orders/route.js  # GET (all orders / hasDownloaded) / POST (create order)
│   │   ├── checkout/            # page.js + payment/{card,paypal,stripe,crypto,bank,skrill,perfect}
│   │   ├── reseller/            # page.jsx (auth modal) + dashboard/page.jsx (localStorage session)
│   │   ├── login|register|reset-password|change-password|verify-email/
│   │   ├── about-us|services|client-reviews|cart/   # placeholders
│   │   ├── brokers|blogs|news|faq|contact-us/
│   │   ├── live-forex-chart|economic-calendar|forex-heat-map/  # Myfxbook iframes
│   │   ├── *-policy|risk-disclaimer|terms-condition|   # static legal content
│   │   │   software-license-agreement|website-disclaimer/
│   │   ├── (demo-page1)/page1.js         # NOT routable (not page.js)
│   │   ├── (demo-page2)/page2.js         # NOT routable (not page.js)
│   │   └── not-found.js
│   ├── components/
│   │   ├── ui/                  # shadcn primitives (accordion, badge, button, card, carousel,
│   │   │                        # dropdown-menu, form, input, label, navigation-menu, select,
│   │   │                        # separator, sheet, textarea)
│   │   ├── home/                # Home-page sections + TypewriterText + PaymentMethods
│   │   ├── checkout/            # CheckoutContent + one component per payment method + UnlimitedPlan
│   │   ├── shared/              # header, mobile-menu, footer, sticky-header, theme toggle,
│   │   │                        # Google Translate, Telegram/free-AI buttons, sidebar, toasts
│   │   ├── popup/               # FreeOfferPopup, FreeOfferPopupGlobal, CustomToast
│   │   ├── ResellerAuthModal.jsx
│   │   ├── AffiliateTracker.jsx # NOT mounted anywhere
│   │   └── theme-provider.js
│   ├── lib/
│   │   ├── firebase.js          # Firebase init + auth helpers
│   │   ├── googleSheet.js       # server-only Sheets access
│   │   ├── utils.js             # cn() + synthetic getActiveTraders()
│   │   └── fonts.js             # UNUSED
│   └── utils/
│       ├── affiliate.js         # ?ref= → 30-day cookie; runs on import
│       └── affiliateSignupHelper.js
├── components.json              # shadcn config (new-york, JS, @/ aliases)
├── jsconfig.json                # @/* → ./src/*
├── next.config.mjs              # EMPTY — no redirects, headers, images, or metadata config
├── eslint.config.mjs
├── postcss.config.mjs
├── pnpm-workspace.yaml
└── package.json
```

---

## 5. Architecture & Data Flows

### Request model

- Pages are server components unless interactivity requires `"use client"`.
- No global state library, no middleware, no server session, no role-based access control.
- The only backend code is the two route handlers in `src/app/api/`.

### Authentication (`src/lib/firebase.js`)

```text
Register: createUserWithEmailAndPassword → updateProfile(displayName)
        → localStorage.setItem("phoneNumber") → sendEmailVerification → signOut
Login:    signInWithEmailAndPassword → reload(user)
        → if !emailVerified: signOut + throw "email-not-verified"
        → else POST /api/users → redirect /
Google:   signInWithPopup → POST /api/users (phone = "No Phone") → /
Logout:   signOut → /login
```

- Auth state is read with `useAuthState` from `react-firebase-hooks/auth`.
- Users are mirrored into Google Sheets on login/Google sign-up, not at registration.
- `resendVerificationEmail` is exported but has no UI.
- `/reset-password` posts to an **external PHP endpoint** and expects `email` + `token` query params; it is not wired to Firebase's reset action link.

### Order / checkout

```text
/pricing (or home) → /checkout?product=...&price=...
/checkout (paid plans: no account required; free product: signed-in user required)
  → POST /api/orders {uid, name, email, phone, product, price, paymentMethod}
  → Sheets append, status "pending", orderId = ORD-<Date.now()>
  → after ~1.2s redirect to /checkout/payment/{method}?product&price&orderId
  → static payment instructions (manual transfer; no verification)
```

- The order is recorded **before** payment.
- Paid orders from signed-out visitors store `uid: "guest"`. Free orders require a real Firebase UID; `POST /api/orders` returns `401` otherwise.
- For `BlackDiamond_Free`, checkout hides the payment-method selector, forces price `0` / method `free`, and shows the download link instead of a payment redirect.
- `/login` accepts a validated internal `redirect` query parameter and returns there after email or Google sign-in.
- `/api/orders` returns a hard-coded Google Drive folder link for the free product.
- `updateOrderStatus()` exists in `googleSheet.js` but **no route calls it**.

### Free EA funnel

- `FreeOfferPopupGlobal` (root layout) opens after 7 s, or immediately when `sessionStorage.came_from_auth` is set by its own login/register links.
- Suppressed on `/login` and `/register`, after dismissal (`free_popup_dismissed`), or when `GET /api/orders?email=...` returns `hasDownloaded`.
- Logged-in claim → `POST /api/orders` with `product: "BlackDiamond_Free"`, `price: 0`, `paymentMethod: "free"` → open Drive link in a new tab.

### Reseller / affiliate

- `/reseller` mounts `ResellerAuthModal` against `https://blackdiamondea.info/backend/{login,register,forgot-password}.php`.
- Successful login stores the returned user JSON in `localStorage.reseller_user`; `/reseller/dashboard` trusts that value (no token validation, expiry, or logout endpoint).
- Affiliate: `src/utils/affiliate.js` reads `?ref=` into a 30-day `affiliateRef` cookie; `attachAffiliateToUserData()` adds `referredBy` to reseller sign-ups.
- `AffiliateTracker.jsx` is **not mounted**, so affiliate tracking only initializes where `affiliate.js` is imported (the reseller flow).

---

## 6. Data Contracts

### API endpoints

| Endpoint | Methods | Behavior | Auth |
|---|---|---|---|
| `/api/users` | `GET` | Returns every row in `Users` | **None** |
| `/api/users` | `POST` | Body `{uid,name,email,phone}`; appends only if email is new; returns `{success, exists}` | **None** |
| `/api/orders` | `GET` | No query: all orders "newest first". `?email=...`: `{success, hasDownloaded, downloadLink?}` by scanning for `BlackDiamond_Free` | **None** |
| `/api/orders` | `POST` | Requires `name,email,phone,product`; appends with status `pending`; returns `{success, orderId, downloadLink}`. Free orders require a non-guest `uid` or return `401` | **None** |

### Google Sheets schema (exact tab/column order)

`Users!A:D` — A=UID, B=Name, C=Email, D=Phone

`Orders!A:J` — A=Order ID, B=UID (`guest` when absent), C=Name, D=Email, E=Phone, F=Product, G=Price, H=Payment method, I=Status, J=CreatedAt (ISO)

Changing column order requires updating `src/lib/googleSheet.js`, both route handlers, and the README.

### Environment variables (names only)

| Variable | Scope | Used in |
|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client | `src/lib/firebase.js` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Client | `src/lib/firebase.js` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Client | `src/lib/firebase.js` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Client | `src/lib/firebase.js` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Client | `src/lib/firebase.js` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Client | `src/lib/firebase.js` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Client | contact page |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Client | contact page |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Client | contact page |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | **Server only** | `src/lib/googleSheet.js` |
| `GOOGLE_PRIVATE_KEY` | **Server only** | `src/lib/googleSheet.js` (normalizes `\n`) |
| `GOOGLE_SHEET_ID` | **Server only** | `src/lib/googleSheet.js` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Unused | present in `.env.local`, not referenced |

No `.env.example` exists. If adding one, use placeholders only.

---

## 7. Code Conventions

### Components & imports

- One default export per component file; named exports for helpers.
- Local UI primitives come from `@/components/ui/*`; do not install a duplicate design system.
- Use `cn()` for conditional/merged classes.
- Icons: `lucide-react`.
- Prefer `next/image` for images and `next/link` for internal navigation.
- Interactive components start with `"use client";` as the first statement.

### Styling

- Tailwind v4 with CSS-first config in `src/app/globals.css`.
- Prefer semantic tokens: `bg-primary`, `text-secondary`, `bg-nav-bg`, `text-nav-text`, `bg-section-bg`, `text-text-primary`.
- Headings use `--font-oswald`; body uses `--font-lato`.
- Reusable text classes: `.text-body`, `.text-body-large`; layout wrapper: `.container`.
- Dark mode uses the `.dark` class (next-themes), not `prefers-color-scheme` directly.
- Responsive breakpoints: default Tailwind (`sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`).

### Forms & validation

- Feature forms use local React state and manual validation (login, register, checkout, contact).
- `react-hook-form`, `zod`, and `@hookform/resolvers` exist only for the shadcn `form.jsx` primitive, which is not used by any page.
- Do not silently replace existing manual validation with a new library.

### Error handling

- Auth pages map Firebase error codes to user-facing copy; preserve those mappings.
- API routes return `{ success: false, message }` with status 400/500.
- User-facing failures use inline messages or `react-toastify`; avoid `alert()` in new code.

### SEO / metadata

- Only `metadata.title = "Best Forex Robot"` in the root layout. No per-page metadata, OG tags, sitemap, or robots file.
- If a task touches SEO, add route-level `metadata` exports rather than editing the root title globally.

---

## 8. Task Recipes

### Add a new page

1. Create `src/app/<route>/page.js` (it **must** be named `page.js`/`page.jsx` to be routable).
2. Use a server component unless interactivity is needed.
3. Wrap content in the existing `<section><div className="container …">` pattern.
4. Add navigation only if requested; desktop links live in `src/components/shared/header.js`, mobile links in `mobile-menu.js`.
5. Add route-level metadata if the task is SEO-related.
6. Update the route table in `README.md`.

### Change pricing plans

- Canonical plans + checkout links: `src/app/pricing/page.js` (`Essential Duo`, `Elite Challenger`, `Ultimate Enterprise`).
- Home-page cards are separate and still use legacy names in `src/components/home/pricing.js`; they link to `/pricing`.
- Payment components branch on `product`; see the VIP landmine below.

### Add or change a payment method

1. Add the option to `PAYMENT_METHODS` and `PAYMENT_ROUTES` in `src/components/checkout/CheckoutContent.js`.
2. Create `src/components/checkout/<Name>PaymentContent.js` following the existing pattern (reads `product`, `price`, `orderId` from `useSearchParams`, includes the method switcher and support links).
3. Create `src/app/checkout/payment/<method>/page.js` that renders it inside `<Suspense>`.
4. Ensure `/api/orders` accepts the method value.
5. Update README tables.

### Change the Google Sheets schema

1. Update `src/lib/googleSheet.js` ranges/tab names and helper functions.
2. Update `/api/users` and/or `/api/orders` mapping.
3. Keep the spreadsheet tabs exactly `Users` and `Orders`; data starts at row 2.
4. Update `README.md` and this file.

### Change auth behavior

1. Edit helpers in `src/lib/firebase.js`; keep email-verification enforcement on password login unless explicitly told otherwise.
2. If you change what is written to Sheets, update both the login and Google paths.
3. Never move Firebase Admin SDK or service-account logic client-side.

### Edit the home page

- Compose sections in `src/app/page.js`; each section is a component in `src/components/home/`.
- `Products`, `Categories`, `Markets`, and `contact-us` are imported but **not rendered** — confirm before wiring them up.
- Testimonials (99 images) and Myfxbook galleries are heavy; reuse the existing carousel/modal patterns rather than adding new libraries.

---

## 9. Known Issues & Landmines

These are **current behaviors**, not necessarily bugs to "fix" without being asked.

| Area | Detail |
|---|---|
| Soft free gate | Free orders are rejected when the UID is missing or `guest`, but any non-empty UID string is accepted. True enforcement needs server-side Firebase ID-token verification. |
| VIP branch unreachable | Payment components show the VIP view only for `product === "BlackDiamond_Unlimited"`, but `/pricing` sends `Ultimate Enterprise`. The home page still uses `BlackDiamond_Unlimited` but links to `/pricing`. |
| Legacy plan names | Home pricing cards use `BlackDiamond_Basic/Pro/Unlimited`; `/pricing` uses the marketing names. Do not rename one side without checking the other and the README. |
| Order sort bug | In `/api/orders` GET, `dateB` falls back to `a["CREATED AT"]` instead of `b[...]`. Low-risk fix, but verify semantics first. |
| Unauthenticated PII | Both APIs are public: `GET /api/orders` and `GET /api/users` expose names, emails, and phones. Do not add UI that surfaces this data more broadly. |
| Placeholder pages | `/about-us`, `/services`, `/client-reviews`, `/cart`, `/verify-email` render a heading/word only. |
| `change-password` | Uses an undefined `user` variable in the submit handler and a submit button without `type="button"`. Likely a runtime error. |
| Password reset split | `/reset-password` targets an external PHP endpoint and needs `email` + `token`; Firebase reset emails are not connected to it. |
| Disabled sales notifications | `OrdersNotification` is imported and commented out in `src/app/layout.js`. |
| Synthetic social proof | `getActiveTraders()` derives a fake count from a fixed base + elapsed weeks. Do not present it as live data. |
| Unused/dead code | `src/lib/fonts.js`, `src/components/AffiliateTracker.jsx`, `src/components/ui/form.jsx`, `(demo-page1)/page1.js`, `(demo-page2)/page2.js`, large commented blocks in `CheckoutContent.js`, `CryptoPaymentContent.js`, and `pricing/page.js`. |
| Duplicate lockfiles | `pnpm-lock.yaml` **and** `package-lock.json`. Prefer pnpm; do not update both. |
| Missing safeguards | No tests, CI, middleware, API auth, rate limiting, CSP/security headers, sitemap, robots, or per-route metadata. `next.config.mjs` is empty. |
| Hard-coded payment details | Wallet addresses, PayPal email, and payment links live in checkout components. Prefer env/config if refactoring. |
| Hard-coded Drive link | The free-EA Drive folder URL is returned by `/api/orders` and is not access-controlled. |
| JS runtime target | Node 20.9+; no `engines` or `packageManager` field in `package.json`. |

---

## 10. Verification Checklist

Before declaring a task complete:

- [ ] Change is limited to the requested scope; no unrelated reformatting.
- [ ] `"use client"` is present only where required.
- [ ] No secret values, `.env.local` contents, or server-only modules leak into client code.
- [ ] New imports resolve through `@/`.
- [ ] `pnpm lint` passes (or failures are pre-existing and reported).
- [ ] `pnpm build` passes (or the blocker and exact error are reported).
- [ ] Routes added/renamed are real `page.js`/`page.jsx` files.
- [ ] `README.md` / `AGENTS.md` updated for route, schema, env, or behavior changes.
- [ ] No claims about tests, performance, or security that were not verified.

If a dev server is needed, use `pnpm dev`; stop it when done. Do not commit `.next/`, `node_modules/`, or build artifacts.

---

## 11. Deployment

- Vercel, framework auto-detection. `.vercel` is gitignored; no `vercel.json`.
- Install `pnpm install`, build `pnpm build`, Node 20.9+.
- Required production configuration: Firebase providers + authorized domains, Sheets API enabled, spreadsheet shared with the service account, EmailJS template/origins, and third-party iframe/script access (Myfxbook, Google Translate, Histats).
- Server-only Google credentials must be added to Vercel without the `NEXT_PUBLIC_` prefix.
- No analytics/error-tracking beyond the Histats script in the root layout.

---

## 12. Agent Communication Style

- Report what changed, where, and how it was verified.
- State assumptions and unresolved risks (especially around auth, PII, and payment flows).
- If a requested change conflicts with existing behavior or the README, surface the conflict instead of silently choosing one.
- Keep explanations concise; link to files with repository-relative paths such as `src/app/api/orders/route.js`.
