import type { Access } from 'payload';
import { timingSafeEqual } from 'node:crypto';

type Role = 'admin' | 'publisher' | 'editor' | 'translator';

export const hasRole =
  (...roles: Role[]): Access =>
  ({ req: { user } }) =>
    Boolean(user && roles.includes((user as { role?: Role }).role ?? 'translator'));
export const authenticated: Access = ({ req: { user } }) => Boolean(user);
export const publishedOrAuthenticated: Access = ({ req }) => {
  const previewSecret = req.headers.get('x-atlas-preview-secret');
  const expected = process.env.PREVIEW_SECRET;
  const validPreviewSecret = Boolean(
    previewSecret &&
    expected &&
    previewSecret.length === expected.length &&
    timingSafeEqual(Buffer.from(previewSecret), Buffer.from(expected)),
  );
  if (req.user || validPreviewSecret) return true;
  return { _status: { equals: 'published' } };
};
