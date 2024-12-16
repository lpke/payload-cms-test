import type { User } from '@payload/payload-types';
import type { Access, AccessResult, PayloadRequest } from 'payload';

export function hasRoles(requiredRoles: User['roles']): Access<User> {
  return ({ req: { user } }: { req: PayloadRequest }): AccessResult => {
    if (!user) return false;
    const roles = user.roles;
    return requiredRoles.every((requiredRole) => roles.includes(requiredRole));
  };
}

export function hasSomeRoles(partialRoles: User['roles']): Access<User> {
  return ({ req: { user } }: { req: PayloadRequest }): AccessResult => {
    if (!user) return false;
    const roles = user.roles;
    return partialRoles.some((partialRole) => roles.includes(partialRole));
  };
}
