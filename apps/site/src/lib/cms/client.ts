import 'server-only';

type PayloadList<T> = { docs: T[]; totalDocs: number };

const cmsUrl = () =>
  process.env.CMS_INTERNAL_URL ??
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : undefined);

function previewHeaders() {
  const secret = process.env.PREVIEW_SECRET;
  return secret ? { 'x-atlas-preview-secret': secret } : undefined;
}

export async function cmsFetch<T>(
  path: string,
  options: { draft?: boolean; tags?: string[]; revalidate?: number } = {},
): Promise<T | null> {
  const base = cmsUrl();
  if (!base) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2_500);
  try {
    const url = new URL(path, base);
    if (process.env.PREVIEW_SECRET) url.searchParams.set('draft', 'true');
    const response = await fetch(url, {
      headers: previewHeaders(),
      signal: controller.signal,
      ...(options.draft
        ? { cache: 'no-store' as const }
        : {
            next: {
              revalidate: options.revalidate ?? 900,
              tags: options.tags ?? ['cms'],
            },
          }),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function cmsList<T>(
  collection: string,
  options: { draft?: boolean; depth?: number; limit?: number } = {},
) {
  const query = new URLSearchParams({
    depth: String(options.depth ?? 2),
    limit: String(options.limit ?? 100),
    pagination: 'false',
  });
  return cmsFetch<PayloadList<T>>(`/api/${collection}?${query}`, {
    draft: options.draft,
    tags: [collection],
  });
}

export async function cmsGlobal<T>(slug: string) {
  return cmsFetch<T>(`/api/globals/${slug}?depth=2`, { tags: [`global:${slug}`] });
}
