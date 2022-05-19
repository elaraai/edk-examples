// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, Const, DataSourcePlugin, SuperUser } from "@elaraai/edk/lib"

import csv from "../../gen/csv.source"
import csv_two from "../../gen/csv_two.source"
import json from "../../gen/json.source"
import xlsx from "../../gen/xlsx.source"
import xlsx_two from "../../gen/xlsx_two.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Remote Datasources",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [csv, json, xlsx, csv_two, xlsx_two]
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
