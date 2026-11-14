# Instruction — Guest Checkout for Paid Plans, Login Required Only for the Free Version

**Status:** Draft for review — specification only, no implementation
**Date:** 2026-11-14
**Repository:** BlackDiamondEA (Next.js 16 App Router, JS/JSX only)
**Primary area:** Checkout access rules, free-version claim gate, order intake API

---

## 1. Summary

Today, `/checkout` blocks every visitor who is not signed in with a “Sign in to continue” card. That gate applies to all products, including the paid plans.

The requested behavior is the opposite:

- **Paid plans** (`Essential Duo`, `Elite Challenger`, `Ultimate Enterprise`, and any other non-free product) must be purchasable **without an account**. A guest enters name, email, phone, and payment method and places the order.
- **The free version** (`BlackDiamond_Free`) must **require a signed-in account**. A signed-out visitor must not be able to claim it.
- Signing in remains optional for paid checkout. When a visitor is signed in, their details are still prefilled and their Firebase UID is still attached to the order.

No database, schema, payment-gateway, or dependency changes are part of this work.

---

## 2. Current Behavior (verified against the code)

These facts define the starting point and must be preserved or deliberately changed:

1. `src/components/checkout/CheckoutContent.js` decides what to render in a single three-way chain:
   - no Firebase user → “Sign in to continue” card;
   - submitted → “Order Placed!” card;
   - otherwise → the order form.
   Because the signed-out branch is first, a guest can never see the form or the success state.
2. The submit handler already falls back to `uid: "guest"` when no user is signed in.
3. `src/app/api/orders/route.js` (POST) already accepts a missing/absent UID and stores `guest`. It also forces `price` to `0` and `paymentMethod` to `free` when `product === "BlackDiamond_Free"`.
4. The signed-out card links to `/login?redirect=...`, but `src/app/login/page.js` never reads the `redirect` parameter. Email login and Google login both always navigate to `/`.
5. The free-version funnel in production is the global popup (`src/components/popup/FreeOfferPopupGlobal.js`, mounted in the root layout) and the header’s “Get Free AI” button, which opens a separate popup instance (`src/components/popup/FreeOfferPopup.js`). Both already behave correctly:
   - signed out → call-to-action to `/login`;
   - signed in → “Download From Google Drive” posts the free order and opens the Drive link.
6. No link anywhere currently sends a visitor to `/checkout` with `BlackDiamond_Free`. The free checkout path is reachable only by manually editing the URL.
7. `useAuthState` exposes a loading flag, but checkout currently ignores it, so there is no dedicated loading state.
8. The seven payment instruction pages under `src/app/checkout/payment/*` do not read auth state and do not need to change.
9. Documentation is contradictory: `README.md` says checkout works as a guest, while `AGENTS.md` correctly says it requires a signed-in user. Both must be corrected to the new rule.

---

## 3. Goals

| ID | Goal |
|---|---|
| G1 | A signed-out visitor can complete a paid checkout and reach the payment instruction page. |
| G2 | A signed-in visitor keeps the current experience: prefilled details and their Firebase UID on the order. |
| G3 | The free version cannot be claimed by a signed-out visitor, from any entry point. |
| G4 | The server rejects free orders that arrive without a real UID, as a defense-in-depth check. |
| G5 | Order data, the Google Sheets schema, and payment pages stay compatible with existing records. |

---

## 4. Non-Goals

- No Firebase Admin SDK, no ID-token verification, no server session, no middleware, no role system.
- No new payment gateway, no payment-status verification, no change to manual payment instructions.
- No new npm dependencies.
- No rate limiting, CAPTCHA, or bot protection (called out as a risk, not implemented here).
- No redesign of the global free popup beyond the optional suppression decision in §16.
- No changes to registration, password reset, email verification, reseller, or affiliate flows.
- No Google Sheets schema change and no migration of existing rows.
- No removal or rewrite of the large commented-out legacy block at the top of `CheckoutContent.js`; it stays untouched.

---

## 5. Definitions and Classification Rules

### 5.1 Product classification

- A product is **free** if and only if the `product` query parameter is exactly `BlackDiamond_Free`.
- A product is **paid** for every other non-empty `product` value, including the three marketing plan names.
- The `price` parameter is **never** used to decide whether a product is free. Price is client-controlled and cannot be trusted for authorization.
- An empty `product` is not a valid order. The existing API validation (`Missing required fields.`) remains the behavior; no auth gate is applied to an invalid product.
- Matching is case-sensitive, consistent with the current API comparison.

### 5.2 Visitor states

- **Guest / signed out:** `useAuthState` has resolved and there is no Firebase user.
- **Signed in:** `useAuthState` has resolved with a Firebase user. Email-verified status is already enforced at login, so a signed-in user is implicitly verified.
- **Resolving:** `useAuthState` is still loading. This state must not be used to make an access decision that could flash the wrong screen.

### 5.3 UID rules

- Guest paid order → UID stored as `guest` (unchanged).
- Signed-in order (paid or free) → UID is the Firebase UID (unchanged).
- Free order with a missing or `guest` UID → rejected by the API.

---

## 6. Behavior Specification

### 6.1 `/checkout` page

The page stays a client component wrapped in `Suspense` in `src/app/checkout/page.js`. The `product` and `price` query parameters keep their current meaning.

The render decision changes from “is there a user?” to “is this product free?”:

1. **Paid product, signed out**
   - Render the order form directly. No “Sign in to continue” card, no login redirect, no forced account creation.
   - All fields start empty.
   - The payment-method selector is visible and remains required.
   - Submission posts with `uid: "guest"`.
   - On success, show the existing success card and redirect to the selected payment page after the existing short delay.
2. **Paid product, signed in**
   - Render the order form.
   - Prefill name, email, and phone from the Firebase profile.
   - Prefill must not overwrite values the visitor has already typed. It applies only when the corresponding field is still empty (and only on the first resolution of the user).
   - Submission posts the real UID.
   - Success and redirect behavior are unchanged.
3. **Free product, signed out**
   - Do not render the order form and do not allow submission.
   - Show a gate card in the existing card style, with free-specific copy, for example “Sign in to claim your free version”.
   - Primary action links to login with a redirect back to the same checkout URL (see §6.3). Secondary link points to registration.
   - This card replaces the generic paid sign-in card for this case only.
4. **Free product, signed in**
   - Do not show the payment-method selector or the payment-method validation.
   - Show the normal details section, prefilled as in §6.1.2, with the submit button relabeled to reflect a free claim (for example “Claim Free Version”).
   - Submission posts `product: "BlackDiamond_Free"` with UID, price `0`, and payment method `free`. The API already normalizes price and method; the client should not send a paid method.
   - On success, show the existing success card with a working download action instead of redirecting to a payment instruction page. The link target is the `downloadLink` returned by the API.
   - Before rendering the form, check whether this email already claimed the free version via the existing `GET /api/orders?email=...`. If already claimed, show an “already claimed” state with the download action and no new order form. This check is UX-only; the server does not need to deduplicate.
5. **Auth still resolving**
   - For a paid product, the form may render immediately; prefill happens when the user resolves.
   - For a free product, render a neutral loading placeholder and neither the gate nor the form, so a signed-in claimant never sees the sign-in card flash.
6. **Submitted / success**
   - The success card must render regardless of auth state. The current nesting under the “user exists” branch is removed.
7. **Sign-out while on the page**
   - If the user signs out in another tab while on a free checkout, the gate replaces the form on the next auth update.
   - Any already in-flight request is out of scope for the client; the API guard in §6.4 is the safety net.

### 6.2 Global free-version entry points

- `FreeOfferPopupGlobal` and the header-opened `FreeOfferPopup` keep their current access rule: signed out → call-to-action to sign in; signed in → claim.
- No change to the `came_from_auth` session flag, the seven-second delay, the dismissal flag, or the “already downloaded” check.
- The free claim from the popup continues to post directly to `/api/orders`; no payment method is involved.
- The popup remains the canonical way to obtain the free version. The checkout free path exists for URL completeness and must not be less strict than the popup.

### 6.3 Login return path (required for the free gate)

`src/app/login/page.js` must honor an optional internal `redirect` query parameter for both email/password and Google sign-in.

- Accept only internal, same-site paths beginning with a single `/`.
- Reject protocol-relative (`//...`), absolute URLs, and anything containing a scheme or host. Such values fall back to `/`.
- Preserve the path and its query string, so a redirect such as a checkout URL with `product` and `price` survives the round trip.
- On successful login with a valid redirect, navigate to that path instead of the current hard-coded `/`.
- With no `redirect` parameter, behavior is unchanged: navigate to `/`.
- Registration is not required to honor `redirect` in this change, because a newly registered user must verify their email and sign in again before claiming the free version. This is a known friction point, listed in §16.

### 6.4 `/api/orders` POST guard

- Existing required-field validation stays exactly as it is.
- Add one rule: if `product === "BlackDiamond_Free"` and the supplied UID is absent, empty, or equal to `guest`, the request is rejected.
- Response shape follows the existing convention: `success: false` with a clear message; HTTP status `401`.
- Paid orders are unchanged, including the existing `uid: "guest"` fallback.
- The existing free normalization (price `0`, payment method `free`) stays.
- `GET /api/orders` is unchanged, including the `?email=` download check and the newest-first ordering.
- This guard is intentionally **soft**: it can be bypassed by sending any non-empty UID string. Real enforcement requires verifying a Firebase ID token server-side, which is out of scope (see §9).

### 6.5 Payment instruction pages

- No auth changes. They remain public and continue to read `product`, `price`, and `orderId` from the query string.
- Guest orders produce the same `orderId` format, so these pages need no changes.
- Method-switching links and “Back to Checkout” links stay as they are.

### 6.6 Header, mobile menu, and other pages

- No change to the header’s Login/Logout button logic.
- No change to pricing cards or home-page pricing links.
- No new navigation items.

---

## 7. Behavior Matrix

| Visitor | Paid product | Free version |
|---|---|---|
| Signed out, opens `/checkout` | Order form, empty fields, guest order allowed | Gate card; no form; no order possible |
| Signed in, opens `/checkout` | Order form, prefilled, real UID | Details form without payment selector; free claim; real UID |
| Signed out, uses header “Get Free AI” or global popup | Not applicable | Popup shows “Get VIP Free Access Now” → login |
| Signed in, uses header “Get Free AI” or global popup | Not applicable | Popup claims free order and opens Drive link |
| Signed out, posts directly to `/api/orders` with a paid product | Accepted (guest UID) | Rejected with 401 |
| Signed in, posts directly to `/api/orders` with the free product | Not applicable | Accepted |
| Anyone, opens a payment instruction page | Unchanged, public | Not reachable through normal flow; unchanged |

---

## 8. Data Contract Impact

- **No schema change.** `Orders!A:J` keeps the same columns and order.
- Guest paid orders continue to store `guest` in the UID column.
- Free orders continue to store the Firebase UID, price `0`, method `free`, status `pending`.
- Existing rows need no migration.
- `Users` tab behavior is unchanged; it is still populated on login and Google sign-up, not at registration. Guest checkout does not create a `Users` row.
- Environment variables are unchanged. No new secrets.

---

## 9. Security, Privacy, and Abuse Notes

These are consequences of the requested change and must be acknowledged, not silently ignored:

1. **The free gate is not cryptographically enforced.** The project has no server session and no Firebase Admin SDK. A crafted request can send any UID string. The API rule in §6.4 blocks the trivial case only. True enforcement would require verifying a Firebase ID token on the server (new dependency, service-account credentials for Auth, and a request-contract change) and is explicitly out of scope.
2. **Order creation becomes fully anonymous for paid plans.** Spam and fake orders become easier. There is no rate limiting, CAPTCHA, or email confirmation. The business currently confirms payments manually, which limits damage, but order volume noise may increase.
3. **Price is still client-controlled.** A guest can post a paid product with `price=0` today, and the API stores it because only the free product is normalized. Guest checkout widens the audience for this. A server-side canonical price map is strongly recommended as a companion hardening task, but is not part of this specification unless the reviewer approves it (see §16).
4. **Both existing APIs remain unauthenticated.** `GET /api/orders` and `GET /api/users` expose names, emails, and phones. This change does not worsen that, but it does not fix it either.
5. **No secrets move.** Firebase Web config stays public; Google service-account credentials stay server-only.
6. **Email verification is implicitly required only for the free version**, because login rejects unverified accounts. Guest paid buyers are unverified by definition.

---

## 10. Edge Cases

| Case | Expected behavior |
|---|---|
| Auth state resolves after the page renders | Paid form is already usable; prefill applies only to untouched fields. Free page shows a loader until resolution. |
| Signed-in user has no display name | Name field falls back to empty and remains required. |
| Signed-in user has no phone on the Firebase profile | Phone field falls back to empty and remains required; the popup’s existing `N/A` fallback is unchanged. |
| Google account with no phone | Same as above. |
| `product` contains spaces or marketing names | Treated as paid. |
| `product` is empty or missing | API returns the existing “Missing required fields.” error; no auth gate. |
| `price` is missing on a paid product | Existing default of `0` applies; order records `0`. Flagged as an existing flaw, not fixed here. |
| Free product with `price` greater than zero in the URL | Ignored; API forces `0`. |
| Free product with a paid payment method in the URL/body | Ignored; API forces `free`. |
| Free product, signed out, direct POST | 401 with `success: false`. |
| Free product, signed in, already claimed | Checkout shows the already-claimed state with a download action; no duplicate order is created by the UI. Direct API calls can still create duplicates (existing behavior). |
| User signs out in another tab mid-flow | UI returns to the gate on the next auth update; the API guard handles a missing UID only. |
| Login `redirect` points to an external URL | Rejected; fall back to `/`. |
| Login `redirect` points to `/checkout?product=...&price=...` | Honored after successful login, preserving both parameters. |
| Browser blocks the popup/drive tab | Existing popup behavior; unchanged. |
| A visitor opens `/checkout/payment/card` with no `orderId` | Unchanged; page renders with the existing placeholder. |

---

## 11. Files in Scope

| File | Change |
|---|---|
| `src/components/checkout/CheckoutContent.js` | Main change: remove the all-product auth gate, add free-vs-paid branching, add the free gate card, hide the payment selector for free, add the free success/download state, use the auth loading flag, safer prefill. Leave the commented legacy block untouched. |
| `src/app/api/orders/route.js` | Add the free-order UID guard in POST. No other changes. |
| `src/app/login/page.js` | Honor a validated internal `redirect` parameter for email and Google login. |
| `README.md` | Correct the checkout/auth narrative and the free-version rules; update the route and behavior tables. |
| `AGENTS.md` | Update §5 order flow, §6 API contracts, §9 landmines (remove the README-drift entry once fixed), and add the new access rule. |

**Explicitly not changed:** `src/app/checkout/page.js`, the seven `src/app/checkout/payment/*` routes and their components, `src/lib/googleSheet.js`, `src/lib/firebase.js`, `src/components/popup/*`, header/mobile menu, pricing pages, `next.config.mjs`, `package.json`.

---

## 12. Acceptance Criteria

1. A signed-out visitor can open a paid checkout URL, fill the form, submit, and land on the correct payment instruction page with a valid `orderId`.
2. The paid order created by a signed-out visitor is stored with UID `guest` and the selected payment method.
3. A signed-in visitor can complete the same paid checkout with prefilled details, and the order stores their Firebase UID.
4. A signed-out visitor opening `/checkout?product=BlackDiamond_Free&price=0` sees only the free sign-in gate; no order form and no submit control.
5. Signing in from that gate returns the visitor to the same checkout URL, and the free claim is then available.
6. A signed-in visitor on the free checkout does not see a payment-method selector and cannot create a free order with a paid method.
7. A free claim creates one order with product `BlackDiamond_Free`, price `0`, method `free`, and the real UID, and exposes the Drive download link.
8. A direct POST to `/api/orders` with `BlackDiamond_Free` and no UID (or `guest`) returns 401 and creates no row.
9. The global free popup still shows the sign-in CTA when signed out and still claims the free version when signed in.
10. Google login and email login both honor a valid internal `redirect` and both reject external redirects.
11. No changes appear in the Google Sheets column layout, and existing orders remain readable.
12. `pnpm lint` and `pnpm build` pass, with any pre-existing warning reported rather than hidden.

---

## 13. Verification Plan

Automated:

- `pnpm lint`
- `pnpm build`

Manual, with `pnpm dev`:

1. Signed out → paid plan → submit → payment page.
2. Signed in → paid plan → verify prefill and the UID in the sheet.
3. Signed out → free checkout URL → gate only.
4. Gate → login → redirected back → free claim → Drive link.
5. Signed in → free checkout → no payment selector → single free order.
6. Direct API POST for free with `guest` UID → 401.
7. Header “Get Free AI” signed out and signed in → unchanged popup behavior.
8. Login with an external `redirect` value → lands on `/`.

---

## 14. Documentation Updates

- `README.md`: replace the “checkout requires a signed-in user” and “works as a guest” contradictions with the new rule; update the checkout section, route table, and free-version flow description.
- `AGENTS.md`: update §5 “Order / checkout”, §6 “API endpoints”, and §9 to state that paid checkout is guest-friendly while the free version requires a verified account.
- No new environment variables, scripts, or routes to document.

---

## 15. Out of Scope

- Firebase Admin SDK or server-side token verification.
- Server-side price validation and tamper-proof pricing.
- Rate limiting, CAPTCHA, or fraud checks.
- Authenticating `GET /api/users` and `GET /api/orders`.
- Duplicate free-claim prevention on the server.
- Cart, reseller, affiliate, contact, and newsletter flows.
- Any visual redesign beyond the minimum copy and state changes described above.
- Tests; the repository has no test runner and none is being introduced.

---

## 16. Decisions Needed Before Implementation

1. **Free product on `/checkout`.** Recommended: keep the details form, hide the payment selector, and relabel the action as a free claim (as specified in §6.1.4). Alternatives: a dedicated single-button claim panel, or redirect free checkout URLs to the home page popup. Confirm the preferred option.
2. **Login `redirect` support.** Recommended: implement it, because the free gate depends on returning the visitor to checkout. Confirm whether it should also apply to registration after email verification.
3. **Global popup on checkout.** Recommended: leave it as-is for now. Optionally suppress it on `/checkout` so it cannot interrupt a paid guest checkout after seven seconds. This is a behavior change outside the auth rule, so it needs explicit approval.
4. **Companion price hardening.** Approve or defer a server-side canonical price check, since guest checkout increases exposure to `price=0` manipulation.
5. **Server-side free-claim deduplication.** Approve or defer rejecting a second `BlackDiamond_Free` order for the same email.
6. **Gate copy.** Confirm the exact wording for the free sign-in card and the free submit button, or accept the proposed placeholders.
