// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, XeroPlugin, Const, EnvironmentVariable, Poll, SuperUser, TimeSpan } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Xero Plugin",
        schemas: {
            "Xero" : XeroPlugin({
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
            EnvironmentVariable({ name: 'XERO_CLIENT_ID' }),
            EnvironmentVariable({ name: 'XERO_CLIENT_SECRET' }),
            EnvironmentVariable({ name: 'XERO_TENANT' }),
        ]
    })
)