# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to integrate with [Deputy](https://www.deputy.com/api-doc/API/Getting_Started).

# Usage

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating an application containing an Deputy plugin.

## Adding application
The whole application can be added with the following command ```edk add plugin --name "Application" --def_dir src/plugin```. The plugin, a ```SuperUser``` and related environment variables are added as:

```typescript
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, DeputyPlugin, Const, EnvironmentVariable, Poll, SuperUser, TimeSpan } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Deputy Plugin",
        schemas: {
            "Deputy" : DeputyPlugin({
                history: TimeSpan(8, 'week'),
                update_history:  TimeSpan(1, 'week'),
                poll: Poll({ value: 1, unit: 'day' }),
                future: TimeSpan(1, 'week' ),
            })
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ],
        environments: [
            EnvironmentVariable({ name: 'DEPUTY_CLIENT_ID' }),
            EnvironmentVariable({ name: 'DEPUTY_CLIENT_URL' }),
        ]
    })
)
```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI reference](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API reference](https://elaraai.github.io/docs/api): programmatic api for the cli functionality