# Next.js + Payload CMS Demo

## Technology/Features

* Next.js 15 (app router)
* React 19
* Typescript
* Tailwind
* Payload CMS
* Neon PostgreSQL Database

## Setup Notes

Rough steps performed to get this repository up and running with Payload CMS.

1. Installed NextJS 15
2. Linked repository to Vercel
    - Created a Neon Postgres database through Vercel "Storage"
3. Installed Neon Postgres DB (`@neondatabase/serverless`)
    - Place Postgres env vars into `.env.local` (see `.env.example`)
        - Get env vars from "Quickstart" snippets provided in
        `Vercel > Project > Storage > (neon postgres settings)`
4. Installed Payload CMS with `npx create-payload-app`
    - Follow installation steps
        - `src/app/...` contents need to be moved into a route group such as
        `src/app/(frontend)/...`
    - When prompted for a db, pick Vercel Postgres (Now known as Neon Postgres)
    - When prompted for a db connection string, provide `DATABASE_URL` from your
    `.env.local`
    - Payload will put `PAYLOAD_SECRET` and `DATABASE_URI` into a `.env` file
    - Move these to `.env.local`, remove `DATABASE_URI` (should be the same as
    `DATABASE_URL`)
    - Update `payload.config.ts` to use `process.env.DATABASE_URL` (under the
    `db` key)
    - Run `pnpm install sharp` (was required for Payload but not installed
    during the Payload setup - might be a bug?)

## Folder Structure

Important locations:

```
src/
    app/
        (frontend)/         my typical nextjs app structure
        (payload)/          payload app code (routes, admin interface, api)
    payload/                payload definitions (schema, config, types)
        collections/        schema files
        payload-types.ts    generated payload types
        payload.config.ts   payload's main config
```

## Other Notes

- The NextJS base was cloned from my repo [next-base](https://github.com/lpke/next-base)
- Linting - `pnpm lint` will do a eslint _and_ typescript compiler check
- I have set up path aliases in `tsconfig.json`. Useful distinctions below:
    - `@/...` used for anything under `src/app/(frontend)/...`
    - `@/components/...` for `src/app/(frontend)/_components/...`
        - Same thing for `hooks`, `routes`, `styles`, `types`, `utils` and `api`
    - `@/payload/...` for `src/app/(payload)/...`
    - `@payload/...` for `src/payload/...`
- To update `payload-types.ts`, run:
    - Default: `npx payload generate:types`
    - Using this project's script: `pnpm payload:typegen`
