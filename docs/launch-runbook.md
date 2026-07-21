# Launch and rollback runbook

## Release candidate

1. Freeze reviewed content and record the privacy/terms versions.
2. Apply Supabase migrations in staging with `payload migrate` for CMS changes and
   the reviewed SQL files for web-owned tables. Never use schema push in production.
3. Run CI, browser tests, manual keyboard/screen-reader checks, link checking and
   the content gate. Complete legal review and the DPIA before collecting data.
4. Build both images once. Record their GHCR SHA-256 digests and deploy those exact
   digests to staging.
5. Exercise partner form, double opt-in, retention, media upload, draft preview,
   publish/unpublish, CMS outage fallback and both health endpoints.

## Production

Production is a protected GitHub environment. Approval promotes the already-tested
site and CMS digests; it does not rebuild them. Run Payload migrations as a separate
pre-deploy job, take a Supabase backup, then update both Portainer services. Smoke
test `/de`, `/en`, one resource per language, forms and health endpoints.

## Rollback

Keep the previous two image digest pairs and the corresponding migration notes.
For an application-only issue, restore both previous digests in Portainer. For a
schema issue, first stop writes, apply the reviewed down migration or restore the
pre-release database backup, and only then start the previous CMS image. Verify
published cached pages remain available while CMS is stopped.
