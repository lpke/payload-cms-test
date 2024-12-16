# Access functions

> Docs: https://payloadcms.com/docs/access-control/overview

* An `Access` function, which returns `AccessResult` (`boolean | Where`), is
provided to Payload's `access { <access_type>: ... }` configuration
* 3 main types of access control:
    1. Global level
    2. Collection level
    3. Field level (function `FieldAccess`)
