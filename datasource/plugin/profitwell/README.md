# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to integrate with [Profitwell API](https://profitwellapiv2.docs.apiary.io/).

# Usage

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating an application containing an Profitwell plugin.

## Adding application
The whole application can be added with the following command ```edk add plugin --name "Application" --def_dir src/plugin```. The plugin, a ```SuperUser``` and related environment variables are added as:

```typescript
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, ProfitwellPlugin, Const, EnvironmentVariable, Poll, SuperUser } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Profitwell Plugin",
        schemas: {
            "Profitwell" : ProfitwellPlugin({
                poll: Poll({ value: 1, unit: 'day' }),
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
            EnvironmentVariable({ name: 'PROFITWELL_KEY' }),
        ]
    })
)
```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API](https://elaraai.github.io/docs/edk): programmatic api for the cli functionality