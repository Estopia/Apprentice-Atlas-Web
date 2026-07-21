# Cloudflare edge controls

Create proxied DNS records for `apprenticeatlas.com`, `cms.apprenticeatlas.com`,
`staging.apprenticeatlas.com` and `cms-staging.apprenticeatlas.com`. Redirect
`www.apprenticeatlas.com` permanently to the apex while preserving path and query.

Protect both CMS hosts with Cloudflare Access before Payload authentication.
Permit only named Estopia identities and require MFA. Apply Turnstile to public
forms, rate-limit `/api/forms/*` and `/api/waitlist/*`, and block non-POST traffic
to mutation endpoints. Bypass caching for `/admin`, `/api`, `/preview` and health
routes; cache immutable Next.js assets for one year.

Staging sends `X-Robots-Tag: noindex, nofollow` at the edge as a second control in
addition to the application-generated robots policy.
