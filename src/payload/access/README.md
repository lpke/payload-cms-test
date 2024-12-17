# Access functions

> Docs: https://payloadcms.com/docs/access-control/overview

Access functions determine whether a document/field should be readable/editable
by the user.

This is where "role" checks would typically happen. In this case, role checks
have been extracted out to helper functions and imported into the schema files
to reduce boilerplate and duplicate code.

There are 2 types of "Access" function types, which cover the 3 areas where
Access can be defined:

1. Global documents - accepts an `Access` function
2. Collection schemas - accepts an `Access` function
3. Field level - accepts a `FieldAccess` function

## `Access`

- Function which returns `AccessResult` (`boolean | Where`)
- Function params:
  - `data?: TData`
    - The relevant resource that is being accessed. `data` is null when a list is requested
  - `id?: number | string`
    - ID of the resource being accessed
  - `isReadingStaticFile?: boolean`
    - If true, the request is for a static file
  - `req: PayloadRequest`
    - The original request that requires an access check

## `FieldAccess`

- Function which returns a `boolean`
- Function params:
  - `data?: Partial<TData>`
    - The incoming data used to `create` or `update` the document with. `data` is undefined during the `read` operation.
  - `id?: number | string`
    - The `id` of the current document being read or updated. `id` is undefined during the `create` operation.
  - `doc?: TData`
    - The original data of the document before the `update` is applied. `doc` is undefined during the `create` operation.
  - `req: PayloadRequest`
    - The `payload` object to interface with the payload API
  - `siblingData?: Partial<TSiblingData>`
    - Immediately adjacent data to this field. For example, if this is a `group` field, then `siblingData` will be the other fields within the group.
