// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, MyobPlugin, Const, EnvironmentVariable, Poll, SuperUser, TimeSpan } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Myob Plugin",
        schemas: {
            "Myob" : MyobPlugin({
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
            EnvironmentVariable({ name: 'MYOB_APP_ID' }),
            EnvironmentVariable({ name: 'MYOB_APP_SECRET' }),
            EnvironmentVariable({ name: 'MYOB_FILE_ID' }),
            EnvironmentVariable({ name: 'MYOB_FILE_URI' }),
            EnvironmentVariable({ name: 'MYOB_PASSWORD' }),
            EnvironmentVariable({ name: 'MYOB_USERNAME' }),
        ]
    })
)