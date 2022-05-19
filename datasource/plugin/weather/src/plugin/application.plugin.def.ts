// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, WeatherPlugin, Const, EnvironmentVariable, Poll, SuperUser } from "@elaraai/edk/lib"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Weather Plugin",
        schemas: {
            "Weather" : WeatherPlugin({
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
            EnvironmentVariable({ name: 'WEATHER_GEOHASH' }),
            EnvironmentVariable({ name: 'WEATHER_NAME' }),
            EnvironmentVariable({ name: 'WEATHER_STATE' }),
        ]
    })
)