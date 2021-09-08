# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to integrate with [Australian holiday data](https://data.gov.au/data/dataset/australian-holidays-machine-readable-dataset).

# Usage

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating an application containing a Holidays plugin.

## Adding application
The whole application can be added with the following command ```edk add plugin --name "Application" --def_dir src/plugin```. The plugin, a ```SuperUser``` and related environment variables are added as:

```typescript
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, Const, SuperUser, HolidaysPlugin } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Holidays Plugin",
        schemas: {
            "Holidays" : HolidaysPlugin()
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ]
    })
)
```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI reference](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API reference](https://elaraai.github.io/docs/api): programmatic api for the cli functionality