// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from '@payload/collections/Users';
import { Games } from '@payload/collections/Games';
import { Tenants } from '@payload/collections/Tenants';
import { isSuperAdmin } from '@payload/access/roleCheck';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Tenants, Users, Games],
  // NOTE: It's best practise to import this from a seperate file
  globals: [
    {
      slug: 'settings',
      label: 'Settings',
      access: {
        read: isSuperAdmin,
      },
      fields: [
        {
          name: 'app-name',
          label: 'App Name',
          type: 'text',
          required: true,
          defaultValue: 'Payload CMS Test',
        },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
