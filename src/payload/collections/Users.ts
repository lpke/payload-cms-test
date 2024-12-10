import { isAdmin } from '@payload/utils/roles';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
    {
      name: 'owned_games',
      type: 'array',
      fields: [
        {
          name: 'owned_game',
          type: 'group',
          fields: [
            {
              name: 'game',
              type: 'relationship',
              relationTo: 'games',
              required: true,
            },
            {
              name: 'rating',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
};
