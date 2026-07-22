const publicFilePattern = /\/[^/]+\.[a-z0-9]+$/i;

export function bypassLocaleRouting(pathname: string) {
  return (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/health/') ||
    pathname === '/opengraph-image' ||
    publicFilePattern.test(pathname)
  );
}
