# syntax=docker/dockerfile:1.7
FROM node:24.18.0-alpine AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
WORKDIR /workspace

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/site/package.json apps/site/package.json
COPY packages/content/package.json packages/content/package.json
COPY packages/design-tokens/package.json packages/design-tokens/package.json
COPY packages/email/package.json packages/email/package.json
COPY packages/tooling/package.json packages/tooling/package.json
RUN pnpm install --frozen-lockfile

FROM dependencies AS build
COPY apps/site apps/site
COPY packages packages
ARG NEXT_PUBLIC_SITE_URL=https://apprenticeatlas.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @apprentice-atlas/site build

FROM node:24.18.0-alpine AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack /opt/yarn-* \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack /usr/local/bin/pnpm /usr/local/bin/pnpx /usr/local/bin/yarn /usr/local/bin/yarnpkg \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
WORKDIR /app
COPY --from=build --chown=nextjs:nodejs /workspace/apps/site/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /workspace/apps/site/.next/static ./apps/site/.next/static
COPY --from=build --chown=nextjs:nodejs /workspace/apps/site/public ./apps/site/public
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health/live || exit 1
CMD ["node", "apps/site/server.js"]
