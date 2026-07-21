# Launch and rollback runbook

## Current automation status

GitHub Actions is temporarily disabled at repository level while the product and
content are being developed. This prevents CI, container publishing, CodeQL and
Dependabot workflow runs and their notifications. Local verification remains
required before every commit:

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @apprentice-atlas/site test:e2e
PAYLOAD_SECRET=container-build-only \
  DATABASE_URI=postgres://postgres:postgres@127.0.0.1:5432/apprentice_atlas \
  pnpm build
```

Re-enable automation before creating a release candidate, then enable the two
manually disabled workflows:

```sh
gh api --method PUT repos/Estopia/Apprentice-Atlas-Web/actions/permissions -F enabled=true
gh workflow enable 317555276 --repo Estopia/Apprentice-Atlas-Web
gh workflow enable 317555277 --repo Estopia/Apprentice-Atlas-Web
```

## Release candidate

1. Freeze reviewed content and record the privacy/terms versions.
2. Apply Supabase migrations in staging with `payload migrate` for CMS changes and
   the reviewed SQL files for web-owned tables. Never use schema push in production.
3. Re-enable Actions. Run CI, browser tests, manual keyboard/screen-reader checks, link checking and
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
