// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
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