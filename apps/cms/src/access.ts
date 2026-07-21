import type { Access } from 'payload';

type Role = 'admin' | 'publisher' | 'editor' | 'translator';

export const hasRole =
  (...roles: Role[]): Access =>
  ({ req: { user } }) =>
    Boolean(user && roles.includes((user as { role?: Role }).role ?? 'translator'));
export const authenticated: Access = ({ req: { user } }) => Boolean(user);
export const publishedOrAuthenticated: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: 'published' } };
