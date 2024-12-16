import type { AccessResult, PayloadRequest } from 'payload';

export default function isAdminOrCreatedBy({
  req: { user },
}: {
  req: PayloadRequest;
}): AccessResult {
  // Scenario #1 - Check if user has the 'super-admin' role
  if (user && user.roles.includes('super-admin')) {
    return true;
  }

  // Scenario #2 - Allow only documents with the current user set to the 'createdBy' field
  if (user) {
    // Will return access for only documents that were created by the current user
    return {
      createdBy: {
        equals: user.id,
      },
    };
  }

  // Scenario #3 - Disallow all others
  return false;
}
