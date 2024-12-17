import { isSuperAdmin } from '@payload/access/roleCheck';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['user'],
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      hasMany: true,
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
    create: isSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
  },
};
