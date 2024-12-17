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

* Function which returns `AccessResult` (`boolean | Where`)

## `FieldAccess`

* ...
