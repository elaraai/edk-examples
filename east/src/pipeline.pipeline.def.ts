// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { SelectOperation } from "@elaraai/edk/lib"

import input_source from "../gen/input.source"

const input = input_source.output

export default ELARA.PipelineSchema({
    name: "pipeline",
    input_table: input,
    operations: [
        SelectOperation({
            selections: {
                ToDateTime1: ELARA.ToDateTime("2021-05-08T09:00:00.000Z"),
                ToDateTime2: ELARA.ToDateTime("2021", "YYYY"),
                Range: ELARA.Range(5n, 10n),
                Sqrt: ELARA.Sqrt(4.0),
                Log: ELARA.Log(1.0),
                Exp: ELARA.Exp(0.0),
                Pow: ELARA.Pow(2.0, 3.0),
            }
        })
    ],
})
