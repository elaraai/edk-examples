// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, DataSourcePlugin, SuperUser } from "@elaraai/edk/lib"

import array from "../../gen/array.source"
import clock from "../../gen/clock.source"
import range from "../../gen/range.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Procedural Datasources",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [array, clock, range]
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
