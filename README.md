# BlackDiamond EA

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-087ea4?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Authentication-ffca28?logo=firebase)](https://firebase.google.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://blackdiamondeaspecial.vercel.app/)

**BlackDiamondEA** is the public website and order-intake platform for the **BlackDiamond Special EA**, a MetaTrader 4 Expert Advisor. The site presents the product, performance material, and pricing; handles account registration; collects manual-payment orders into Google Sheets; and distributes a free version of the EA to registered users.

- **Live website:** <https://blackdiamondeaspecial.vercel.app/>
- **Repository:** <https://github.com/blackdiamondtrack007/blackdiamond-specialea>

## Table of Contents

- [Project Overview](#project-overview)
  - [At a Glance](#at-a-glance)
  - [Scope of This Repository](#scope-of-this-repository)
- [Key Features](#key-features)
  - [Storefront and Product Presentation](#storefront-and-product-presentation)
  - [Product Plans](#product-plans)
  - [Authentication](#authentication-features)
  - [Free EA Funnel](#free-ea-funnel)
  - [Checkout and Order Intake](#checkout-and-order-intake)
  - [Reseller and Affiliate Program](#reseller-and-affiliate-program)
  - [Market Data and News Widgets](#market-data-and-news-widgets)
  - [User Interface and Interaction](#user-interface-and-interaction)
  - [Explicitly Not Implemented](#explicitly-not-implemented)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
  - [System Overview](#system-overview)
  - [Request and Data Flow](#request-and-data-flow)
  - [Purchase and Order Flow](#purchase-and-order-flow)
  - [Authentication Flow](#authentication-flow)
  - [Shared Components and Layout](#shared-components-and-layout)
- [Project Structure](#project-structure)
- [Routes and Pages](#routes-and-pages)
  - [Page Routes](#page-routes)
  - [API Endpoints](#api-endpoints)
  - [Routing Notes](#routing-notes)
- [Authentication](#authentication)
- [External Integrations](#external-integrations)
  - [Firebase Authentication](#firebase-authentication)
  - [Google Sheets](#google-sheets)
  - [Myfxbook](#myfxbook)
  - [EmailJS](#emailjs)
  - [Telegram and Social Links](#telegram-and-social-links)
  - [Analytics and Translation](#analytics-and-translation)
  - [Reseller and Affiliate Backend](#reseller-and-affiliate-backend)
  - [Payment Providers](#payment-providers)
- [Environment Variables](#environment-variables)
- [Installation and Local Development](#installation-and-local-development)
- [Available Scripts](#available-scripts)
- [UI, UX, and Design System](#ui-ux-and-design-system)
- [SEO and Performance](#seo-and-performance)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [Known Limitations and Future Improvements](#known-limitations-and-future-improvements)
  - [Observed Implementation Gaps](#observed-implementation-gaps)
  - [Potential Improvements](#potential-improvements)
- [Contributing](#contributing)
- [License and Credits](#license-and-credits)
- [Documentation Notes](#documentation-notes)

## Project Overview

BlackDiamondEA is a product-and-service website for a commercial Forex trading robot. It is built for retail traders, prop-firm candidates, and resellers who want to evaluate the EA before buying, create an account, download a free edition, and place an order through one of several manual payment channels.

The website solves three problems:

1. **Product education and trust.** It presents the EA's feature set, pricing tiers, backtest captures, Myfxbook portfolios, client testimonials, broker partners, and legal/disclaimer content in one place.
2. **Identity and gating.** Firebase Authentication provides email/password and Google accounts. Email verification is enforced before a password login succeeds, and the free-download flow is tied to an account and an order record.
3. **Order intake without a payment gateway.** Instead of integrating a payment processor, the checkout form records the order and redirects the customer to a payment-specific instruction page (card, PayPal, Stripe, crypto, bank transfer, Skrill, or Perfect Money). Orders and users are stored in Google Sheets, and payment confirmation is handled manually through support channels.

The primary business purpose is lead generation, product presentation, and manual order conversion for the BlackDiamond Special EA. The main capabilities are content delivery, Firebase authentication, a free-product funnel, a multi-method checkout flow, reseller onboarding, and embedded market widgets.

### At a Glance

| Attribute | Implementation |
|---|---|
| Application type | Marketing and e-commerce website (App Router) |
| Framework | Next.js `16.1.1` with React `19.2.3` |
| Language | JavaScript / JSX (no TypeScript) |
| Styling | Tailwind CSS v4, shadcn/ui components, CSS custom properties |
| Authentication | Firebase Authentication (email/password and Google popup) |
| Server-side logic | Two Next.js route handlers (`/api/users`, `/api/orders`) |
| Data store | Google Sheets via a Google service account |
| Payments | Manual instructions for seven methods; no gateway SDK |
| Deployment | Vercel |

### Scope of This Repository

Included: all website pages, shared components, the checkout UI, Firebase client setup, Google Sheets access helpers, API route handlers, reseller/affiliate front-end, static images, and configuration files.

Not included: the MT4 Expert Advisor itself, payment-provider accounts, Firebase project rules.

## Key Features

### Storefront and Product Presentation

- **Home page** (`src/app/page.js`) composes: hero with typewriter headline and animated CTA, product introduction, differentiator grid, three Myfxbook screenshot portfolios, backtest gallery, 99-image testimonial carousel, pricing cards, specialty list, article cards, a secondary buy CTA, and partner/broker logos.
- **Pricing page** (`src/app/pricing/page.js`) renders three plans with feature lists, discount badges, and checkout links.
- **Brokers page** (`src/app/brokers/page.js`) shows partner broker cards with outbound registration links.
- **Blog listing** (`src/app/blogs/page.js`) renders eight hard-coded article cards; there are no article detail routes or CMS.
- **FAQ** (`src/app/faq/page.js`) uses a shadcn accordion with product and policy questions.
- **Legal pages** provide static policy text for privacy, terms, refunds, cookies, software licensing, anti-money laundering, website disclaimer, and risk disclaimer.

### Product Plans

| Plan | Price | Previous price | Checkout parameter |
|---|---|---|---|
| Essential Duo | `$312` | `$410` | `product=Essential%20Duo` |
| Elite Challenger | `$730` | `$949` | `product=Elite%20Challenger` |
| Ultimate Enterprise | `$2499` | `$3250` | `product=Ultimate%20Enterprise` |

The home-page pricing section still uses the legacy labels `BlackDiamond_Basic`, `BlackDiamond_Pro`, and `BlackDiamond_Unlimited`; its buttons link to `/pricing` rather than directly to checkout. The checkout payment components contain a VIP branch that checks for the literal value `BlackDiamond_Unlimited`, so the branch is not reached through the current `/pricing` flow. See [Observed Implementation Gaps](#observed-implementation-gaps).

### Authentication Features

- Email/password registration with first name, last name, email, password strength meter, and phone number.
- Firebase email-verification email on registration; the session is signed out immediately afterward.
- Email/password login that reloads the Firebase user and rejects unverified accounts.
- Google sign-in through a popup.
- Persistent auth state through `useAuthState` from `react-firebase-hooks`.
- Header logout button that signs out and navigates to `/login`.
- No password-recovery integration with Firebase on the dedicated reset screen; see [Authentication](#authentication).

### Free EA Funnel

- A global free-offer popup (`FreeOfferPopupGlobal`) appears after a 7-second delay, or immediately after a visitor uses one of the popup's own sign-in links (which sets a `sessionStorage` flag). It is suppressed on auth pages, when session storage marks it dismissed, and when the user already has a free order.
- A fixed **Get Free AI** button in the layout and a header button open the same offer.
- Logged-out visitors are routed to `/login`. Logged-in visitors trigger `POST /api/orders` with `product: "BlackDiamond_Free"` and `price: 0`.
- The API appends the order to Google Sheets and returns a hard-coded Google Drive download link, which the client opens in a new tab.
- Download eligibility is checked with `GET /api/orders?email=...`, which scans the Orders tab for an email/product match.

### Checkout and Order Intake

- `/checkout` collects name, email, phone, and one of seven payment methods.
- If a Firebase user is signed in, the form is prefilled from the Firebase profile; checkout also works as a guest (`uid: "guest"`).
- Submission posts to `/api/orders`, which validates the required fields, appends a row to Google Sheets, and returns an order ID in the form `ORD-<timestamp>`.
- The client shows a success state and redirects after roughly 1.2 seconds to `/checkout/payment/{method}` with `product`, `price`, and `orderId` in the query string.
- Each payment page displays the selected plan and order ID, the payment instructions, copy-to-clipboard controls where applicable, a method-switcher dropdown, support links, and a Telegram support link.
- No payment provider SDK, webhook, or automatic status update is implemented. Order status defaults to `pending` and is only changed through the unused `updateOrderStatus` helper (no route calls it).

### Market Data and News Widgets

- `/live-forex-chart` embeds a Myfxbook market-quotes widget for a large symbol list.
- `/economic-calendar` embeds a Myfxbook calendar widget.
- `/forex-heat-map` embeds a Myfxbook heat-map widget.
- `/news` embeds a Myfxbook news widget.
- These are public iframes. No Myfxbook API key, server proxy, or data transformation is used.

### User Interface and Interaction

- Responsive layouts with a sticky desktop header, mobile sheet navigation, and a hide-on-scroll header behavior.
- Light/dark/system theme toggle through `next-themes`, with class-based dark mode.
- Google Translate dropdown in the desktop header and mobile menu.
- Toast notifications through `react-toastify`.
- Framer Motion modal galleries for Myfxbook and testimonial images, Embla carousels with autoplay, a typewriter headline, and CSS keyframe animations.
- Global widgets: Telegram contact button, free-download button, social sidebar, scroll-to-top button, and the free-offer popup.
- Manual form validation on login and registration; inline error messages; password-strength feedback.

### Explicitly Not Implemented

- No payment gateway, checkout session, webhook, or automatic payment reconciliation.
- No server-side email or Telegram notifications. EmailJS powers the contact form only; Telegram is a set of outbound links.
- No order-status API, admin dashboard, or customer account area.
- No database. Google Sheets is the only persistence layer.
- No middleware, server session, role-based access control, or protected API routes.
- No automated tests, CI configuration, TypeScript, or test scripts.
- No sitemap, robots file, Open Graph metadata, or structured data.

## Technology Stack

| Category | Technology | Purpose in this project | Where it is used |
|---|---|---|---|
| Frontend framework | Next.js `16.1.1` | App Router pages, layouts, server components, route handlers | `src/app/**` |
| UI runtime | React `19.2.3`, React DOM `19.2.3` | Component rendering and client interactivity | All components |
| Language | JavaScript, JSX | Application source; no TypeScript files | `src/**` |
| Styling | Tailwind CSS `^4` | Utility-first styling through CSS-first configuration | `src/app/globals.css`, all components |
| Styling pipeline | `@tailwindcss/postcss` | PostCSS plugin for Tailwind v4 | `postcss.config.mjs` |
| Component system | shadcn/ui (new-york style, JS) | Local copies of accessible UI primitives | `src/components/ui/*` |
| UI primitives | Radix UI packages | Dialog/sheet, dropdown, navigation menu, select, accordion, label, slot | `src/components/ui/*` |
| Icons | `lucide-react` | Interface icons | Components throughout |
| Class utilities | `clsx`, `tailwind-merge`, `class-variance-authority` | Conditional classes, class merging, variant definitions | `src/lib/utils.js`, UI components |
| Authentication | Firebase `^12.12.1` | Email/password, Google popup, verification, password reset email | `src/lib/firebase.js`, auth pages, header |
| Auth state | `react-firebase-hooks` | `useAuthState` subscription in client components | Header, login, checkout, popup |
| Server data access | `googleapis` (`^171.4.0`) | Read/append rows in Google Sheets | `src/lib/googleSheet.js` |
| Server-only guard | `server-only` | Prevents the Sheets module from entering client bundles | `src/lib/googleSheet.js` |
| Email | `@emailjs/browser` `^4.4.1` | Contact-form delivery from the browser | `src/app/contact-us/page.js` |
| Animation | `framer-motion` `^12.34.2` | Modal and gallery transitions | Myfxbook, Testimonial |
| Carousels | `embla-carousel-react`, `embla-carousel-autoplay` | Autoplaying image carousels | Myfxbook, Testimonial |
| Theming | `next-themes` `^0.4.6` | Light/dark/system theme persistence | `src/components/theme-provider.js` |
| Notifications | `react-toastify` `^11.1.0` | Success/error toasts and the verification prompt | Layout, auth pages |
| Forms | Native React state | Manual validation in the feature forms | Login, register, checkout, contact |
| Form libraries | `react-hook-form`, `@hookform/resolvers`, `zod` | Declared for the shadcn `form.jsx` primitive, which is itself not imported by any page or component | `src/components/ui/form.jsx` |
| Linting | ESLint `^9` with `eslint-config-next` core-web-vitals | Static analysis | `eslint.config.mjs` |
| Animation utilities | `tw-animate-css` | Additional animation utilities | `src/app/globals.css` |
| Hosting | Vercel | Production hosting and deployment | `.vercel` is gitignored; live URL is a `vercel.app` domain |

`package.json` also includes `radix-ui` (used by the shadcn form primitive) and `@radix-ui/react-slot` (used by UI components). No dependency is listed here unless it is actually referenced in the source.

## Architecture

### System Overview

The application is a server-first Next.js App Router project. Pages are server components unless interactivity requires `"use client"`. There is no global state library and no database; client state is local React state, Firebase auth state, `sessionStorage`, and `localStorage`.

```mermaid
flowchart LR
    V["Visitor or Customer"] --> B["Browser"]
    N["Next.js 16 App Router"] -->|"Server Components and HTML"| B
    B -->|"Firebase SDK"| F["Firebase Authentication"]
    B -->|"POST /api/users"| U["/api/users route"]
    B -->|"POST /api/orders"| O["/api/orders route"]
    U -->|"googleapis"| S[("Google Sheets")]
    O -->|"googleapis"| S
    B -->|"Contact form"| E["EmailJS"]
    B -->|"iframes"| M["Myfxbook widgets"]
    B -->|"fetch"| P["PHP reseller backend"]
    N -->|"afterInteractive script"| H["Histats analytics"]
```

Key characteristics:

- The Firebase Web SDK runs entirely in the browser. There is no Firebase Admin SDK and no server-side session cookie.
- `src/lib/googleSheet.js` is marked `server-only` and is imported only by the two API route handlers. Service-account credentials never reach the client.
- The reseller subsystem is independent of the main application backend and talks directly from the browser to a PHP API.
- All product, blog, testimonial, and backtest content is static source code or local images; there is no CMS or headless content API.

### Request and Data Flow

1. A request for a page is rendered by Next.js. Static content is produced from server components.
2. Client islands hydrate for interactive behavior: header auth state, theme, translation, carousels, modals, checkout forms, and popups.
3. Authentication calls go directly from the browser to Firebase.
4. Registered users are mirrored into the `Users` sheet through `POST /api/users` after a successful password login or Google sign-in. The route checks for an existing email before appending.
5. Checkout and free-download actions call `POST /api/orders`. The route validates the payload, appends a row, and returns a generated order ID (and a download link for the free product).
6. Free-download status is read through `GET /api/orders?email=...`; a general `GET /api/orders` returns the full order list.

### Purchase and Order Flow

```mermaid
sequenceDiagram
    autonumber
    participant V as Visitor
    participant P as Pricing page
    participant C as Checkout page
    participant A as POST /api/orders
    participant S as Google Sheets
    participant G as Payment instructions

    V->>P: Choose a plan
    P-->>V: /checkout?product=...&price=...
    V->>C: Submit name, email, phone, payment method
    C->>A: JSON order payload
    A->>A: Validate required fields
    A->>S: Append row to Orders!A:J
    S-->>A: Success
    A-->>C: success, orderId
    C-->>V: Success state, redirect after about 1.2s
    V->>G: /checkout/payment/{method} with product, price, orderId
    G-->>V: Wallet or account details and support links
```

The order is recorded before any payment is made, with status `pending`. Confirmation, delivery, and status changes are operational processes outside this codebase.

### Authentication Flow

```mermaid
flowchart TD
    R["Register page"] -->|"Email and password"| CU["createUserWithEmailAndPassword"]
    CU --> UP["updateProfile displayName"]
    UP --> SV["sendEmailVerification"]
    SV --> SO["signOut"]
    R -->|"Google popup"| GP["signInWithPopup"]
    GP --> API["POST /api/users"]
    L["Login page"] --> SI["signInWithEmailAndPassword"]
    SI --> RL["reload user"]
    RL -->|"emailVerified = false"| OUT["signOut and error"]
    RL -->|"emailVerified = true"| API2["POST /api/users"]
    API2 --> HOME["Redirect to /"]
    H["Header"] -->|"Logout"| LO["signOut and /login"]
```

### Shared Components and Layout

`src/app/layout.js` is the single root layout. It:

- Loads Oswald (heading) and Lato (body) through `next/font/google` with `display: "swap"` and exposes CSS variables.
- Wraps the application in the `next-themes` provider with `attribute="class"`, `defaultTheme="system"`, and system support enabled.
- Renders the global header and footer.
- Mounts `SocialSidebar`, `ScrollToTop`, `GetFreeAIButton`, `TelegramButton`, `ToastContainer`, and `FreeOfferPopupGlobal`.
- Injects the Histats tracking script with `next/script` (`afterInteractive`).
- Keeps `OrdersNotification` in the file but commented out, so the sales-notification toast is not rendered.

Reusable UI lives in `src/components/ui` (shadcn primitives), shared chrome in `src/components/shared`, feature sections in `src/components/home`, checkout screens in `src/components/checkout`, and overlays in `src/components/popup`.

## Project Structure

```text
blackdiamond-specialea/
├── public/
│   ├── assets/
│   │   ├── footer/                 # Payment, security, DMCA, support images
│   │   ├── home/
│   │   │   ├── articles/           # Article thumbnails and backgrounds
│   │   │   ├── backtest-result/    # Backtest screenshots
│   │   │   ├── best-forex-ea/
│   │   │   ├── client-feedbacks/   # 99 testimonial screenshots
│   │   │   ├── hero-section/
│   │   │   ├── icons/
│   │   │   ├── myfxbook-01/        # Portfolio screenshots
│   │   │   ├── myfxbook-02/
│   │   │   ├── myfxbook-03/
│   │   │   ├── partners/           # Broker logos
│   │   │   └── payment-methods/    # Payment brand images
│   │   └── icons/
│   ├── black-diamond-logo.gif
│   ├── logo.gif
│   └── not-found-bg.webp
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── orders/route.js     # GET/POST order handlers
│   │   │   └── users/route.js      # GET/POST user handlers
│   │   ├── checkout/
│   │   │   ├── page.js             # Order form
│   │   │   └── payment/
│   │   │       ├── bank/page.js
│   │   │       ├── card/page.js
│   │   │       ├── crypto/page.js
│   │   │       ├── paypal/page.js
│   │   │       ├── perfect/page.js
│   │   │       ├── skrill/page.js
│   │   │       └── stripe/page.js
│   │   ├── reseller/
│   │   │   ├── page.jsx            # Reseller auth modal
│   │   │   └── dashboard/page.jsx  # localStorage-backed dashboard
│   │   ├── (demo-page1)/page1.js   # Not routable (not page.js)
│   │   ├── (demo-page2)/page2.js   # Not routable (not page.js)
│   │   ├── about-us/page.js
│   │   ├── anti-money-laundering-policy/page.js
│   │   ├── blogs/page.js
│   │   ├── brokers/page.js
│   │   ├── cart/page.js
│   │   ├── change-password/page.js
│   │   ├── client-reviews/page.js
│   │   ├── contact-us/page.js
│   │   ├── cookie-policy/page.js
│   │   ├── economic-calendar/page.js
│   │   ├── faq/page.js
│   │   ├── forex-heat-map/page.js
│   │   ├── live-forex-chart/page.js
│   │   ├── login/page.js
│   │   ├── news/page.js
│   │   ├── page.js                 # Home
│   │   ├── pricing/page.js
│   │   ├── privacy-policy/page.js
│   │   ├── refund-policy/page.js
│   │   ├── register/page.js
│   │   ├── reset-password/page.js
│   │   ├── risk-disclaimer/page.js
│   │   ├── services/page.js
│   │   ├── software-license-agreement/page.js
│   │   ├── terms-condition/page.js
│   │   ├── verify-email/page.js
│   │   ├── website-disclaimer/page.js
│   │   ├── globals.css             # Tailwind import, theme tokens, base styles
│   │   ├── layout.js               # Root layout and global widgets
│   │   └── not-found.js            # Custom 404
│   ├── components/
│   │   ├── checkout/               # One content component per payment method
│   │   ├── home/                   # Home-page sections
│   │   ├── popup/                  # Free-offer popups and custom toast
│   │   ├── shared/                 # Header, footer, widget buttons, theme, translate
│   │   ├── ui/                     # shadcn primitives
│   │   ├── AffiliateTracker.jsx    # Not mounted anywhere
│   │   ├── ResellerAuthModal.jsx
│   │   └── theme-provider.js
│   ├── lib/
│   │   ├── firebase.js             # Firebase init and auth helpers
│   │   ├── fonts.js                # Unused font definitions
│   │   ├── googleSheet.js          # Server-only Sheets access
│   │   └── utils.js                # cn() and synthetic trader counter
│   └── utils/
│       ├── affiliate.js            # Referral cookie helpers
│       └── affiliateSignupHelper.js
├── .env.local                      # Local secrets; gitignored
├── components.json                 # shadcn configuration
├── eslint.config.mjs               # Flat ESLint config
├── jsconfig.json                   # @/* path alias
├── next.config.mjs                 # Empty Next.js config
├── package-lock.json               # npm lockfile
├── package.json
├── pnpm-lock.yaml                  # pnpm lockfile (v9)
├── pnpm-workspace.yaml             # Single-package workspace
├── postcss.config.mjs
└── README.md
```

| Path | Responsibility |
|---|---|
| `src/app` | Routes, layouts, API handlers, global styles |
| `src/app/api` | Server-side Sheets access; the only backend code in the repository |
| `src/components/checkout` | Shared checkout logic and the seven payment instruction screens |
| `src/components/home` | Composable home-page sections and shared marketing widgets |
| `src/components/shared` | Application chrome and globally mounted utility components |
| `src/components/ui` | shadcn/ui primitives generated into the repository |
| `src/lib` | Firebase client, Google Sheets server client, utilities |
| `src/utils` | Affiliate cookie and signup helpers |
| `public` | Static images, GIFs, and page backgrounds |

## Routes and Pages

### Page Routes

All routes below exist as `page.js` or `page.jsx` files under `src/app`. There are no dynamic routes.

| Route | Page | Description | Access |
|---|---|---|---|
| `/` | Home | Landing page with hero, product sections, portfolios, backtests, testimonials, pricing, articles, and partners | Public |
| `/pricing` | Pricing | Three plans with feature lists and checkout links | Public |
| `/checkout` | Checkout | Order form and summary; posts to `/api/orders` | Public; prefills from Firebase user when signed in |
| `/checkout/payment/card` | Card payment | Visa/Mastercard instructions and external Stripe payment links | Public; order ID in query string |
| `/checkout/payment/paypal` | PayPal payment | PayPal transfer instructions | Public; order ID in query string |
| `/checkout/payment/stripe` | Stripe payment | Stripe payment links and fallback instructions | Public; order ID in query string |
| `/checkout/payment/crypto` | Crypto payment | Multi-network wallet details with copy controls | Public; order ID in query string |
| `/checkout/payment/bank` | Bank transfer | Bank transfer details | Public; order ID in query string |
| `/checkout/payment/skrill` | Skrill payment | Skrill account instructions | Public; order ID in query string |
| `/checkout/payment/perfect` | Perfect Money | Perfect Money account instructions | Public; order ID in query string |
| `/login` | Login | Email/password and Google sign-in | Public |
| `/register` | Register | Account creation with verification email | Public |
| `/reset-password` | Reset password | Password form that posts to an external PHP endpoint | Public; expects `email` and `token` query parameters |
| `/change-password` | Change password | Requests a Firebase reset email | Public |
| `/verify-email` | Verify email | Placeholder page with a static heading only | Public |
| `/brokers` | Brokers | Partner broker cards with outbound registration links | Public |
| `/blogs` | Blog | Eight hard-coded article cards; no detail pages | Public |
| `/news` | News | Myfxbook news iframe | Public |
| `/faq` | FAQ | Accordion of product and policy questions | Public |
| `/contact-us` | Contact | EmailJS contact form, support email, social links, partners | Public |
| `/about-us` | About us | Placeholder heading only | Public |
| `/services` | Services | Placeholder heading only | Public |
| `/client-reviews` | Client reviews | Placeholder heading only | Public |
| `/cart` | Cart | Placeholder text only | Public |
| `/live-forex-chart` | Live Forex chart | Myfxbook market-quotes iframe | Public |
| `/economic-calendar` | Economic calendar | Myfxbook calendar iframe | Public |
| `/forex-heat-map` | Forex heat map | Myfxbook heat-map iframe | Public |
| `/reseller` | Reseller portal | Standalone reseller login/registration modal | Public |
| `/reseller/dashboard` | Reseller dashboard | Balance, sales count, affiliate link; requires `reseller_user` in `localStorage` | Client-side guard |
| `/privacy-policy` | Privacy policy | Static policy content | Public |
| `/terms-condition` | Terms and conditions | Static policy content | Public |
| `/refund-policy` | Refund policy | Static policy content | Public |
| `/cookie-policy` | Cookie policy | Static policy content | Public |
| `/software-license-agreement` | Software license | Static policy content | Public |
| `/anti-money-laundering-policy` | AML policy | Static policy content | Public |
| `/website-disclaimer` | Website disclaimer | Static policy content | Public |
| `/risk-disclaimer` | Risk disclaimer | Static policy content | Public |

In addition, `src/app/not-found.js` renders the custom 404 page with routes back to home or the previous page.

### API Endpoints

| Endpoint | Methods | Behavior | Authorization |
|---|---|---|---|
| `/api/users` | `GET` | Returns `{ success, data }` with every row from the `Users` tab | None |
| `/api/users` | `POST` | Accepts `uid`, `name`, `email`, `phone`; appends a user when the email is not already present | None |
| `/api/orders` | `GET` | Returns all orders sorted newest first; with `?email=...` returns `{ hasDownloaded }` by scanning for a `BlackDiamond_Free` order | None |
| `/api/orders` | `POST` | Validates `name`, `email`, `phone`, `product`; appends an order with status `pending`; returns `orderId` and, for the free product, a download link | None |

### Routing Notes

- No `middleware.js` exists, so there is no server-side route protection or redirect logic.
- `src/app/(demo-page1)/page1.js` and `src/app/(demo-page2)/page2.js` are **not routes**. Next.js only treats a file named `page.js`/`page.jsx` as a route, so these demo widget files are unreachable.
- Navigation links to `/forex-ea`, `/indicator`, `/blogs` (desktop), and the additional crypto/screener/calendar pages are commented out in both the desktop header and mobile menu, so the live navigation only exposes Home, Brokers, the Live Chart dropdown, and Contact.
- No redirects or rewrites are configured in `next.config.mjs`.

## Authentication

Authentication is implemented entirely with the Firebase client SDK. Firebase is initialized once in `src/lib/firebase.js` with environment variables, and the initialized `auth` instance is shared by every component.

### Firebase Setup

```js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
```

Only Authentication is used. There are no Firestore, Cloud Storage, or Firebase Analytics calls.

### Registration

`registerWithEmailAndPassword(name, email, password, phone)`:

1. Creates the Firebase user.
2. Sets `displayName` through `updateProfile`.
3. Stores the phone number in `localStorage`.
4. Sends the verification email.
5. Signs the user out so they must verify and then log in.
6. Returns `{ success: true }`.

The register page validates names, email format, a minimum eight-character password with a strength score of at least three, and a phone number. On success it shows a custom toast explaining that a verification email was sent, then links to `/login`. Existing emails surface an `auth/email-already-in-use` toast.

### Login

`loginWithEmailAndPassword(email, password)`:

1. Signs in with email/password.
2. Reloads the user to obtain current verification status.
3. If the email is not verified, signs out and throws `email-not-verified`.
4. If verified, sends a `POST /api/users` request to mirror the account into Google Sheets.
5. Returns the Firebase user; the page redirects to `/`.

Because email/password registration signs the user out, those accounts are written to the `Users` sheet on their first successful login rather than at registration time. Google sign-ups are posted immediately. The phone number comes from `localStorage` and falls back to `"No Phone"` on a different device.

Relevant excerpt:

```js
const res = await signInWithEmailAndPassword(auth, email, password);
const user = res.user;

await reload(user);

if (!auth.currentUser.emailVerified) {
  await signOut(auth);
  throw new Error("email-not-verified");
}
```

### Google Sign-In

`registerInWithGoogle()` opens a Google popup with `signInWithPopup`, then posts the account to `/api/users` with the phone value `"No Phone"`. Both the login and register pages call it; success redirects to `/`. No email-verification check is applied to Google accounts.

### Logout and State Management

- The header subscribes to `useAuthState(auth)` and swaps the Login/Logout buttons.
- Logout calls `signOut(auth)` and navigates to `/login`.
- Auth persistence is Firebase's default browser persistence; no custom persistence configuration is set.

### Error Handling

Both auth pages map Firebase error codes to user-facing messages:

| Condition | Message shown |
|---|---|
| `email-not-verified` (custom) | Email is not verified; check inbox or spam |
| `auth/invalid-credential` | Invalid email or password |
| `auth/user-not-found` | No account found with that email |
| `auth/wrong-password` | Incorrect password |
| `auth/too-many-requests` | Too many attempts; try later or reset password |
| `auth/user-disabled` | Account disabled; contact support |
| `auth/network-request-failed` | Network error |
| `auth/popup-closed-by-user` | Popup closed |
| `auth/popup-blocked` | Popup blocked |
| `auth/account-exists-with-different-credential` | Account exists with a different sign-in method |

Unmapped errors fall back to a generic message.

### Route Protection

There is no route protection layer:

- All pages are publicly reachable.
- Checkout allows guests and does not require a Firebase session.
- The reseller dashboard checks only `localStorage` for `reseller_user` and redirects to `/reseller` when absent. It does not validate a token with the PHP backend.
- API routes perform no authentication or authorization checks.

## External Integrations

| Service | Purpose | Integration method |
|---|---|---|
| Firebase Authentication | User accounts and sign-in | Firebase Web SDK in client components |
| Google Sheets | Users and orders datastore | `googleapis` with service-account credentials in a server-only module |
| Myfxbook | Portfolio screenshots and live market widgets | Local images and public iframes |
| EmailJS | Contact-form delivery | Browser SDK with public service/template/key IDs |
| Telegram | Support and VIP contact | Outbound links |
| Facebook, YouTube, Instagram, X | Social presence | Outbound links |
| Histats | Page-view analytics | Inline script injected in the root layout |
| Google Translate | On-page language switching | Dynamically injected Google Translate widget |
| Stripe | Card payments | Outbound payment links; no SDK |
| Google Drive | Free EA distribution | Link returned by `/api/orders` and opened in a new tab |

### Firebase Authentication

- Initialized in `src/lib/firebase.js`.
- Uses the six `NEXT_PUBLIC_FIREBASE_*` variables.
- Provides `auth` plus helper functions: `registerWithEmailAndPassword`, `loginWithEmailAndPassword`, `resendVerificationEmail`, `sendResetPassword`, and `registerInWithGoogle`.
- `resendVerificationEmail` is exported but not imported by any page, so there is no UI that re-sends a verification email.
- Firebase project rules and authorized-domain configuration are not in the repository and could not be verified.

### Google Sheets

`src/lib/googleSheet.js` begins with `import "server-only"` and authenticates with a service account:

```js
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
      ?.replace(/\\\\n/g, "\n")
      ?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
```

The spreadsheet ID comes from `GOOGLE_SHEET_ID`. Two tabs are required, with these exact names and column layouts:

**`Users` tab**

| Column | Field |
|---|---|
| A | ID (Firebase UID) |
| B | Name |
| C | Email |
| D | Phone |

**`Orders` tab**

| Column | Field |
|---|---|
| A | Order ID (`ORD-<timestamp>`) |
| B | UID (`guest` when signed out) |
| C | Name |
| D | Email |
| E | Phone |
| F | Product |
| G | Price |
| H | Payment method |
| I | Status (`pending` by default) |
| J | Created at (ISO timestamp) |

Exported helpers:

- `getSheetsData()` — reads `Users!A:D`.
- `checkUserExists(email)` — compares against column C, skipping the header row.
- `addUser(uid, name, email, phone)` — appends to `Users!A:D`.
- `getOrders()` — reads `Orders!A:J`.
- `addOrder({...})` — appends an order and returns the generated order ID.
- `updateOrderStatus(orderId, newStatus)` — updates column I; it is exported but not called by any route or component.

The service account must have edit access to the spreadsheet. Sharing and permission settings are external to this repository.

### Myfxbook

Myfxbook is used in two ways, neither of which is an API integration:

1. **Static screenshots.** The home page renders three autoplaying carousels of locally stored WebP images under `public/assets/home/myfxbook-01`, `-02`, and `-03`, with modal zoom and navigation.
2. **Public iframes.** `/live-forex-chart`, `/economic-calendar`, `/forex-heat-map`, and `/news` embed `widget.myfxbook.com` or `widgets.myfxbook.com` widgets.

No account credentials, API keys, or server-side requests are involved.

### EmailJS

The contact form at `/contact-us` calls `emailjs.sendForm()` in the browser with:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

It sends `user_name`, `user_email`, `subject`, and `message`, shows a success or error message, and resets the form on success. EmailJS is not used for order confirmations, verification, or any other notification.

### Telegram and Social Links

- Header CTA: Telegram channel link.
- Floating Telegram button: a support chat link.
- Payment pages: a Telegram support link and, for the VIP branch, a Telegram activation path.
- Footer and sidebar: Facebook, YouTube, Instagram, and X. Three additional footer social icons use `href="#"` placeholders.

No Telegram Bot API, webhook, or message automation is implemented.

### Analytics and Translation

- **Histats:** the root layout injects an inline script that registers a Histats account ID and loads `//s10.histats.com/js15_as.js` after hydration.
- **Google Translate:** `GoogleTranslate` dynamically appends the Google Translate element script and initializes it with English as the page language. Bootstrap styling is overridden in `globals.css`.

Both integrations depend on third-party scripts and may be blocked by privacy tooling or content policies.

### Payment Providers

No payment SDK or API is present. The seven methods are presentational:

- **Card / Stripe:** both pages link to external Stripe payment URLs. `StripePaymentContent` also declares an unused `STRIPE_LINK` constant containing placeholder text; it is not rendered.
- **PayPal:** displays a configured PayPal email address for manual transfer.
- **Crypto:** displays wallet addresses for multiple networks with copy buttons.
- **Bank transfer, Skrill, Perfect Money:** display account details with copy controls.

All payment identifiers are hard-coded in the checkout components rather than environment variables, and they are intentionally not reproduced in this README.

## Environment Variables

Twelve variables are referenced by the source code. One additional Firebase variable exists in the local environment file but is not referenced anywhere.

| Variable | Scope | Required | Used in | Purpose |
|---|---|---|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Client | Yes | `src/lib/firebase.js` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Client | Yes | `src/lib/firebase.js` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Client | Yes | `src/lib/firebase.js` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Client | Yes | `src/lib/firebase.js` | Firebase storage bucket value (passed to config; Storage is not used) |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Client | Yes | `src/lib/firebase.js` | Firebase sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Client | Yes | `src/lib/firebase.js` | Firebase app ID |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Client | Yes for contact form | `src/app/contact-us/page.js` | EmailJS service |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Client | Yes for contact form | `src/app/contact-us/page.js` | EmailJS template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Client | Yes for contact form | `src/app/contact-us/page.js` | EmailJS public key |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Server only | Yes | `src/lib/googleSheet.js` | Service-account identity |
| `GOOGLE_PRIVATE_KEY` | Server only | Yes | `src/lib/googleSheet.js` | Service-account private key; escaped newlines are normalized |
| `GOOGLE_SHEET_ID` | Server only | Yes | `src/lib/googleSheet.js` | Target spreadsheet |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Client | No | Not referenced | Present in the local env file but unused; no Analytics initialization |

### `.env.example` Template

The repository does not contain an `.env.example` file. Create `.env.local` from the template below and replace every placeholder.

```env
# Firebase Web SDK configuration (client-side; not secrets)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# EmailJS (client-side; the public key is intended for browser use)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Google Sheets service account (server-side only)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_BODY\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
```

### Environment Notes

- `.gitignore` excludes every `.env*` file, so `.env.local` must not be committed.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and `GOOGLE_SHEET_ID` must never be prefixed with `NEXT_PUBLIC_`. That prefix inlines values into the client bundle.
- The private key may be stored with literal `\n` sequences or escaped `\\n` sequences; the code normalizes both.
- Firebase Web configuration values are not secrets by design, but access must be constrained by Firebase Authentication settings, authorized domains, and security rules.
- EmailJS public identifiers are also visible to clients. Restrict allowed origins and template usage in the EmailJS dashboard.
- No other environment variables are read by the application.

## Installation and Local Development

### Prerequisites

- **Node.js 20.9 or newer.** This is required by Next.js 16; the repository does not declare an `engines` field. The project was inspected with Node.js `v24.11.0`.
- **pnpm 9 or newer** (`pnpm-lock.yaml` is lockfile version `9.0`; inspected with pnpm `10.30.0`). `npm` also works because `package-lock.json` is present, but the two lockfiles should not be maintained in parallel.
- **Git.**
- A **Firebase project** with Authentication enabled and Email/Password plus Google providers configured.
- A **Google Cloud service account** with the Sheets API enabled and edit access to the target spreadsheet.
- A spreadsheet with tabs named exactly `Users` and `Orders` and the columns described in [Google Sheets](#google-sheets).
- An **EmailJS account** if the contact form is needed.

### Clone the Repository

```bash
git https://github.com/blackdiamondtrack007/blackdiamond-specialea
cd blackdiamond-specialea
```

### Install Dependencies

```bash
pnpm install
```

Using npm instead:

```bash
npm install
```

### Configure Environment Variables

1. Create `.env.local` in the project root.
2. Copy the template from [`.env.example` Template](#envexample-template).
3. Fill in the Firebase, EmailJS, and Google service-account values.
4. Ensure the spreadsheet is shared with the service-account email.

On Windows PowerShell, create the file with:

```powershell
New-Item -Path .env.local -ItemType File
```

### Start the Development Server

```bash
pnpm dev
```

Then open <http://localhost:3000>.

If you use npm:

```bash
npm run dev
```

### Production Build

```bash
pnpm build
pnpm start
```

The production server listens on port 3000 by default. `pnpm start` requires a successful build first.

### Local Troubleshooting

- **Google Sheets errors:** confirm the service account has edit access, the spreadsheet ID is correct, the Sheets API is enabled, and the tab names are exactly `Users` and `Orders`.
- **Firebase `auth/invalid-api-key`:** verify all six `NEXT_PUBLIC_FIREBASE_*` values and restart the dev server after editing `.env.local`.
- **Verification emails not arriving:** check Firebase Authentication templates and the spam folder; the app does not send verification mail itself.
- **Contact form failures:** confirm the three EmailJS variables and that the template accepts `user_name`, `user_email`, `subject`, and `message`.
- **Google sign-in popup errors:** add `localhost` to Firebase Authentication's authorized domains.

## Available Scripts

| Command | npm equivalent | Description |
|---|---|---|
| `pnpm dev` | `npm run dev` | Starts the Next.js development server with hot reload |
| `pnpm build` | `npm run build` | Creates an optimized production build |
| `pnpm start` | `npm run start` | Serves the production build |
| `pnpm lint` | `npm run lint` | Runs ESLint with the flat configuration |

The `lint` script is `eslint` with no arguments, so it lints the current working directory using `eslint.config.mjs`. There is no `test`, `format`, or type-check script.

## UI, UX, and Design System

### Visual Direction

The interface combines a warm off-white light theme with a deep navy dark theme, using burnt orange as the primary accent and dark teal as the secondary accent. Large photographic backgrounds, dark overlay bands, gold diamond motifs, and bold display headings create a premium trading-brand aesthetic. Promotional sections alternate between light content areas and full-bleed dark imagery.

### Color Tokens

Tokens are defined in `src/app/globals.css` and exposed to Tailwind through `@theme inline`.

| Token | Light | Dark |
|---|---|---|
| `--background` | `oklch(1 0 0)` | `oklch(0.13 0.028 261.692)` |
| `--primary` | `#aa570b` | `#0f5071` |
| `--secondary` | `#0f5071` | `#aa570b` |
| `--nav-bg` | `#f9f3ee` | `#121719` |
| `--nav-text` | `#333333` | `#eddfdf` |
| `--text-primary` | `#0f0f0f` | `oklch(95.155% 0.00753 16.5)` |
| `--section-bg` | `#f6f6f6` | `#060f35` |

Semantic utilities such as `bg-primary`, `text-nav-text`, `bg-section-bg`, and `text-text-primary` map to these values. shadcn component tokens (card, border, muted, accent) are also defined in the same file.

### Typography

- **Headings:** Oswald, weights 400/500/700, exposed as `--font-oswald`.
- **Body:** Lato, weights 100/300/400/700/900, exposed as `--font-lato`.
- Both are loaded through `next/font/google` with `display: "swap"` and applied in the root layout.
- Base heading sizes scale responsively, for example `h1` from 28px on mobile to 4xl/5xl at larger breakpoints.
- Reusable text utilities: `.text-body` and `.text-body-large`.
- `src/lib/fonts.js` defines Inter and Poppins but is not imported anywhere.

### Layout and Responsiveness

- A custom `.container` utility applies `mx-auto px-4 max-w-7xl` with vertical margins that grow at `md` and `xl`.
- Tailwind's default breakpoints are used throughout: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.
- The desktop navigation appears at `lg`; below that, a shadcn `Sheet` mobile menu is used.
- The theme toggle is hidden below `lg`; the mobile menu exposes theme and language controls.
- The header is fixed and hides on scroll down, reappearing on scroll up (`StickyHeader`).
- Page content is wrapped in `<main className="min-h-[70vh]">` to keep the footer near the bottom on short pages.

### Reusable Components

`src/components/ui` contains the shadcn primitives used across the site: accordion, badge, button, card, carousel, dropdown menu, form, input, label, navigation menu, select, separator, sheet, and textarea.

Higher-level shared components include:

- `Header`, `MobileMenu`, `Footer`, `SocialMedia`, `SocialSidebar`, `StickyHeader`
- `GoogleTranslate`, `ThemeToggleButton`
- `TelegramButton`, `GetFreeAIButton`, `ScrollToTop`
- `FreeOfferPopup`, `FreeOfferPopupGlobal`, `CustomToast`
- `OrdersNotification` (present but not mounted)

### Animation

- **Framer Motion:** animated image modals in `Myfxbook.js` and `Testimonial.js`.
- **Embla Carousel:** autoplay at 3-second intervals, manual arrows, responsive slide counts.
- **Typewriter effect:** `TypewriterText` cycles through four hero phrases.
- **CSS keyframes:** `zoomShakeSequence`, `zoomPulse`, and `shadowPulse`, exposed as `animate-zoom-shake`, `animate-zoom-pulse`, and `animate-shadow-pulse`.
- **Hover and scroll transitions:** card lifts, image scaling, underlines, and header translate transitions.
- `tw-animate-css` supplies additional utility animations.

### Theme and Language

- `next-themes` writes a `class` on the document root, defaults to the system preference, and supports Light, Dark, and System choices.
- Dark-mode overrides are implemented with `.dark` token overrides and `dark:` variants.
- Google Translate injects a dropdown into the header and mobile menu; page language is configured as English.

### Global Widgets

- **Floating Telegram button** at the bottom right, with a "Contact us" bubble.
- **Free AI button** above it, opening the free-offer popup.
- **Social sidebar** with vertical brand-colored links.
- **Scroll-to-top** button that appears after 25% of the viewport is scrolled.
- **Toast container** in the top-right with 5-second auto-close.
- **Global free-offer popup** with three states: logged out, logged in and ready, and download success.

### Accessibility Notes

The codebase includes `aria-label` attributes on several icon-only links and buttons, semantic headings, and keyboard-closable modals (Escape handling in the galleries). However, no accessibility audit, automated test, or documented WCAG target exists. Some interactive elements are implemented as clickable `div`/`span` elements, and several icon buttons lack accessible names. These are opportunities for improvement rather than claims of compliance.

## SEO and Performance

### Implemented

| Area | Implementation |
|---|---|
| Document language | `<html lang="en">` |
| Page title | A single root metadata export: `title: "Best Forex Robot"` |
| Font optimization | `next/font/google` with `display: "swap"` and CSS variables |
| Image optimization | `next/image` in 18 files, both statically imported assets and local `public` paths |
| Component splitting | App Router server components by default; `"use client"` only on interactive components |
| Code splitting | Automatic per-route bundling by Next.js |
| Third-party script loading | Histats is injected with `next/script` using `afterInteractive` |
| Responsive images | Fixed width/height or constrained containers throughout the carousels and galleries |

### Not Present

- No page description, Open Graph, Twitter Card, canonical URL, or per-route metadata.
- No `sitemap.xml`, `robots.txt`, web manifest, or structured data.
- No `metadataBase`.
- No custom caching, ISR, revalidation, or `next.config.mjs` configuration; the config file is empty.
- No image `remotePatterns` or `domains` configuration, because all optimized images are local.
- No Lighthouse, Core Web Vitals, or performance measurements are recorded in the repository.
- External iframes (Myfxbook), Google Translate, Histats, and EmailJS add third-party network requests that can affect load time.

No claim is made that the site is fully SEO-optimized or achieves a particular performance score.

## Deployment

The project is deployed on Vercel and the live URL is <https://blackdiamondeaspecial.vercel.app/>. `.vercel` is gitignored and no `vercel.json` exists, so deployment relies on Vercel's framework detection.

### Vercel Deployment Steps

1. **Connect the repository.** In Vercel, choose **Add New → Project** and connect the GitHub repository (`blackdiamondtrack007/blackdiamond-specialea`).
2. **Import the project.** Vercel detects Next.js automatically. Keep the root directory at the repository root.
3. **Select build settings.**
   - Framework preset: Next.js
   - Install command: `pnpm install` (recommended, because `pnpm-lock.yaml` is the pnpm lockfile)
   - Build command: `pnpm build`
   - Output: managed by Next.js
   - Node.js version: 20.9 or newer
4. **Add environment variables.** Add all twelve required variables from [Environment Variables](#environment-variables) for the Production, Preview, and Development environments as appropriate. Server-only Google credentials must not use the `NEXT_PUBLIC_` prefix.
5. **Deploy.** Trigger the first deployment and review the build log for missing environment variables or Google API errors.
6. **Configure the domain.** Add the production domain in **Settings → Domains**, then create the DNS records Vercel provides. The custom domain used by the live site could not be verified from this repository.
7. **Verify the deployment.**
   - Register a new account and confirm the verification email arrives.
   - Log in after verification and confirm the user appears in the `Users` sheet.
   - Complete a checkout and confirm the order appears in the `Orders` sheet.
   - Open each payment instruction page with a valid `product`, `price`, and `orderId`.
   - Submit the contact form and confirm EmailJS delivery.
   - Confirm the free-download popup returns a working link.

### Required Production Configuration

- **Firebase:** enable Email/Password and Google providers, add the production domain to authorized domains, and configure verification/reset email templates.
- **Google Cloud:** enable the Google Sheets API for the project that owns the service account.
- **Google Sheets:** share the spreadsheet with the service-account email and keep the tab names and column order unchanged.
- **EmailJS:** verify the service, template, and public key, and restrict allowed origins where the dashboard supports it.
- **Myfxbook iframes and Google Translate:** these load from third-party origins; ensure no CSP or firewall blocks them.
- **Histats:** the tracking script is embedded in the layout and will load on every page.

### Repository Remotes

The local clone inspected for this documentation has two remotes:

- `origin` → `https://github.com/blackdiamondtrack007/blackdiamond-specialea`
- `production` → a separate deployment repository

This README references the `origin` repository given in the project brief. Which remote Vercel builds from could not be verified from the repository contents.

## Security Considerations

### Implemented Mechanisms

| Mechanism | Status |
|---|---|
| Server-only Google Sheets module | Implemented via `import "server-only"` |
| Service-account credentials in environment variables | Implemented; not committed |
| `.env*` excluded from Git | Implemented in `.gitignore` |
| Firebase email-verification gate for password login | Implemented |
| Client-side form validation | Implemented on login and registration |
| `rel="noopener noreferrer"` on many external links | Implemented, but not consistently across every link |
| Minimal API payload validation | Implemented for required order fields |

### Recommended Improvements

- **Authenticate API routes.** `/api/users` and `/api/orders` currently have no authentication or authorization. Both `GET` handlers can return full datasets. Add authentication, per-user filtering, and least-privilege responses.
- **Do not expose order or user listings to the browser.** The sales-notification component fetches `/api/orders` and receives names, emails, and phone numbers. Prefer a server-rendered, aggregated, or anonymized feed.
- **Add input validation and rate limiting.** The API handlers trust JSON payloads and perform only presence checks. Use a schema validator and per-IP or per-user rate limits.
- **Move payment identifiers out of source.** Wallet addresses and payment emails are hard-coded in checkout components. Environment variables or a server-side configuration source would reduce exposure and simplify rotation.
- **Protect the free-download link.** The API returns a Google Drive URL that is not access-controlled. Consider signed URLs or gated delivery.
- **Add security headers.** `next.config.mjs` is empty; no Content-Security-Policy, `X-Frame-Options`, `Referrer-Policy`, or HSTS configuration is present. Note that Myfxbook and Google Translate require careful CSP allowances.
- **Verify Firebase security rules.** Auth settings and rules live outside this repository and were not reviewed. Ensure only intended providers are enabled and that authorized domains are restricted.
- **Review Google Sheets sharing.** Anyone with edit access to the spreadsheet can modify users, orders, and statuses. Limit sharing and consider an audit trail.
- **Harden the reseller portal.** The dashboard trusts `localStorage` and has no token validation, expiry, or server-side session. Affiliate attribution relies on a client-writable cookie.
- **Add dependency monitoring.** No automated audit or update workflow exists; run `pnpm audit` and enable Dependabot or equivalent.
- **Add monitoring and error reporting.** No server-side logging, alerting, or error-tracking integration is configured.

### Sensitive Data Handling

- Customer names, emails, phone numbers, products, prices, and payment methods are stored in Google Sheets.
- Payment instructions and wallet addresses are rendered client-side.
- The free-download link is returned by the API and opened in a new browser tab.
- No payment card data is collected by this application. Card payments are completed through external Stripe pages; other methods are manual transfers.

## Known Limitations and Future Improvements

### Observed Implementation Gaps

The following items are directly observable in the source code. They are documented for maintainers and reviewers, not as a formal bug list.

| Area | Observation |
|---|---|
| Placeholder pages | `/about-us`, `/services`, and `/client-reviews` render only a heading. `/cart` renders only the word "Cart". `/verify-email` renders only "Verify Email". |
| Change password | `src/app/change-password/page.js` references an undefined `user` variable inside the submit handler, which would raise a runtime error. The submit button also has no `type="button"` inside a form without an `onSubmit`, so the browser's default form submission still runs. |
| Password reset split | `/reset-password` posts to an external PHP endpoint and requires `email` and `token` query parameters. Firebase's `sendPasswordResetEmail` is used by `/change-password`, but its action link is not connected to the reset screen. |
| VIP/Unlimited branch | Payment components select the VIP view only when `product === "BlackDiamond_Unlimited"`, while `/pricing` sends `Ultimate Enterprise`. The standard flow does not reach the VIP branch. |
| Sales notifications | `OrdersNotification` is imported and commented out in `src/app/layout.js`, so the rotating purchase notification never renders. |
| Trader counter | `getActiveTraders()` in `src/lib/utils.js` returns a synthetic value derived from a fixed base and elapsed weeks. It is not connected to live trading data. |
| Stripe placeholder | `StripePaymentContent` declares an unused `STRIPE_LINK` constant containing placeholder text. The rendered card and Stripe pages link to external Stripe payment URLs. |
| Legacy commented code | Large commented-out implementations remain in `CheckoutContent.js`, `CryptoPaymentContent.js`, and `src/app/pricing/page.js`. |
| Unused files and imports | `src/lib/fonts.js` is unused. `home/Products.js`, `home/Categories.js`, `home/Markets.js`, and `home/contact-us.js` are imported by the home page but not rendered. `Products` and `Markets` return placeholder bodies, `Categories` renders an unused category grid, and `contact-us.js` is a sales contact form. `AffiliateTracker.jsx` is not mounted. |
| Non-routable demos | `(demo-page1)/page1.js` and `(demo-page2)/page2.js` are not routes because Next.js requires a `page.js` filename. |
| Blog content | The blog listing repeats the same hard-coded card eight times and has no article detail routes. |
| Social placeholders | Three footer social icons use `href="#"`. |
| Notification automation | No server-side email or Telegram notification exists. EmailJS handles only the contact form; Telegram links are outbound. |
| Order lifecycle | Orders are always created as `pending`. `updateOrderStatus` exists but no API route, admin UI, or automation calls it. |
| Reseller session | `localStorage` is the only session store; there is no token validation, expiry, or logout endpoint. |
| Testing | No unit, integration, or end-to-end tests are present. |

### Potential Improvements

- Integrate a payment provider (Stripe Checkout, PayPal Orders API, or crypto processor) with webhooks and idempotent order updates.
- Build an authenticated customer area for downloads, licenses, and order history.
- Add an admin order dashboard backed by a real database instead of direct spreadsheet edits.
- Automate order and payment notifications through a transactional email provider and a Telegram bot.
- Consolidate authentication: wire Firebase's reset flow, remove the external PHP password reset, and add a resend-verification UI.
- Add server-side authorization to API routes and move PII behind authenticated endpoints.
- Introduce TypeScript, schema validation, and automated tests.
- Add per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt`, and structured data.
- Replace hard-coded marketing content with a CMS or MDX pipeline.
- Replace iframe widgets with data-driven components if real-time control is required.
- Add accessibility testing and keyboard-navigation coverage.
- Add monitoring, structured logging, and error tracking.

## License and Credits

### License

No `LICENSE` file exists in the repository. Licensing terms for the source code and for the BlackDiamond Special EA are **not specified**. Absence of a license means the code remains under default copyright; do not assume it is open source or reusable.

### Credits

This project builds on:

- [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/) primitives
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Google Sheets API](https://developers.google.com/sheets/api) via [`googleapis`](https://github.com/googleapis/google-api-nodejs-client)
- [EmailJS](https://www.emailjs.com/)
- [Myfxbook](https://www.myfxbook.com/) widgets
- [Embla Carousel](https://www.embla-carousel.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/) icons
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Histats](https://www.histats.com/) analytics
- [Google Translate](https://translate.google.com/) website translator
- [Vercel](https://vercel.com/) hosting

Product names, broker logos, and payment brand images belong to their respective owners.

## Documentation Notes

- This README was written after reading the full route tree, configuration files, authentication code, API handlers, checkout components, home-page sections, reseller flow, and design tokens. Every documented route was checked against a `page.js`/`page.jsx` file on disk, and every environment variable was checked against a source reference.
- The live URL in the project brief was spelled `blackdiamonea`; the deployed URL used in this README is `https://blackdiamondeaspecial.vercel.app/` based on the Vercel domain pattern and the repository name.
- The following could not be verified from the repository and should be confirmed by the project owner:
  - Firebase Authentication provider settings, authorized domains, and security rules.
  - Google Sheets sharing permissions and the service account's role.
  - Vercel project settings, environment variable values, build logs, and custom domain DNS.
  - EmailJS template contents and origin restrictions.
  - Licensing terms.
- `pnpm build` was executed successfully during this review with Node.js `v24.11.0` and pnpm `10.30.0`; the production build compiled and listed all documented page and API routes. No automated test suite exists, and no deployment was performed. Behavioral statements are based on source inspection.
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` exists in the local environment file but has no source reference and is therefore excluded from the required variable list.
- The repository has no `engines` field, no `packageManager` field, and both `pnpm-lock.yaml` and `package-lock.json` are present. pnpm is documented as the primary package manager because of `pnpm-workspace.yaml` and the pnpm lockfile.
- Sample content, marketing claims, performance figures, and prices are reproduced only where they appear in the source and are not independently validated.
