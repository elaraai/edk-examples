// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, EnvironmentVariable, SuperUser, PipelinePlugin, ProfilePlugin } from "@elaraai/edk/lib"

import aggregate from "../../gen/aggregate.pipeline"
import disaggregate_dict from "../../gen/disaggregate_dict.pipeline"
import filter from "../../gen/filter.pipeline"
import http from "../../gen/http.pipeline"
import join from "../../gen/join.pipeline"
import select from "../../gen/select.pipeline"
import offset from "../../gen/offset.pipeline"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Pipelines",
        schemas: {
            "Operations" : PipelinePlugin({
                pipelines: [
                    aggregate,
                    disaggregate_dict,
                    filter,
                    http,
                    join,
                    select,
                    offset
                ]
            }),
            "Profile": ProfilePlugin(),
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ],
        environments: [
            EnvironmentVariable({ name: 'REQUEST_URL' }),
        ]
    })
)
