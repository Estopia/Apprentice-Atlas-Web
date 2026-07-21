# Apprentice Atlas Web

The bilingual marketing and editorial platform for Apprentice Atlas, operated by
Estopia Engineering Ltd. It helps young people, families, schools and careers
advisers understand apprenticeships in Germany and the United Kingdom.

## Workspace

- `apps/site` — public Next.js website
- `apps/cms` — Payload CMS editorial application
- `packages/content` — typed launch content and local development fallback
- `packages/design-tokens` — shared visual tokens
- `packages/email` — transactional email templates
- `infra` — database migrations and deployment configuration

## Local development

1. Install Node.js 24.18+ and pnpm 10.28.1.
2. For a custom local database, create `apps/cms/.env.local` and set
   `DATABASE_URI`. Without that file, Payload uses the local PostgreSQL database
   `apprentice_atlas` and your operating-system PostgreSQL user.
3. Run `pnpm install`.
4. Start both applications with `pnpm dev`.

The public site is available at `http://localhost:3000`; Payload runs at
`http://localhost:3001/admin`. The public site contains a complete typed content
fallback, so its pages remain usable while the CMS is unavailable.

For Portainer, deploy `compose.yaml` directly from the Git repository and add the
values from `infra/portainer/stack.env.example` as stack environment variables.
The stack builds both images from the checked-out commit, runs the checked-in
Payload migrations and exposes `site:3000` and `cms:3001` only on the shared proxy
network for Nginx Proxy Manager.

After migrations and the first admin account, run `pnpm --filter
@apprentice-atlas/cms seed` to upsert all 56 German/British-English launch
documents, their governance metadata, taxonomies and first-party social image.
Production seeding additionally requires `ALLOW_PRODUCTION_SEED=true`.

## Quality checks

Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm test:e2e` before release.

## License

Copyright 2026 Estopia Engineering Ltd. Source is available under the PolyForm
Noncommercial License 1.0.0. Commercial use requires written permission.
