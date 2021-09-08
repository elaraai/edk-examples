// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, KountaPlugin, Const, EnvironmentVariable, Poll, SuperUser, TimeSpan } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Kounta Plugin",
        schemas: {
            "Kounta" : KountaPlugin({
                history: TimeSpan(8, 'week'),
                update_history:  TimeSpan(1, 'week'),
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
            EnvironmentVariable({ name: 'KOUNTA_APP_ID' }),
            EnvironmentVariable({ name: 'KOUNTA_APP_SECRET' }),
            EnvironmentVariable({ name: 'KOUNTA_COMPANY_ID' }),
            EnvironmentVariable({ name: 'KOUNTA_SITE_ID' }),
        ]
    })
)