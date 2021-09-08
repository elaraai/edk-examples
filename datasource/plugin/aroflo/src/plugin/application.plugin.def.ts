// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, AroFloPlugin, Const, EnvironmentVariable, Poll, SuperUser } from "@elaraai/edk/lib"


export default ELARA.Schema(
    ApplicationPlugin({
        name: "Aroflo Plugin",
        schemas: {
            "Aroflo" : AroFloPlugin({
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
            EnvironmentVariable({ name: 'AROFLO_ORGENCODED' }),
            EnvironmentVariable({ name: 'AROFLO_PENCODED' }),
            EnvironmentVariable({ name: 'AROFLO_SECRET_KEY' }),
            EnvironmentVariable({ name: 'AROFLO_UENCODED' })
        ]
    })
)
