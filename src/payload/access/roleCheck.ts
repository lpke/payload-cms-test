import type { User } from '@payload/payload-types';
import type { PayloadRequest } from 'payload';

export function hasRoles(requiredRoles: User['roles']) {
  return ({ req: { user } }: { req: PayloadRequest }): boolean => {
    if (!user) return false;
    const roles = user.roles;
    return requiredRoles.every((requiredRole) => roles.includes(requiredRole));
  };
}

export function hasSomeRoles(partialRoles: User['roles']) {
  return ({ req: { user } }: { req: PayloadRequest }): boolean => {
    if (!user) return false;
    const roles = user.roles;
    return partialRoles.some((partialRole) => roles.includes(partialRole));
  };
}

export const isSuperAdmin = hasRoles(['super-admin']);
