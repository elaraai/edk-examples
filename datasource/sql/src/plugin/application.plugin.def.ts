// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, DataSourcePlugin, SuperUser } from "@elaraai/edk/lib"

import sql from "../../gen/sql.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "SQL Datasource",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [sql]
            })
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
