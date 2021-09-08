// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, DataSourcePlugin, EnvironmentVariable, SuperUser } from "@elaraai/edk/lib"

import rest from "../../gen/rest.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Rest Datasource",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [rest]
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
            EnvironmentVariable({ name: 'GITHUB_CLIENT_ID' }),
            EnvironmentVariable({ name: 'GITHUB_CLIENT_SECRET' }),
            EnvironmentVariable({ name: 'GITHUB_USER' }),
        ]
    })
)
