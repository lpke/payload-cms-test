import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        // `createdBy` cannot be updated
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        // hides `createdBy` until it has a value
        condition: (data) => Boolean(data?.createdBy),
      },
    },
  ],
  hooks: {
    // runs before any order is created or updated
    beforeChange: [
      ({ req, operation, data }) => {
        // automatically set `createdBy` to the user who created the order
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
