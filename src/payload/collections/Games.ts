import { isAdmin, isAdminOrCreatedBy } from '@payload/utils/roles';
import type { CollectionConfig } from 'payload';

export const Games: CollectionConfig = {
  slug: 'games',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'cost',
      type: 'number',
      access: {
        update: isAdmin,
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: false,
        position: 'sidebar',
        // hides `createdBy` until it has a value
        condition: (data) => Boolean(data?.createdBy),
      },
    },
  ],
  access: {
    read: () => true,
    create: () => true,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
  hooks: {
    // runs before any game is created or updated
    beforeChange: [
      ({ req, operation, data }) => {
        // automatically set `createdBy` to the user who added the game
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id;
            return data;
          }
        }
      },
    ],
  },
};
