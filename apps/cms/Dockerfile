# syntax=docker/dockerfile:1.7
FROM node:24.18.0-alpine AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
WORKDIR /workspace

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/cms/package.json apps/cms/package.json
COPY packages/content/package.json packages/content/package.json
RUN pnpm install --frozen-lockfile

FROM dependencies AS build
COPY apps/cms apps/cms
COPY packages/content packages/content
ENV NEXT_TELEMETRY_DISABLED=1 PAYLOAD_SECRET=container-build-only DATABASE_URI=postgres://postgres:postgres@127.0.0.1:5432/apprentice_atlas
RUN pnpm --filter @apprentice-atlas/cms build

FROM node:24.18.0-alpine AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3001 HOSTNAME=0.0.0.0
RUN apk add --no-cache tini \
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack /opt/yarn-* \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /usr/local/bin/pnpm /usr/local/bin/pnpx /usr/local/bin/yarn /usr/local/bin/yarnpkg \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 payload \
  && mkdir -p /app/media \
  && chown payload:nodejs /app/media
WORKDIR /app
COPY --from=build --chown=payload:nodejs /workspace/apps/cms/.next/standalone ./
COPY --from=build --chown=payload:nodejs /workspace/apps/cms/.next/static ./apps/cms/.next/static
USER payload
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD wget -qO- http://127.0.0.1:3001/health/live || exit 1
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "apps/cms/server.js"]
